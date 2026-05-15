'use strict';

const CART_KEY = 'caffeineciao_cart';

// ── Storage ───────────────────────────────────────────────────────────────────
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    if (miniCartIsOpen()) renderMiniCart();
}

function formatMYR(amount) {
    return `RM ${Number(amount).toFixed(2)}`;
}

// ── Mutations ─────────────────────────────────────────────────────────────────
function addToCart(item, qty = 1) {
    const quantity = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    const cart = getCart();
    const existing = cart.find((l) => l.id === item.id);
    if (existing) {
        existing.qty = Math.min(99, existing.qty + quantity);
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            category: item.category,
            image: item.image,
            qty: quantity,
        });
    }
    saveCart(cart);
    return cart;
}

function setCartItemQty(id, qty) {
    const cart = getCart();
    const item = cart.find((l) => l.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, qty));
    saveCart(cart);
    if (document.body.dataset.page === 'checkout') renderCheckout();
}

function removeCartItem(id) {
    saveCart(getCart().filter((l) => l.id !== id));
    if (document.body.dataset.page === 'checkout') renderCheckout();
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function updateCartBadge() {
    const badge = document.getElementById('nav-cart-badge');
    if (!badge) return;
    const count = getCart().reduce((s, l) => s + l.qty, 0);
    const prev = parseInt(badge.textContent, 10) || 0;
    badge.textContent = String(count);
    if (count !== prev) {
        badge.classList.remove('bump');
        requestAnimationFrame(() => badge.classList.add('bump'));
    }
}

// ── Mini Cart ─────────────────────────────────────────────────────────────────
function miniCartIsOpen() {
    const el = document.getElementById('mini-cart');
    return el ? el.classList.contains('is-open') : false;
}

function openMiniCart() {
    const drawer  = document.getElementById('mini-cart');
    const overlay = document.getElementById('mini-cart-overlay');
    if (!drawer || !overlay) return;
    renderMiniCart();
    drawer.hidden  = false;
    overlay.hidden = false;
    requestAnimationFrame(() => {
        drawer.classList.add('is-open');
        overlay.classList.add('is-open');
    });
    document.body.classList.add('mini-cart-open');
    document.getElementById('mini-cart-close')?.focus();
}

function closeMiniCart() {
    const drawer  = document.getElementById('mini-cart');
    const overlay = document.getElementById('mini-cart-overlay');
    if (!drawer || !overlay) return;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('mini-cart-open');
    setTimeout(() => {
        if (!drawer.classList.contains('is-open')) {
            drawer.hidden  = true;
            overlay.hidden = true;
        }
    }, 480);
}

function renderMiniCart() {
    const body      = document.getElementById('mini-cart-body');
    const footer    = document.getElementById('mini-cart-footer');
    const subtotalEl = document.getElementById('mini-cart-subtotal');
    if (!body) return;

    const cart = getCart();
    body.innerHTML = '';

    if (cart.length === 0) {
        if (footer) footer.hidden = true;
        const empty = document.createElement('div');
        empty.className = 'mini-cart-empty';
        empty.innerHTML = `
            <svg class="mini-cart-empty-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>Your cart is empty.<br>Discover something beautiful.</p>
            <a href="index.html#shop" class="mini-cart-continue-btn">Continue Shopping</a>`;
        empty.querySelector('.mini-cart-continue-btn').addEventListener('click', closeMiniCart);
        body.appendChild(empty);
        return;
    }

    let subtotal = 0;
    cart.forEach((item) => {
        subtotal += item.price * item.qty;
        const el = document.createElement('div');
        el.className = 'mini-cart-item';
        el.innerHTML = `
            <img class="mini-cart-item-img" src="${item.image}" alt="${item.name}" width="60" height="60" loading="lazy">
            <div class="mini-cart-item-info">
                <span class="mini-cart-item-name">${item.name}</span>
                <span class="mini-cart-item-price">${formatMYR(item.price)}</span>
                <div class="mini-cart-item-controls">
                    <button type="button" class="mini-cart-qty-btn" aria-label="Decrease quantity">&minus;</button>
                    <span class="mini-cart-qty-value" aria-live="polite">${item.qty}</span>
                    <button type="button" class="mini-cart-qty-btn" aria-label="Increase quantity">+</button>
                    <button type="button" class="mini-cart-remove-btn" aria-label="Remove item">Remove</button>
                </div>
            </div>`;
        const [minusBtn, plusBtn] = el.querySelectorAll('.mini-cart-qty-btn');
        minusBtn.addEventListener('click', () => setCartItemQty(item.id, item.qty - 1));
        plusBtn.addEventListener('click',  () => setCartItemQty(item.id, item.qty + 1));
        el.querySelector('.mini-cart-remove-btn').addEventListener('click', () => removeCartItem(item.id));
        body.appendChild(el);
    });

    if (subtotalEl) subtotalEl.textContent = formatMYR(subtotal);
    if (footer) footer.hidden = false;
}

// ── Add-to-cart modal ─────────────────────────────────────────────────────────
let pendingItem = null;
let pendingQty  = 1;
let toastTimer  = null;

function getProductFromButton(btn) {
    return {
        id:       btn.dataset.id,
        name:     btn.dataset.name,
        price:    parseFloat(btn.dataset.price),
        category: btn.dataset.category,
        image:    btn.dataset.image,
    };
}

function openAddToCartModal(item) {
    const modal = document.getElementById('cart-modal');
    if (!modal || !item) return;
    pendingItem = item;
    pendingQty  = 1;
    const img   = document.getElementById('cart-modal-image');
    const title = document.getElementById('cart-modal-title');
    const price = document.getElementById('cart-modal-price');
    const qtyEl = document.getElementById('cart-modal-qty');
    if (img)   { img.src = item.image; img.alt = item.name; }
    if (title) title.textContent = item.name;
    if (price) price.textContent = formatMYR(item.price);
    if (qtyEl) qtyEl.textContent = '1';
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.getElementById('cart-modal-confirm')?.focus();
}

function closeAddToCartModal() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-modal-open');
    pendingItem = null;
    pendingQty  = 1;
    const onEnd = (event) => {
        if (event.propertyName !== 'opacity') return;
        modal.removeEventListener('transitionend', onEnd);
        if (!modal.classList.contains('is-open')) modal.hidden = true;
    };
    modal.addEventListener('transitionend', onEnd);
    setTimeout(() => { if (!modal.classList.contains('is-open')) modal.hidden = true; }, 400);
}

function setModalQty(next) {
    pendingQty = Math.max(1, Math.min(99, next));
    const qtyEl = document.getElementById('cart-modal-qty');
    if (qtyEl) qtyEl.textContent = String(pendingQty);
}

function confirmAddToCart() {
    if (!pendingItem) return;
    addToCart(pendingItem, pendingQty);
    const name = pendingItem.name;
    closeAddToCartModal();
    showCartToast(`${name} added to your cart`);
}

function showCartToast(message) {
    const toast = document.getElementById('cart-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
        setTimeout(() => { toast.hidden = true; }, 400);
    }, 2800);
}

// ── Checkout page ─────────────────────────────────────────────────────────────
function renderCheckout() {
    const cart       = getCart();
    const emptyEl    = document.getElementById('checkout-empty');
    const contentEl  = document.getElementById('checkout-content');
    const itemsEl    = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    if (!emptyEl || !contentEl || !itemsEl || !subtotalEl) return;

    if (cart.length === 0) {
        emptyEl.hidden  = false;
        contentEl.hidden = true;
        return;
    }

    emptyEl.hidden  = true;
    contentEl.hidden = false;

    let subtotal = 0;
    itemsEl.innerHTML = cart.map((item) => {
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;
        return `
            <li class="checkout-item" data-id="${item.id}">
                <img class="checkout-item-img" src="${item.image}" alt="" width="80" height="80" loading="lazy">
                <div class="checkout-item-details">
                    <span class="checkout-item-category">${item.category}</span>
                    <h3 class="checkout-item-name">${item.name}</h3>
                    <span class="checkout-item-price">${formatMYR(item.price)}</span>
                </div>
                <div class="checkout-item-qty-group">
                    <div class="qty-controls">
                        <button type="button" class="qty-btn" data-action="minus" aria-label="Decrease quantity">&minus;</button>
                        <span class="qty-value" aria-live="polite">${item.qty}</span>
                        <button type="button" class="qty-btn" data-action="plus" aria-label="Increase quantity">+</button>
                    </div>
                    <span class="checkout-item-line-total">${formatMYR(lineTotal)}</span>
                    <button type="button" class="checkout-item-remove" aria-label="Remove ${item.name}">
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                            <path d="M2 4h12M5 4V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V4M6 7v5M10 7v5M3.5 4l.75 9a1 1 0 001 .917h5.5a1 1 0 001-.917L12.5 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </li>`;
    }).join('');

    subtotalEl.textContent = formatMYR(subtotal);

    itemsEl.querySelectorAll('.checkout-item').forEach((row) => {
        const id = row.dataset.id;
        row.querySelector('[data-action="minus"]').addEventListener('click', () => {
            const cur = getCart().find((l) => l.id === id);
            if (cur) setCartItemQty(id, cur.qty - 1);
        });
        row.querySelector('[data-action="plus"]').addEventListener('click', () => {
            const cur = getCart().find((l) => l.id === id);
            if (cur) setCartItemQty(id, cur.qty + 1);
        });
        row.querySelector('.checkout-item-remove').addEventListener('click', () => removeCartItem(id));
    });
}

// ── Init ──────────────────────────────────────────────────────────────────────
function initAddToCartModal() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    document.getElementById('cart-modal-minus')?.addEventListener('click', () => setModalQty(pendingQty - 1));
    document.getElementById('cart-modal-plus')?.addEventListener('click',  () => setModalQty(pendingQty + 1));
    document.getElementById('cart-modal-confirm')?.addEventListener('click', confirmAddToCart);
    modal.querySelectorAll('[data-cart-modal-close]').forEach((el) => el.addEventListener('click', closeAddToCartModal));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (modal.classList.contains('is-open')) closeAddToCartModal();
            else if (miniCartIsOpen()) closeMiniCart();
        }
    });
}

function initMiniCart() {
    document.getElementById('nav-cart-btn')?.addEventListener('click', openMiniCart);
    document.getElementById('mini-cart-close')?.addEventListener('click', closeMiniCart);
    document.getElementById('mini-cart-overlay')?.addEventListener('click', closeMiniCart);
}

function initProductCartControls() {
    document.querySelectorAll('.add-btn[data-id]').forEach((btn) => {
        btn.addEventListener('click', () => openAddToCartModal(getProductFromButton(btn)));
    });
    document.querySelectorAll('.checkout-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openMiniCart();
        });
    });
}

function initCheckoutPage() {
    renderCheckout();
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
        saveCart([]);
        renderCheckout();
    });
    document.getElementById('checkout-pay-btn')?.addEventListener('click', () => {
        const notice = document.getElementById('checkout-notice');
        if (notice) {
            notice.hidden = false;
            notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initAddToCartModal();
    initMiniCart();
    if (document.body.dataset.page === 'checkout') initCheckoutPage();
});

const CART_KEY = 'caffeineciao_cart';

function getCart() {
    try {
        return JSON.parse(sessionStorage.getItem(CART_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveCart(cart) {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatMYR(amount) {
    return `RM ${Number(amount).toFixed(2)}`;
}

function addToCart(item, qty = 1) {
    const quantity = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    const cart = getCart();
    const existing = cart.find((line) => line.id === item.id);

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

function goToCheckout() {
    window.location.href = 'checkout.html';
}

/* —— Add to cart modal —— */
let pendingItem = null;
let pendingQty = 1;
let toastTimer = null;

function getProductFromButton(btn) {
    return {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        category: btn.dataset.category,
        image: btn.dataset.image,
    };
}

function openAddToCartModal(item) {
    const modal = document.getElementById('cart-modal');
    if (!modal || !item) return;

    pendingItem = item;
    pendingQty = 1;

    const img = document.getElementById('cart-modal-image');
    const title = document.getElementById('cart-modal-title');
    const price = document.getElementById('cart-modal-price');
    const qtyEl = document.getElementById('cart-modal-qty');

    if (img) {
        img.src = item.image;
        img.alt = item.name;
    }
    if (title) title.textContent = item.name;
    if (price) price.textContent = formatMYR(item.price);
    if (qtyEl) qtyEl.textContent = '1';

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-modal-open');

    requestAnimationFrame(() => {
        modal.classList.add('is-open');
    });

    document.getElementById('cart-modal-confirm')?.focus();
}

function closeAddToCartModal() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-modal-open');
    pendingItem = null;
    pendingQty = 1;

    const onEnd = (event) => {
        if (event.propertyName !== 'opacity') return;
        modal.removeEventListener('transitionend', onEnd);
        if (!modal.classList.contains('is-open')) {
            modal.hidden = true;
        }
    };
    modal.addEventListener('transitionend', onEnd);
    setTimeout(() => {
        if (!modal.classList.contains('is-open')) {
            modal.hidden = true;
        }
    }, 400);
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
    showCartToast(`${name} added to your selection`);
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
        setTimeout(() => {
            toast.hidden = true;
        }, 400);
    }, 2800);
}

function initAddToCartModal() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;

    document.getElementById('cart-modal-minus')?.addEventListener('click', () => {
        setModalQty(pendingQty - 1);
    });

    document.getElementById('cart-modal-plus')?.addEventListener('click', () => {
        setModalQty(pendingQty + 1);
    });

    document.getElementById('cart-modal-confirm')?.addEventListener('click', confirmAddToCart);

    modal.querySelectorAll('[data-cart-modal-close]').forEach((el) => {
        el.addEventListener('click', closeAddToCartModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeAddToCartModal();
        }
    });
}

function initProductCartControls() {
    document.querySelectorAll('.add-btn[data-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
            openAddToCartModal(getProductFromButton(btn));
        });
    });

    document.querySelectorAll('.checkout-btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            goToCheckout();
        });
    });
}

function renderCheckout() {
    const cart = getCart();
    const emptyEl = document.getElementById('checkout-empty');
    const contentEl = document.getElementById('checkout-content');
    const itemsEl = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');

    if (!emptyEl || !contentEl || !itemsEl || !subtotalEl) return;

    if (cart.length === 0) {
        emptyEl.hidden = false;
        contentEl.hidden = true;
        return;
    }

    emptyEl.hidden = true;
    contentEl.hidden = false;

    let subtotal = 0;
    itemsEl.innerHTML = cart
        .map((item) => {
            const lineTotal = item.price * item.qty;
            subtotal += lineTotal;
            return `
                <li class="checkout-item">
                    <img class="checkout-item-img" src="${item.image}" alt="" width="72" height="72" loading="lazy">
                    <div class="checkout-item-details">
                        <span class="checkout-item-category">${item.category}</span>
                        <h3 class="checkout-item-name">${item.name}</h3>
                        <span class="checkout-item-meta">${formatMYR(item.price)} &times; ${item.qty}</span>
                    </div>
                    <span class="checkout-item-total">${formatMYR(lineTotal)}</span>
                </li>
            `;
        })
        .join('');

    subtotalEl.textContent = formatMYR(subtotal);
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
    initAddToCartModal();

    if (document.body.dataset.page === 'checkout') {
        initCheckoutPage();
    }
});

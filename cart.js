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

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find((line) => line.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
    window.location.href = 'checkout.html';
}

function initAddToCartButtons() {
    document.querySelectorAll('.add-btn[data-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
            addToCart({
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                category: btn.dataset.category,
                image: btn.dataset.image,
            });
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
    if (document.body.dataset.page === 'checkout') {
        initCheckoutPage();
    }
});

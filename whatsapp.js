(function () {
    'use strict';

    const WA_NUMBER = '60123456789';

    // ── Toast ──────────────────────────────────────────────────────
    function showToast() {
        const toast = document.getElementById('wa-toast');
        if (!toast) return;
        toast.classList.add('is-visible');
        setTimeout(() => toast.classList.remove('is-visible'), 3000);
    }

    // ── Message builder ────────────────────────────────────────────
    function buildMessage(name, phone) {
        const items = getCart();
        const lines = items.map((item) => {
            const sub = (item.price * item.qty).toFixed(2);
            return `- ${item.name} x${item.qty} — RM${sub}`;
        });
        const total = items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

        return [
            'Hello CaffeineCiao ☕,',
            '',
            'I would like to place an order:',
            '',
            '🛒 Items:',
            ...lines,
            '',
            '💰 Total:',
            `RM${total}`,
            '',
            '📍 Name:',
            name,
            '',
            '📞 Contact:',
            phone,
            '',
            'Thank you.',
        ].join('\n');
    }

    // ── Modal helpers ──────────────────────────────────────────────
    function openWaModal() {
        const overlay = document.getElementById('wa-modal-overlay');
        const modal   = document.getElementById('wa-modal');
        if (!modal) return;

        ['wa-name', 'wa-phone'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) { el.value = ''; el.classList.remove('is-error'); }
        });
        ['wa-name-error', 'wa-phone-error'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });

        overlay.hidden = false;
        modal.hidden   = false;
        requestAnimationFrame(() => {
            overlay.classList.add('is-open');
            modal.classList.add('is-open');
        });
        document.getElementById('wa-name')?.focus();
    }

    function closeWaModal() {
        const overlay = document.getElementById('wa-modal-overlay');
        const modal   = document.getElementById('wa-modal');
        if (!overlay || !modal) return;
        overlay.classList.remove('is-open');
        modal.classList.remove('is-open');
        setTimeout(() => {
            overlay.hidden = true;
            modal.hidden   = true;
        }, 350);
    }

    // ── Confirm & redirect ─────────────────────────────────────────
    function confirmWhatsApp() {
        const nameEl  = document.getElementById('wa-name');
        const phoneEl = document.getElementById('wa-phone');
        let valid = true;

        if (!nameEl.value.trim()) {
            nameEl.classList.add('is-error');
            document.getElementById('wa-name-error').textContent = 'Please enter your name.';
            valid = false;
        } else {
            nameEl.classList.remove('is-error');
            document.getElementById('wa-name-error').textContent = '';
        }

        if (!phoneEl.value.trim()) {
            phoneEl.classList.add('is-error');
            document.getElementById('wa-phone-error').textContent = 'Please enter your phone number.';
            valid = false;
        } else {
            phoneEl.classList.remove('is-error');
            document.getElementById('wa-phone-error').textContent = '';
        }

        if (!valid) return;

        if (getCart().length === 0) { closeWaModal(); return; }

        const msg = buildMessage(nameEl.value.trim(), phoneEl.value.trim());
        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

        closeWaModal();
        showToast();

        setTimeout(() => {
            saveCart([]);
            updateCartBadge();
            renderMiniCart();
            if (typeof renderCheckout === 'function') renderCheckout();
            window.open(url, '_blank');
        }, 650);
    }

    // ── Init ───────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#mini-cart-whatsapp-btn') || e.target.closest('#checkout-whatsapp-btn')) {
                if (getCart().length === 0) return;
                openWaModal();
            }
        });

        document.getElementById('wa-modal-overlay')?.addEventListener('click', closeWaModal);
        document.getElementById('wa-cancel-btn')?.addEventListener('click', closeWaModal);
        document.getElementById('wa-confirm-btn')?.addEventListener('click', confirmWhatsApp);

        document.getElementById('wa-modal')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') confirmWhatsApp();
            if (e.key === 'Escape') closeWaModal();
        });
    });
}());

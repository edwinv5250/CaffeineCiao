function initBrandDropdown() {
    const wrapper = document.querySelector('.nav-brand-dropdown');
    if (!wrapper) return;

    const trigger = wrapper.querySelector('.nav-brand');
    const menu = wrapper.querySelector('.brand-dropdown');
    if (!trigger || !menu) return;

    const links = menu.querySelectorAll('.brand-dropdown-link');

    const openMenu = () => {
        menu.hidden = false;
        requestAnimationFrame(() => {
            menu.classList.add('is-open');
        });
        trigger.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        if (trigger.getAttribute('aria-expanded') !== 'true') return;
        menu.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        const onEnd = (event) => {
            if (event.propertyName !== 'opacity') return;
            menu.removeEventListener('transitionend', onEnd);
            if (!menu.classList.contains('is-open')) {
                menu.hidden = true;
            }
        };
        menu.addEventListener('transitionend', onEnd);
        setTimeout(() => {
            if (!menu.classList.contains('is-open')) {
                menu.hidden = true;
            }
        }, 400);
    };

    const toggleMenu = () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    links.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (!wrapper.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', initBrandDropdown);

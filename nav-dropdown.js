function initBrandDropdown() {
    const wrapper = document.getElementById('nav-brand-dropdown');
    if (!wrapper) return;

    const menu = wrapper.querySelector('.brand-dropdown');
    const menuCue = wrapper.querySelector('.brand-menu-cue');
    const links = wrapper.querySelectorAll('.brand-dropdown-link');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let closeTimer = null;

    const setExpanded = (open) => {
        wrapper.classList.toggle('is-open', open);
        if (menuCue) {
            menuCue.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
    };

    const openMenu = () => {
        clearTimeout(closeTimer);
        setExpanded(true);
    };

    const closeMenu = () => {
        setExpanded(false);
    };

    const scheduleClose = () => {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeMenu, 160);
    };

    if (canHover) {
        wrapper.addEventListener('mouseenter', openMenu);
        wrapper.addEventListener('mouseleave', scheduleClose);
    } else if (menuCue) {
        menuCue.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = wrapper.classList.contains('is-open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (!wrapper.contains(event.target)) {
                closeMenu();
            }
        });
    }

    links.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', initBrandDropdown);

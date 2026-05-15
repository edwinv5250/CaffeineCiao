function initBrandDropdown() {
    const wrapper = document.getElementById('nav-brand-dropdown');
    if (!wrapper) return;

    const menu    = wrapper.querySelector('.brand-dropdown');
    const menuCue = wrapper.querySelector('.brand-menu-cue');
    const links   = wrapper.querySelectorAll('.brand-dropdown-link');

    // True touch device: no fine pointer (mouse/trackpad)
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    let closeTimer  = null;
    let justToggled = false; // guard against double-fire on touch

    function setExpanded(open) {
        wrapper.classList.toggle('is-open', open);
        if (menuCue) menuCue.setAttribute('aria-expanded', String(open));
        // Blur focused children so :focus-within can't fight the close
        if (!open && wrapper.contains(document.activeElement)) {
            document.activeElement.blur();
        }
    }

    function openMenu() {
        clearTimeout(closeTimer);
        setExpanded(true);
    }

    function closeMenu() {
        clearTimeout(closeTimer);
        setExpanded(false);
    }

    function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeMenu, 160);
    }

    if (isTouch) {
        // ── Touch / tap behaviour ──────────────────────────────
        menuCue?.addEventListener('touchend', (e) => {
            e.preventDefault(); // stop synthetic mouse/click events
            if (justToggled) return;
            justToggled = true;
            setTimeout(() => { justToggled = false; }, 400);

            wrapper.classList.contains('is-open') ? closeMenu() : openMenu();
        });

        // Close when tapping outside
        document.addEventListener('touchend', (e) => {
            if (!wrapper.contains(e.target)) closeMenu();
        });
    } else {
        // ── Hover / mouse behaviour ────────────────────────────
        wrapper.addEventListener('mouseenter', openMenu);
        wrapper.addEventListener('mouseleave', scheduleClose);

        // Keyboard toggle via button click
        menuCue?.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.contains('is-open') ? closeMenu() : openMenu();
        });

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) closeMenu();
        });
    }

    links.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

document.addEventListener('DOMContentLoaded', initBrandDropdown);

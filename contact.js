(function () {
    'use strict';

    // ── CONFIGURATION ─────────────────────────────────────────────────────────
    // Paste your deployed Google Apps Script Web App URL here:
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2PRsrcBaigIhyjXY4hBkurrG0rukgGmnxdDxXy7eD9iuvL4dFyPDb0muShfxLYlHF/exec';

    // ── ELEMENTS ──────────────────────────────────────────────────────────────
    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('cf-submit');
    const successEl = document.getElementById('contact-success');
    const resetBtn  = document.getElementById('cf-reset');

    if (!form) return;

    // ── VALIDATION RULES ──────────────────────────────────────────────────────
    const rules = {
        name:    (v) => v.trim().length >= 2 ? '' : 'Please enter your name.',
        email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
        message: (v) => v.trim().length >= 5 ? '' : 'Please write a message.',
    };

    function validate(name, value) {
        return rules[name] ? rules[name](value) : '';
    }

    function applyError(inputEl, errorElId, msg) {
        const errEl = document.getElementById(errorElId);
        if (msg) {
            inputEl.classList.add('is-error');
            if (errEl) errEl.textContent = msg;
        } else {
            inputEl.classList.remove('is-error');
            if (errEl) errEl.textContent = '';
        }
    }

    function clearAllErrors() {
        ['cf-name', 'cf-email', 'cf-message'].forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove('is-error');
            const errEl = document.getElementById(id + '-error');
            if (errEl) errEl.textContent = '';
        });
    }

    // ── LIVE VALIDATION ───────────────────────────────────────────────────────
    ['cf-name', 'cf-email', 'cf-message'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('blur', () => {
            applyError(el, id + '-error', validate(el.name, el.value));
        });

        el.addEventListener('input', () => {
            if (el.classList.contains('is-error')) {
                applyError(el, id + '-error', validate(el.name, el.value));
            }
        });
    });

    // ── SUBMIT ────────────────────────────────────────────────────────────────
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();

        const nameEl    = document.getElementById('cf-name');
        const emailEl   = document.getElementById('cf-email');
        const messageEl = document.getElementById('cf-message');

        const fieldsToValidate = [
            { el: nameEl,    errorId: 'cf-name-error',    name: 'name' },
            { el: emailEl,   errorId: 'cf-email-error',   name: 'email' },
            { el: messageEl, errorId: 'cf-message-error', name: 'message' },
        ];

        let isValid = true;
        fieldsToValidate.forEach(({ el, errorId, name }) => {
            const err = validate(name, el.value);
            if (err) {
                applyError(el, errorId, err);
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll first error into view
            const firstErr = form.querySelector('.is-error');
            if (firstErr) firstErr.focus();
            return;
        }

        // Set loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');

        const payload = {
            name:    nameEl.value.trim(),
            email:   emailEl.value.trim(),
            phone:   (document.getElementById('cf-phone') || {}).value?.trim() || '',
            message: messageEl.value.trim(),
        };

        // Send to Google Sheets via Apps Script (fire-and-forget with no-cors)
        try {
            const isConfigured = APPS_SCRIPT_URL && !APPS_SCRIPT_URL.startsWith('YOUR_');
            if (isConfigured) {
                await fetch(APPS_SCRIPT_URL, {
                    method:  'POST',
                    mode:    'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify(payload),
                });
            }
        } catch (_) {
            // Network failure — still show success (graceful degradation)
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
        }

        // Show success panel
        form.reset();
        form.hidden = true;
        successEl.hidden = false;
        successEl.focus();
    });

    // ── RESET ─────────────────────────────────────────────────────────────────
    resetBtn.addEventListener('click', () => {
        successEl.hidden = true;
        form.hidden = false;
        clearAllErrors();
        document.getElementById('cf-name')?.focus();
    });
}());

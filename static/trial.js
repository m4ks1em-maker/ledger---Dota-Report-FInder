// Free trial (Steam sign-in, no key): a bar on top with the replays left today, the dialog
// when they run out, and the Telegram link every "Get a key" button uses.
(function () {
    'use strict';
    const T = (x) => (window.LedgerI18n ? window.LedgerI18n.t(x) : x);
    const ru = () => !!(window.LedgerI18n && window.LedgerI18n.lang === 'ru');
    const plural = (n, a, b, c) => (window.LedgerI18n && window.LedgerI18n.plural ? window.LedgerI18n.plural(n, a, b, c) : c);
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    let st = null, tg = 'm4ks1em', bar = null;
    const url = () => 'https://t.me/' + encodeURIComponent(tg);

    function leftText(t) {
        if (ru()) return t.left ? 'Сегодня ' + t.left + ' из ' + t.limit + ' ' + plural(t.limit, 'бесплатного разбора', 'бесплатных разборов', 'бесплатных разборов') : 'Бесплатные разборы на сегодня закончились';
        return t.left ? t.left + ' of ' + t.limit + ' free replays left today' : 'No free replays left today';
    }
    function paint() {
        document.documentElement.classList.toggle('is-trial', !!st);
        if (!st) { if (bar) { bar.remove(); bar = null; } return; }
        const main = document.querySelector('.main-content');
        if (!main) return;
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'trial-bar';
            bar.setAttribute('role', 'status');
            main.insertBefore(bar, main.firstChild);
        }
        bar.classList.toggle('out', !st.left);
        const dots = Array.from({ length: Math.min(10, st.limit || 0) }, (_, i) => '<i class="' + (i < st.limit - st.left ? 'used' : '') + '"></i>').join('');
        bar.innerHTML =
            '<span class="tb-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.8l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.1l6-.7z"/></svg></span>' +
            '<span class="tb-txt"><b>' + esc(T('Free trial')) + '</b><span>' + esc(leftText(st)) + '<em class="tb-dots" aria-hidden="true">' + dots + '</em></span></span>' +
            '<span class="tb-hint">' + esc(T('Who reported you is hidden')) + '</span>' +
            '<span class="tb-act"><a class="tb-key" href="/login">' + esc(T('I have a key')) + '</a>' +
            '<a class="tb-buy" href="' + esc(url()) + '" target="_blank" rel="noopener noreferrer">' + esc(T('Get a key')) + '</a></span>';
    }
    function note(t) {
        if (!t) return;
        st = Object.assign({ limit: 2, left: 0 }, st || {}, t);
        if (t.telegram) tg = String(t.telegram).replace(/^@/, '');
        paint();
    }
    async function limit(t, skipped) {
        note(Object.assign({}, t, { left: 0 }));
        if (!window.LedgerUI || !LedgerUI.confirm) return;
        const n = (st && st.limit) || 2;
        const text = ru()
            ? 'Без ключа можно разобрать ' + n + ' ' + plural(n, 'реплей', 'реплея', 'реплеев') + ' в день. Новые появятся завтра.' + (skipped > 0 ? ' Не разобрано: ' + skipped + '.' : '') + ' С ключом — без лимита, и видно, кто именно тебя репортил.'
            : 'Without a key you can analyse ' + n + ' replays a day. More tomorrow.' + (skipped > 0 ? ' Not analysed: ' + skipped + '.' : '') + ' With a key there is no limit, and you see exactly who reported you.';
        const ok = await LedgerUI.confirm({ title: T('Free replays for today are used up'), text, ok: T('Get a key'), cancel: T('Later'), danger: false });
        if (ok) window.open(url(), '_blank', 'noopener');
    }
    function load() {
        return fetch('/_ledger/me', { credentials: 'same-origin', cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((m) => {
                if (!m) return;
                if (m.telegram) tg = String(m.telegram).replace(/^@/, '');
                if (m.trial) note(m.trial); else if (st) { st = null; paint(); }
            }).catch(() => {});
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
    setInterval(load, 5 * 60000);
    document.addEventListener('ledger:lang', paint);
    window.LedgerTrial = { note, limit, telegram: () => tg, active: () => !!st, state: () => st, url };
})();

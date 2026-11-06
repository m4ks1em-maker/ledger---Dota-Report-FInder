// DotaTraker — your profile: Steam identity, subscription, numbers from your analysed matches and achievements.
// Opens from the account chip in the header (and the key tile on the home tab). Everything is computed
// in the browser from the local match history; the key data comes from /_ledger/me.
(function () {
    'use strict';
    const T = (x) => (window.LedgerI18n ? window.LedgerI18n.t(x) : x);
    const ru = () => !!(window.LedgerI18n && window.LedgerI18n.lang === 'ru');
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const reduced = () => !!(window.LedgerUI && LedgerUI.reduced && LedgerUI.reduced());
    const DAY = 86400000;
    const BASE = 76561197960265728n;
    const sid64 = (v) => { try { const s = String(v || '').trim(); const m = /^\[?U:1:(\d+)\]?$/i.exec(s); let n = m ? BigInt(m[1]) : (/^\d{1,20}$/.test(s) ? BigInt(s) : 0n); if (!n) return ''; if (n < BASE) n += BASE; return n.toString(); } catch (_) { return ''; } };
    const plural = (n, a, b, c) => (window.LedgerI18n && LedgerI18n.plural ? LedgerI18n.plural(n, a, b, c) : c);

    const TIER = {
        admin: { en: 'Admin', ru: 'Админ', cls: 't-admin' },
        forever: { en: 'Forever ∞', ru: 'Вечная ∞', cls: 't-forever' },
        year: { en: '1 year', ru: '1 год', cls: 't-year' },
        half: { en: '6 months', ru: '6 мес', cls: 't-half' },
        quarter: { en: '3 months', ru: '3 мес', cls: 't-quarter' },
        month: { en: '1 month', ru: '1 мес', cls: 't-month' }
    };

    // ---------- numbers from the local history ----------
    function history() { try { return JSON.parse(localStorage.getItem('ledgerHistory') || '{}') || {}; } catch (_) { return {}; } }
    function compute(me) {
        const hist = history();
        const ids = Object.keys(hist);
        const out = { total: ids.length, mine: 0, recv: 0, made: 0, clean: 0, streak: 0, maxOne: 0, noMate: 0, heroes: {}, haters: {}, mineKnown: !!me };
        if (!me) return out;
        const rows = ids.map((id) => ({ id, h: hist[id], t: hist[id].d ? new Date(hist[id].d).getTime() : (hist[id].a || 0) })).sort((a, b) => a.t - b.t);
        let run = 0;
        rows.forEach(({ h }) => {
            const reps = Array.isArray(h.r) ? h.r : [];
            const roster = Array.isArray(h.p) ? h.p : [];
            const meRow = roster.find((x) => sid64(x[0]) === me);
            const onMe = reps.filter((r) => sid64(r[6]) === me);
            const byMe = reps.filter((r) => sid64(r[2]) === me);
            if (!meRow && !onMe.length && !byMe.length) return;      // a match without you
            out.mine++;
            out.recv += onMe.length; out.made += byMe.length;
            out.maxOne = Math.max(out.maxOne, onMe.length);
            if (!onMe.length) { out.clean++; run++; out.streak = Math.max(out.streak, run); } else run = 0;
            if (!onMe.some((r) => r[5] === 1)) out.noMate++;
            const hero = (meRow && meRow[1]) || (onMe[0] && onMe[0][8]) || (byMe[0] && byMe[0][4]) || '';
            if (hero && !/^unknown$/i.test(hero)) out.heroes[hero] = (out.heroes[hero] || 0) + 1;
            onMe.forEach((r) => { const k = r[2] || r[3]; if (!k) return; const e = out.haters[k] || (out.haters[k] = { name: r[3] || ('…' + String(r[2]).slice(-5)), hero: r[4] || '', n: 0 }); e.n++; });
        });
        return out;
    }

    // ---------- achievements ----------
    const IC = {
        blood: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
        scroll: '<path d="M7 4h10v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2h3z"/><path d="M10 8h4M10 12h4"/>',
        tower: '<path d="M8 21V9l-2-2V3h3v2h2V3h2v2h2V3h3v4l-2 2v12z"/><path d="M10 21v-4h4v4"/>',
        books: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="m16 5 3.8-1 3 15.4-3.8 1z"/>',
        shield: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="m9 12 2 2 4-4"/>',
        crown: '<path d="M4 18 3 7l5 4 4-6 4 6 5-4-1 11z"/><path d="M5 21h14"/>',
        bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
        gavel: '<path d="m14 4 6 6M11 7l6 6M4 20l7-7M8.5 8.5l7 7"/>',
        hands: '<path d="M7 11V6a2 2 0 0 1 4 0v5M11 10V5a2 2 0 0 1 4 0v6M15 10a2 2 0 0 1 4 0v3a7 7 0 0 1-14 0v-2a2 2 0 0 1 2-2"/>',
        mask: '<path d="M4 7c3-2 13-2 16 0 0 7-3 12-8 12S4 14 4 7z"/><path d="M8 11h2M14 11h2"/>',
        eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
        link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
        gem: '<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 18 3-18"/>',
        hourglass: '<path d="M6 3h12M6 21h12M7 3c0 5 10 6 10 9s-10 4-10 9M17 3c0 5-10 6-10 9s10 4 10 9"/>'
    };
    function achievements(s, me, ctx) {
        const days = ctx.activatedAt ? Math.floor((ctx.now - ctx.activatedAt) / DAY) : 0;
        const list = [
            { ic: 'blood', c: 'red', t: 'First blood', d: 'Analyse your first match', v: s.total, n: 1 },
            { ic: 'scroll', c: 'gold', t: 'Analyst', d: 'Analyse 10 matches', v: s.total, n: 10 },
            { ic: 'tower', c: 'gold', t: 'Veteran', d: 'Analyse 50 matches', v: s.total, n: 50 },
            { ic: 'books', c: 'gold', t: 'Archivist', d: 'Analyse 100 matches', v: s.total, n: 100 },
            { ic: 'shield', c: 'green', t: 'Clean hands', d: '5 of your matches without a single report on you', v: s.clean, n: 5, needMe: true },
            { ic: 'crown', c: 'green', t: 'Untouchable', d: '10 of your matches in a row without reports', v: s.streak, n: 10, needMe: true },
            { ic: 'bolt', c: 'red', t: 'Lightning rod', d: '3 or more reports on you in one match', v: s.maxOne, n: 3, needMe: true },
            { ic: 'gavel', c: 'purple', t: 'Judge', d: 'You reported 10 players', v: s.made, n: 10, needMe: true },
            { ic: 'hands', c: 'green', t: 'Good teammate', d: '10 matches without a report from your own team', v: s.noMate, n: 10, needMe: true },
            { ic: 'mask', c: 'purple', t: 'Jack of all trades', d: 'Play 10 different heroes in your matches', v: Object.keys(s.heroes).length, n: 10, needMe: true },
            { ic: 'eye', c: 'teal', t: 'Detective', d: 'Look up another player', v: ctx.players, n: 1 },
            { ic: 'link', c: 'teal', t: 'Connected', d: 'Link your Steam account', v: me ? 1 : 0, n: 1 },
            { ic: 'hourglass', c: 'gold', t: 'Old-timer', d: '30 days with DotaTraker', v: days, n: 30 },
            { ic: 'gem', c: 'gold', t: 'Legend', d: 'Own a forever key', v: ctx.forever ? 1 : 0, n: 1 }
        ];
        list.forEach((a) => { a.done = a.v >= a.n && !(a.needMe && !me); a.pct = Math.max(0, Math.min(1, (a.needMe && !me) ? 0 : a.v / a.n)); });
        return list;
    }

    // ---------- view ----------
    let back = null, lastFocus = null;
    function close() {
        if (!back) return;
        const b = back; back = null;
        b.classList.remove('in'); b.classList.add('out');
        const v = b.querySelector('video'); if (v) v.pause();
        document.removeEventListener('keydown', onKey, true);
        setTimeout(() => b.remove(), reduced() ? 0 : 260);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) { if (e.key === 'Escape') { e.preventDefault(); close(); } }

    function fmtDate(t) { try { return new Date(t).toLocaleDateString(ru() ? 'ru-RU' : undefined, { day: 'numeric', month: 'long', year: 'numeric' }); } catch (_) { return ''; } }
    function daysWord(n) { return ru() ? plural(n, 'день', 'дня', 'дней') : (n === 1 ? 'day' : 'days'); }

    function ring(frac, color) {
        const C = 2 * Math.PI * 52;
        return '<svg class="pf-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="pf-ring-bg"/>'
            + '<circle cx="60" cy="60" r="52" class="pf-ring-fg ' + color + '" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + C.toFixed(1) + '" data-to="' + (C * (1 - frac)).toFixed(1) + '" transform="rotate(-90 60 60)"/></svg>';
    }

    async function open() {
        if (back) return;
        lastFocus = document.activeElement;
        let me = null;
        try { const r = await fetch('/_ledger/me', { credentials: 'same-origin', cache: 'no-store' }); if (r.ok) me = await r.json(); } catch (_) {}
        if (!me) { if (window.LedgerUI) LedgerUI.toast(T('Could not load your profile.'), 'bad'); return; }
        const skew = Number(me.serverTime) > 0 ? Number(me.serverTime) - Date.now() : 0;
        const now = Date.now() + skew;
        const mySid = (me.steam && sid64(me.steam.id)) || '';
        const s = compute(mySid);
        const tier = TIER[me.role === 'admin' ? 'admin' : me.tier] || (me.expiresAt ? TIER.month : TIER.forever);
        const forever = !me.expiresAt;
        const players = window.LedgerPlayers ? window.LedgerPlayers.list().length : 0;
        const ach = achievements(s, mySid, { now, activatedAt: me.activatedAt, forever: forever && !me.trial, players });
        const doneN = ach.filter((a) => a.done).length;
        const favHero = Object.keys(s.heroes).sort((a, b) => s.heroes[b] - s.heroes[a])[0] || '';
        const fav = favHero && window.ledgerHeroInfo ? window.ledgerHeroInfo(favHero) : null;
        const hater = Object.values(s.haters).sort((a, b) => b.n - a.n)[0] || null;
        const name = (me.steam && me.steam.name) || me.label || T('Your key');
        // badge: Admin / Forever, else the key's own length ("30 days"), not a rounded tier
        const tr0 = me.trial || null;
        const tierLabel = tr0 ? T('Free trial') : me.role === 'admin' ? (ru() ? TIER.admin.ru : TIER.admin.en) : forever ? (ru() ? TIER.forever.ru : TIER.forever.en)
            : me.durationDays > 0 ? me.durationDays + ' ' + daysWord(me.durationDays) : (ru() ? tier.ru : tier.en);

        // subscription
        const left = me.expiresAt ? Math.max(0, Math.ceil((me.expiresAt - now) / DAY)) : null;
        const total = me.durationDays > 0 ? me.durationDays : (me.activatedAt && me.expiresAt ? Math.max(1, Math.round((me.expiresAt - me.activatedAt) / DAY)) : 0);
        const subFrac = tr0 ? Math.max(0.02, (tr0.left || 0) / Math.max(1, tr0.limit || 1)) : forever ? 1 : (total ? Math.max(0.02, Math.min(1, left / total)) : 0);
        const subColor = tr0 ? (tr0.left ? 'amber' : 'red') : forever ? 'gold' : left <= 3 ? 'red' : left <= 10 ? 'amber' : 'green';
        const trialLine = tr0 ? (ru() ? 'Сегодня ' + tr0.left + ' из ' + tr0.limit + ' бесплатных разборов' : tr0.left + ' of ' + tr0.limit + ' free replays left today') : '';
        const since = me.activatedAt ? Math.max(0, Math.floor((now - me.activatedAt) / DAY)) : null;

        back = document.createElement('div');
        back.className = 'dialog-back pf-back';
        const box = document.createElement('div');
        box.className = 'pf ' + tier.cls;
        box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', T('Profile'));
        const avatar = me.steam && me.steam.avatar ? '<img src="' + esc(me.steam.avatar) + '" alt="">' : '<span>' + esc(name.trim().charAt(0).toUpperCase() || 'D') + '</span>';
        const pct = (n) => (s.mine ? Math.round((n / s.mine) * 100) : 0);

        box.innerHTML =
            '<div class="pf-banner">'
            + '<div class="pf-banner-glow"></div>'
            + (fav ? '<div class="pf-banner-fig"><img alt="" src="/_ledger/od/heroart?k=png&h=' + esc(fav.npc) + '">' + (reduced() ? '' : '<video muted loop playsinline autoplay src="/_ledger/od/heroart?k=webm&h=' + esc(fav.npc) + '"></video>') + '</div>' : '<div class="pf-banner-sigil"></div>')
            + '<div class="pf-banner-shade"></div>'
            + (fav ? '<div class="pf-banner-hero"><small>' + esc(T('Favourite hero')) + '</small><b>' + esc(fav.name) + '</b><em>' + s.heroes[favHero] + ' ' + esc(T('matches')) + '</em></div>' : '')
            + '<button type="button" class="pf-x" aria-label="' + esc(T('Close')) + '">×</button>'
            + '</div>'
            + '<div class="pf-head">'
            + '<div class="pf-ava">' + avatar + '</div>'
            + '<div class="pf-id"><h2>' + esc(name) + '</h2>'
            + '<div class="pf-meta"><span class="pf-tier">' + esc(tierLabel) + '</span>'
            + (mySid ? '<button type="button" class="pf-sid" title="' + esc(T('Copy Steam ID')) + '">ID ' + esc(mySid) + '</button>' : '<a class="pf-sid link" href="/_ledger/steam/start?from=app">' + esc(T('Link Steam')) + '</a>')
            + (since != null ? '<span class="pf-since">' + esc(T('with DotaTraker')) + ' ' + since + ' ' + esc(daysWord(since)) + '</span>' : '')
            + '</div></div></div>'

            + '<div class="pf-body">'
            + '<div class="pf-grid">'
            + (tr0 ? '<section class="pf-card pf-sub">'
            + '<div class="pf-ring-wrap">' + ring(subFrac, subColor) + '<div class="pf-ring-num"><b data-count="' + (tr0.left || 0) + '">0</b><small>' + esc(T('today')) + '</small></div></div>'
            + '<div class="pf-sub-text"><h3>' + esc(T('Free trial')) + '</h3>'
            + '<p class="pf-sub-big ' + subColor + '">' + esc(trialLine) + '</p>'
            + '<p class="pf-sub-line">' + esc(T('Who reported you stays hidden until you enter a key.')) + '</p>'
            + '<a class="pf-renew" target="_blank" rel="noopener noreferrer" href="https://t.me/' + encodeURIComponent(me.telegram || 'm4ks1em') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="m9 13 9-7"/></svg>' + esc(T('Buy a key in Telegram')) + '</a>'
            + '</div></section>'
            + '<section class="pf-card pf-key"><h3>' + esc(T('Key')) + '</h3><dl>'
            + '<dt>' + esc(T('Key code')) + '</dt><dd>' + esc(T('No key yet')) + '</dd>'
            + '<dt>' + esc(T('Version')) + '</dt><dd>' + esc(me.version || '') + '</dd>'
            + '</dl><a class="pf-renew" href="/login">' + esc(T('Enter a key')) + '</a></section>'
            : '<section class="pf-card pf-sub">'
            + '<div class="pf-ring-wrap">' + ring(subFrac, subColor) + '<div class="pf-ring-num">' + (forever ? '<b class="inf">∞</b>' : '<b data-count="' + left + '">0</b><small>' + esc(daysWord(left)) + '</small>') + '</div></div>'
            + '<div class="pf-sub-text"><h3>' + esc(T('Subscription')) + '</h3>'
            + '<p class="pf-sub-big ' + subColor + '">' + esc(forever ? T('Forever') : (left === 0 ? T('Expired') : T('Subscription active'))) + '</p>'
            + '<p class="pf-sub-line">' + esc(forever ? T('This key never expires.') : T('Valid until') + ' ' + fmtDate(me.expiresAt)) + '</p>'
            + (me.activatedAt ? '<p class="pf-sub-line dim">' + esc(T('Activated')) + ' ' + esc(fmtDate(me.activatedAt)) + '</p>' : '')
            + '<a class="pf-renew" target="_blank" rel="noopener noreferrer" href="https://t.me/' + encodeURIComponent(me.telegram || 'm4ks1em') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="m9 13 9-7"/></svg>' + esc(forever ? T('Write in Telegram') : T('Renew in Telegram')) + '</a>'
            + '</div></section>'
            + '<section class="pf-card pf-key"><h3>' + esc(T('Key')) + '</h3><dl>'
            + '<dt>' + esc(T('Key code')) + '</dt><dd class="mono">LDG-••••-' + esc(me.tail || '????') + '</dd>'
            + '<dt>' + esc(T('Computers')) + '</dt><dd>' + (me.devices || 1) + ' / ' + (me.maxDevices || 1) + '</dd>'
            + '<dt>' + esc(T('Version')) + '</dt><dd>' + esc(me.version || '') + '</dd>'
            + '<dt>' + esc(T('Key server')) + '</dt><dd class="' + (me.offline ? 'bad' : 'ok') + '"><i></i>' + esc(me.offline ? T('No connection') : T('Online')) + '</dd>'
            + '</dl></section>')
            + '</div>'

            + '<div class="pf-stats">'
            + stat(T('Matches analysed'), s.total, '')
            + stat(T('Reports on you'), mySid ? s.recv : '—', 'red')
            + stat(T('You reported'), mySid ? s.made : '—', 'purple')
            + stat(T('Clean matches'), mySid ? pct(s.clean) + '%' : '—', 'green')
            + '</div>'
            + (mySid ? '' : '<p class="pf-note">' + esc(T('Link your Steam account to count reports on you and your heroes.')) + '</p>')
            + (hater ? '<div class="pf-hater"><span class="pf-hater-ic">!</span><div><small>' + esc(T('Reports you most')) + '</small><b>' + esc(hater.name) + '</b>' + (hater.hero ? '<em>' + esc(hater.hero) + '</em>' : '') + '</div><strong>' + hater.n + '</strong></div>' : '')

            + '<div class="pf-ach-head"><h3>' + esc(T('Achievements')) + '</h3><span class="pf-ach-count"><b>' + doneN + '</b> / ' + ach.length + '</span></div>'
            + '<div class="pf-ach-bar"><i style="width:' + Math.round((doneN / ach.length) * 100) + '%"></i></div>'
            + '<div class="pf-ach">' + ach.map((a, i) =>
                '<div class="pf-a ' + a.c + (a.done ? ' done' : '') + '" style="--i:' + i + '">'
                + '<span class="pf-a-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC[a.ic] + '</svg></span>'
                + '<span class="pf-a-text"><b>' + esc(T(a.t)) + '</b><small>' + esc(T(a.d)) + '</small>'
                + (a.done ? '' : '<span class="pf-a-prog"><i style="width:' + Math.round(a.pct * 100) + '%"></i></span><em>' + Math.min(a.v, a.n) + ' / ' + a.n + '</em>')
                + '</span>' + (a.done ? '<span class="pf-a-ok" aria-label="' + esc(T('Unlocked')) + '">✓</span>' : '') + '</div>').join('') + '</div>'
            + '<div class="pf-foot"><button type="button" class="btn secondary-btn pf-out">' + esc(T('Sign out on this PC')) + '</button></div>'
            + '</div>';

        function stat(label, val, cls) { return '<div class="pf-stat ' + cls + '"><b>' + esc(String(val)) + '</b><span>' + esc(label) + '</span></div>'; }

        back.appendChild(box);
        document.body.appendChild(back);
        requestAnimationFrame(() => {
            back.classList.add('in');
            box.querySelectorAll('.pf-ring-fg').forEach((c) => { c.style.strokeDashoffset = c.dataset.to; });
            box.querySelectorAll('[data-count]').forEach((el) => { if (window.LedgerUI && LedgerUI.countTo) LedgerUI.countTo(el, Number(el.dataset.count)); else el.textContent = el.dataset.count; });
        });
        const vid = box.querySelector('.pf-banner-fig video');
        if (vid) { vid.addEventListener('canplay', () => vid.parentElement.classList.add('vid-on'), { once: true }); vid.addEventListener('error', () => vid.remove(), { once: true }); }
        const fimg = box.querySelector('.pf-banner-fig img');
        if (fimg) fimg.addEventListener('error', () => { const f = box.querySelector('.pf-banner-fig'); if (f) f.remove(); }, { once: true });

        // the banner drifts with the pointer
        const banner = box.querySelector('.pf-banner');
        box.addEventListener('pointermove', (e) => { if (reduced()) return; const r = box.getBoundingClientRect(); banner.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3)); banner.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3)); });

        box.querySelector('.pf-x').addEventListener('click', close);
        back.addEventListener('mousedown', (e) => { if (e.target === back) close(); });
        document.addEventListener('keydown', onKey, true);
        const sidBtn = box.querySelector('button.pf-sid');
        if (sidBtn) sidBtn.addEventListener('click', () => {
            const ok = () => { if (window.LedgerUI) LedgerUI.toast(T('Steam ID copied'), 'ok'); };
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(mySid).then(ok, () => {});
        });
        box.querySelector('.pf-out').addEventListener('click', async () => {
            const yes = window.LedgerUI ? await LedgerUI.confirm({ title: T('Sign out on this PC?'), text: T('You will need the key to come back in.'), ok: T('Sign out'), danger: false }) : true;
            if (!yes) return;
            fetch('/_ledger/logout', { method: 'POST', credentials: 'same-origin', headers: { 'X-Ledger': '1' } }).finally(() => { location.href = '/login'; });
        });
        box.querySelector('.pf-x').focus({ preventScroll: true });
    }

    window.LedgerProfile = { open, close };
    // the key tile on the home tab opens it too
    document.addEventListener('click', (e) => { const t = e.target.closest && e.target.closest('#key-tile'); if (t && !e.target.closest('a')) open(); });
})();

/* ============================================================
   HB-SCHEME — toggle light/dark de hugobran.co.
   Serve as DUAS superficies: loja (<li> dentro de
   .header__icons > .header__list) e portal /supporters
   (.header__right-nav, com <a class="header__link"> directos).
   Substitui os dois blocos que viviam no header e no footer.

   Par obrigatorio: o anti-FOUC inline do header. E ele que corre
   antes do primeiro paint, escreve data-scheme no <html> e injecta
   #fw-scheme-style com as vars do tema light ancoradas em
   :root[data-scheme="light"]. Por isso aqui NAO ha copia das cores:
   trocar de tema e' so trocar o atributo.
   ============================================================ */
(function () {
  var KEY = 'fw_color_scheme';

  // Cache do CSS do tema, lido do elemento que o anti-FOUC criou.
  // Serve so para o repor se o Turbo o levar numa navegacao; as
  // cores continuam a ter uma unica fonte, no header.
  var css = '';

  function icon(name, size) {
    var s = ' width="' + size + '" height="' + size + '"';
    return name === 'moon'
      ? '<svg' + s + ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="currentColor" opacity="0.8"/></svg>'
      : '<svg' + s + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>';
  }

  function getMode() {
    try {
      return localStorage.getItem(KEY) ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch (e) { return 'light'; }
  }

  function ensureStyle() {
    var el = document.getElementById('fw-scheme-style');
    if (el) { if (!css) css = el.textContent; return; }
    if (!css) return;
    el = document.createElement('style');
    el.id = 'fw-scheme-style';
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  function applyMode(mode) {
    ensureStyle();
    document.documentElement.setAttribute('data-scheme', mode);
  }

  function paint(btn) {
    var mode = getMode();
    // Guarda: sem isto o innerHTML era reescrito a cada evento do Turbo
    // mesmo sem mudanca de tema — 4 eventos por navegacao, 2 toggles na
    // loja. Mesmo erro que estava no redacted do footer.
    if (btn.dataset.hbMode === mode) return;
    btn.dataset.hbMode = mode;
    var label = mode === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro';
    btn.innerHTML = icon(mode === 'light' ? 'moon' : 'sun', btn.dataset.hbSize || 24);
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
  }

  function build(size) {
    var btn = document.createElement('a');
    btn.className = 'hb-scheme-toggle';
    btn.dataset.hbSize = size;
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.style.cssText = 'cursor:pointer;display:inline-flex;align-items:center;';
    paint(btn);
    return btn;
  }

  function mount() {
    // Loja
    document.querySelectorAll('.header__icons > .header__list').forEach(function (list) {
      if (list.querySelector('.hb-scheme-toggle')) return;
      var li = document.createElement('li');
      li.className = 'header__list-item';
      li.style.cssText = 'display:flex;align-items:center;';
      li.appendChild(build(24));
      list.appendChild(li);
    });
    // Portal: antes do turbo-frame das mensagens, p/ ficar junto aos icones.
    document.querySelectorAll('.header__right-nav').forEach(function (nav) {
      if (nav.querySelector('.hb-scheme-toggle')) return;
      var btn = build(18);
      btn.classList.add('header__link');
      var frame = nav.querySelector('turbo-frame');
      if (frame) nav.insertBefore(btn, frame); else nav.appendChild(btn);
    });
  }

  function repaint() {
    document.querySelectorAll('.hb-scheme-toggle').forEach(paint);
  }

  function run() {
    // Re-afirma o atributo: o morph do Turbo pode repor o <html>.
    applyMode(getMode());
    mount();
    repaint();
  }

  function toggle() {
    var next = getMode() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    applyMode(next);
    repaint();
  }

  // Delegacao: sobrevive a botoes recriados pelo morph do Turbo sem
  // ter de re-ligar listeners a cada navegacao.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.hb-scheme-toggle');
    if (!btn) return;
    e.preventDefault();
    toggle();
  });
  // role="button" num <a> sem href nao dispara click pelo teclado.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var btn = e.target.closest && e.target.closest('.hb-scheme-toggle');
    if (!btn) return;
    e.preventDefault();
    toggle();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  ['turbo:load', 'turbo:frame-load', 'turbo:render', 'turbo:morph']
    .forEach(function (ev) { document.addEventListener(ev, run); });
})();

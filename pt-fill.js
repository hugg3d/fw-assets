(function () {
  const TRANSLATIONS = {
    // Barra de promoção — segmentada à volta dos valores dinâmicos (%, €)
    "off for Twitch Subs": "de desconto para subscritores da Twitch",
    "off for Members": "de desconto para membros",
    "Free shipping when you spend": "envio grátis a partir de",
    "for everyone. Promotion auto-applied on checkout": "para todos. Promoção aplicada automaticamente no checkout",
    
    // Reviews (EchoBrain)
    "Be the first one to submit a review about": "Sê o primeiro a deixar uma avaliação sobre",
    "Be the first one to ask a question about": "Sê o primeiro a deixar uma pergunta sobre",
    "How many stars do you give": "Quantas estrelas darias para",
    "What did you like or dislike": "Do que gostou ou não gostou",
    "our products": "os nossos produtos",
    "or services": "ou serviços",
    "this product": "este produto",
    "Write a review": "Escreve uma avaliação",
    "Ask a question": "Faz uma pergunta",
    "Write your question": "Escreve a tua pergunta",
    "Submit review": "Envia avaliação",
    "Send question": "Envia a pergunta",
    "Your email": "O teu e-mail",
    "Reviews": "Avaliações",
    "reviews": "avaliações",
    "out of": "de",
    "Questions": "Perguntas",
    "Close": "Fechar",
    "Cancel": "Anular",

    // Cart / checkout
    "Complete your payment in the open Google Pay window, or close Google Pay to continue paying another way": "Conclui o pagamento na janela aberta do Google Pay, ou fecha o Google Pay para pagares de outra forma",
    "Are you sure you want to remove": "Tens a certeza que queres remover",
    "from your cart": "do teu carrinho",
    "This product is available for members only": "Este produto está disponível apenas para membros",
    "Your Shopping Cart is Empty": "O teu carrinho está vazio",
    "in your cart for": "no teu carrinho por",
    "Cart Subtotal": "Subtotal do carrinho",
    "Added to cart": "Adicionado ao carrinho",
    "Add to Cart": "Adicionar ao carrinho",
    "Back to Shopping": "Voltar às compras",
    "Start Shopping": "Começar a comprar",
    "View Cart": "Ver carrinho",
    "Out of Stock": "Esgotado",
    "Quantity": "Quantidade",
    "Checkout": "Finalizar compra",
    "Delete": "Remover",
    "Item": "Artigo",
    "items": "artigos",
    "item": "artigo",    
    "Price": "Preço (sem IVA)",
    "Cart": "Carrinho",
    "One size": "Tamanho único",
    "Size": "Medidas",
    "or": "ou",

    // UI Fourthwall
    "Search results for": "Resultados de pesquisa para",
    "You may also like": "Também poderás gostar de",
    "All Products": "Todos os Produtos",
    "Start 7-day free trial": "Começa com teste gratuito de 7 dias",
    "Members Only": "Exclusivo Membros",
    "Join now": "Junta-te agora!",
    "per year": "por ano",
    "plus tax": "+IVA", 
    "Sold Out": "Artigo Esgotado",
    "Sign in": "Iniciar sessão",
    "Sign out": "Terminar sessão",
    "Sign up": "Criar conta",
    "Email address": "O teu melhor e-mail",
    "Powered by": "Com tecnologia de",
    "Your name": "O teu nome",
    "Message": "Mensagem",
    "Custom": "Outro",
    "Lock": "Bloqueado",
    "Chevron Bottom": "Seta de Menu",

    // Página de password
    "Enter store using password": "Entra no site com a palavra-passe",
    "Enter using password": "Entrar com palavra-passe",
    "This page is available for members only": "Este espaço é exclusivo para membros - cria a tua conta para obter acesso.",
    "Already a member": "Já és membro",
    "Password": "Palavra-passe",
    "Incorrect password": "Palavra-passe incorreta",
    "Enter": "Entrar",
    "Email": "E-mail",

    // Navegação / conta / 404
    "Page not found": "Página em Branco, literalmente 😀",
    "Join for free to access": "Regista-te grátis para aceder",
    "Join to access": "Subscreve para aceder",
    "Join or purchase": "Subscreve ou compra",
    "Continue reading": "Continua a ler",
    "Go Back Home": "Volta ao início",
    "Account": "Conta",
    "Login": "Inicia sessão",
    "Store": "Loja",
    "Home": "Início",
    "Free": "Grátis",

    // Supporters
    "Unlock for": "Desbloqueia por",
  
    // Validação de e-mail
    "Please enter a valid email": "Insere um e-mail válido",
    "Please enter your email": "Insere o teu e-mail",

    // Social / vídeo
    "SENT YOU A MESSAGE": "ENVIOU-TE UMA MENSAGEM",
    "Share on Facebook": "Partilhar no Facebook",
    "Share on X": "Partilhar no X",
    "Download video": "Transferir vídeo",

    // GPSR — labels da plataforma (os VALORES mudas na dashboard, ver nota)
    "EU GPSR Product Information": "Informação de produto GPSR (UE)",
    "Manufacturer contact information": "Contactos do fabricante",
    "Postal address": "Morada postal",
    "Additional information": "Informação adicional (EN)",

    // Cookie banner (camada 1)
    "Cookie Policy Notice": "Aviso de Cookies",
    "We use cookies to enhance your site experience. You are in control - customize your settings in our Privacy Policy. Feel free to explore before making a choice": "Usamos cookies para melhorar a tua experiência no site. Tu controlas - personaliza as definições na nossa Política de Privacidade. Explora à vontade antes de decidires",
    "Manage preferences": "Gerir preferências",
    "Accept all": "Aceitar tudo",
    "Reject all": "Rejeitar tudo",
    "Save settings": "Guardar preferências",
    "Name": "Nome",
    "Domain": "Domínio",
    "Expiration": "Validade",
    "Description": "Descrição",

    // Cookie modal (camada 2)
    "Cookie usage": "Utilização de cookies",
    "We use cookies to enhance your browsing experience on our website. These cookies help us analyze site traffic, personalize content, and provide you with a better user experience. By continuing to use our site, you consent to the use of cookies in accordance with our Cookie Policy. For more information, please review our privacy policy": "Usamos cookies para melhorar a tua experiência de navegação no nosso site. Estes cookies ajudam-nos a analisar o tráfego, personalizar conteúdo e proporcionar-te uma melhor experiência. Ao continuares a usar o site, consentes a utilização de cookies de acordo com a nossa Política de Cookies. Para mais informação, consulta a nossa política de privacidade",
    "Strictly necessary cookies": "Cookies estritamente necessários",
    "These cookies are essential for the proper functioning of this website. Without these cookies, the website would not work properly": "Estes cookies são essenciais para o funcionamento do site. Sem eles, o site não funciona corretamente",
    "Performance and Analytics cookies": "Cookies de desempenho e análise",
    "These cookies allow the website to remember the choices you have made in the past": "Estes cookies permitem ao site lembrar as escolhas que fizeste no passado",
    "Marketing and Targeting cookies": "Cookies de marketing e segmentação",
    "These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you": "Estes cookies recolhem informação sobre como usas o site, que páginas visitaste e em que links clicaste. Todos os dados são anonimizados e não permitem identificar-te",
  };

  // Zonas de alta-rotacao a ignorar (mutam frequentemente sem texto traduzivel)
  const SKIP_ZONES = '[class*="countdown"]';

  function isPTActive() {
    const c = document.cookie.match(/googtrans=\/[^\/]+\/(\w+)/);
    if (!c) return true;
    return c[1] === 'pt';
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Regexes compilados UMA vez (evita new RegExp por nodo em cada mutacao)
  const COMPILED = Object.keys(TRANSLATIONS).map(function (en) {
    return { re: new RegExp('\\b' + escapeRegex(en) + '\\b', 'g'), pt: TRANSLATIONS[en] };
  });
  
  const PRICE_SELECTORS =
    '.tile__price--original,.product-info__price--original,.featured-product-info__price--original,.cart-totals__amount--subtotal,.cart-item__price-value,.inline-image__price,.product-drawer__subtotal-value';

  function injectTax(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) root = root.parentElement;
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const els = new Set();
    const hit = root.closest && root.closest(PRICE_SELECTORS);
    if (hit) els.add(hit);
    if (root.querySelectorAll) root.querySelectorAll(PRICE_SELECTORS).forEach(el => els.add(el));
    els.forEach(el => {
      if (el.querySelector('.plus-tax-label')) return;
      const span = document.createElement('span');
      span.className = 'plus-tax-label';
      span.textContent = ' (plus tax)';
      el.appendChild(span);
    });
  }

  function localizeDates(root){
    if(!isPTActive()||!root) return;
    if(root.nodeType===Node.TEXT_NODE) root=root.parentElement;
    if(!root||root.nodeType!==Node.ELEMENT_NODE) return;
    const els=new Set();
    const hit=root.closest&&root.closest('.post-tile__date');
    if(hit) els.add(hit);
    if(root.querySelectorAll) root.querySelectorAll('.post-tile__date').forEach(el=>els.add(el));
    els.forEach(el=>{
      if(el.dataset.ptDate) return;
      const d=new Date(el.textContent.trim());
      if(isNaN(d)) return;
      el.textContent=d.toLocaleDateString('pt-PT',{day:'numeric',month:'long',year:'numeric'});
      el.dataset.ptDate='1';
    });
  }
  
  function collectTextNodes(root, out) {
    if (root.nodeType === Node.TEXT_NODE) {
      out.push(root);
      return;
    }
    const tag = root.tagName;
    if (tag && ['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(tag)) return;
    for (let i = 0; i < root.childNodes.length; i++) {
      collectTextNodes(root.childNodes[i], out);
    }
    if (root.shadowRoot) {
      for (let i = 0; i < root.shadowRoot.childNodes.length; i++) {
        collectTextNodes(root.shadowRoot.childNodes[i], out);
      }
    }
  }

  function translateNode(node) {
    let text = node.nodeValue;
    let changed = false;
    for (let i = 0; i < COMPILED.length; i++) {
      const newText = text.replace(COMPILED[i].re, COMPILED[i].pt);
      if (newText !== text) {
        text = newText;
        changed = true;
      }
    }
    if (changed) node.nodeValue = text;
  }

  function fillNode(root) {
    if (!isPTActive()) return;
    const nodes = [];
    collectTextNodes(root, nodes);
    nodes.forEach(node => {
      const parent = node.parentNode;
      if (!parent) return;
      if (parent.closest) {
      const ex = parent.closest('[translate="no"], .notranslate');
      if (ex && !(ex === document.body && document.body.dataset.noTranslatePage)) return;}
      translateNode(node);
    });
  }

  // Scheduler: idle callback se disponivel, senao setTimeout
  const schedule = window.requestIdleCallback
    ? (fn) => requestIdleCallback(fn, { timeout: 500 })
    : (fn) => setTimeout(fn, 200);
  const cancel = window.cancelIdleCallback
    ? (h) => { try { cancelIdleCallback(h); } catch(e) { clearTimeout(h); } }
    : (h) => clearTimeout(h);

  // FULL PASS: initial load + turbo navigation
  let fullScheduled = null;
  function runFull() {
    if (fullScheduled) cancel(fullScheduled);
    fullScheduled = schedule(() => {
      injectTax(document.body);
      localizeDates(document.body);
      fillNode(document.body);
      fullScheduled = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFull);
  } else {
    runFull();
  }
  document.addEventListener('turbo:load', runFull);
  document.addEventListener('turbo:frame-load', runFull);

  // OBSERVER: processa nodos novos E texto alterado in-place; ignora zonas churn
let pending = [];
let mutScheduled = null;
const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    const zoneEl = m.target.nodeType === Node.TEXT_NODE ? m.target.parentNode : m.target;
    if (zoneEl && zoneEl.closest && zoneEl.closest(SKIP_ZONES)) continue;
    if (m.type === 'characterData') {
      pending.push(m.target);
    } else {
      for (const node of m.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          pending.push(node);
        }
      }
    }
  }
  if (!pending.length) return;
  if (mutScheduled) cancel(mutScheduled);
  mutScheduled = schedule(() => {
    const batch = pending;
    pending = [];
    mutScheduled = null;
    batch.forEach(node => {
       if (node.isConnected) { injectTax(node); localizeDates(node); fillNode(node); }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  // Detectar quando o gtranslate muda de lingua e re-aplicar PT-FILL.
  // O gtranslate alterna translated-ltr no html ao mudar de estado;
  // observar essa mudanca cobre o caso "EN -> PT volta a mostrar original".
  const stateObserver = new MutationObserver(() => {
    runFull();
  });
  stateObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'lang']
  });
})();

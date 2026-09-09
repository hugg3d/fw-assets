(function () {
  const TRANSLATIONS = {
    // Barra de promoção — segmentada à volta dos valores dinâmicos (%, €)
    "off for Twitch Subs": "de desconto para subscritores da Twitch",
    "off for Members": "de desconto para membros",
    "Free shipping when you spend": "envio grátis a partir de",
    "for everyone. Promotion auto-applied on checkout": "para todos. Promoção aplicada automaticamente no checkout",

    // ============================================================
    // SUPPORTERS — FRASES
    // TEM de ficar aqui em cima: estas frases contêm palavras que
    // são chaves curtas mais abaixo (Free, Email, Enter, Login,
    // Name, Message, Share, Join now). Se descessem, seriam
    // partidas a meio antes de terem hipótese de dar match.
    // ============================================================

    // Autenticação
    "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply": "Este site é protegido por reCAPTCHA, aplicando-se a Política de Privacidade e os Termos de Serviço da Google",
    // A frase acima fica partida por dois links, por isso raramente
    // casa. Este prefixo apanha o 1o no; o "and" e o "apply." sao
    // tratados pelas regras ancoradas em REGEX_RULES.
    "This site is protected by reCAPTCHA and the Google": "Este site é protegido por reCAPTCHA. Aplicam-se a",
    "Enter your email address to reset your password": "Introduz o teu e-mail para repores a palavra-passe",
    "An email with instructions on how to reset your password has been sent to": "Foi enviado um e-mail com instruções para repores a palavra-passe para",
    "Email or password not recognized. Please try again": "E-mail ou palavra-passe não reconhecidos. Tenta novamente",
    "By signing up you agree to Terms of Service": "Ao criares conta, aceitas os Termos de Serviço",
    // O link "Terms of Service" e um no separado — fragmento para esse caso
    "By signing up you agree to": "Ao criares conta, aceitas os",
    "Don’t have an account yet? Join now": "Ainda não tens conta? Junta-te agora",
    "Have an account already? Login": "Já tens conta? Inicia sessão",
    // Idem para o link "Login": sem isto sobrava "Já tens conta already?"
    "Have an account already": "Já tens conta",
    "Already a member? Login": "Já és membro? Inicia sessão",
    "Have an account? Login": "Já tens conta? Inicia sessão",
    "Have an account": "Já tens conta",
    "An email has invalid format": "O formato do e-mail é inválido",
    "This field is required": "Este campo é obrigatório",
    "Name or username": "Nome ou nome de utilizador",
    "Name or nickname": "Nome ou alcunha",
    "Create your account": "Cria a tua conta",
    "Create account": "Criar conta",
    "Back to login": "Voltar ao início de sessão",
    "Forgot password": "Esqueci-me da palavra-passe",
    "Reset password": "Repor palavra-passe",
    "Resend": "Reenviar",

    // Palavra-passe
    // "Enter password" TEM de vir antes de "Enter" (bloco da pagina de
    // password), senao dava "Entrar password".
    "To save your changes, please enter your password": "Para guardares as alterações, introduz a tua palavra-passe",
    "Enter password": "Introduz a palavra-passe",
    "Did you mean": "Será que quiseste dizer",
    "Update email": "Atualizar e-mail",
    "You have never changed your password": "Nunca alteraste a tua palavra-passe",
    "You have changed your password on": "Alteraste a tua palavra-passe a",
    "Confirm new password": "Confirma a nova palavra-passe",
    "Current password": "Palavra-passe atual",
    "Update password": "Atualizar palavra-passe",
    "Change password": "Alterar palavra-passe",
    "New password": "Nova palavra-passe",

    // Perfil e emblemas
    "Your profile has been sucessfuly updated": "O teu perfil foi atualizado com sucesso",
    "Visible to the creator and community": "Visível para o criador e para a comunidade",
    "Hidden from your profile": "Oculto no teu perfil",
    "Shows in your profile": "Aparece no teu perfil",
    "Show member profile": "Ver perfil do membro",
    "Upload new image": "Carregar nova imagem",
    "Save changes": "Guardar alterações",
    "Save Changes": "Guardar alterações",
    "Your badges": "Os teus emblemas",
    "No badges": "Sem emblemas",

    // Notificações
    "When someone replies to my comments": "Quando alguém responde aos meus comentários",
    "When my comments get pinned": "Quando os meus comentários são fixados",
    "Email notifications": "Notificações por e-mail",
    "posts new content": "publica novo conteúdo",
    "sends me a message": "me envia uma mensagem",

    // Subscrição / faturação
    "In order to remove payment method you have to cancel your subscription first, then wait for the membership period to fully expire": "Para removeres o método de pagamento tens de cancelar primeiro a subscrição e esperar que o período de subscrição termine",
    "By subscribing, you authorize Subscription to charge you according to the terms until you cancel": "Ao subscreveres, autorizas a cobrança de acordo com os termos até cancelares",
    "After submission, you’ll be guided through completing next steps with PayPal": "Depois de submeteres, vais ser encaminhado para concluir os passos seguintes com o PayPal",
    "You’re currently signed up as a free account": "Neste momento tens uma conta gratuita",
    "You don't have any payment method added": "Não tens nenhum método de pagamento adicionado",
    "You haven't made any payments yet": "Ainda não fizeste nenhum pagamento",
    // "Remove payment method" TEM de vir antes de "Remove" (bloco das
    // palavras soltas), senao dava "Remover payment method".
    "Remove payment method": "Remover método de pagamento",
    "Removing payment method": "Remover método de pagamento",
    "Change payment method": "Alterar método de pagamento",
    "Next payment of": "Próximo pagamento de",
    "scheduled on": "agendado para",
    "Set up payment method": "Configurar método de pagamento",
    "Payment method": "Método de pagamento",
    "Payment history": "Histórico de pagamentos",
    "Upgrade or purchase": "Faz upgrade ou compra",
    "Upgrade account": "Fazer upgrade da conta",
    "Billing address": "Morada de faturação",
    "Postal code": "Código postal",
    "Charged for": "Cobrado por",
    "Current tier": "Nível atual",

    // Cancelamento
    "Even if you cancel, you'll keep access until": "Mesmo que canceles, manténs o acesso até",
    "If you cancel, you’ll miss posts like this": "Se cancelares, vais perder publicações como esta",
    "Are you sure you want to cancel": "Tens a certeza que queres cancelar",
    "Membership streak badge": "Emblema de subscrição contínua",
    "Members-only perks": "Vantagens exclusivas para membros",
    "Confirm cancellation": "Confirmar cancelamento",
    "Confirm change": "Confirmar alteração",
    "Keep my membership": "Manter a minha subscrição",
    "You'll lose access to": "Vais perder o acesso a",
    "Exclusive content": "Conteúdo exclusivo",

    // Checkout
    "Prices do not include tax. It's calculated at the payment step": "Os preços não incluem IVA. É calculado no passo do pagamento",
    "The minimum price for this tier is": "O preço mínimo deste nível é",
    "Leave a message or ask a question": "Deixa uma mensagem ou faz uma pergunta",
    "Your payment is being processed": "O teu pagamento está a ser processado",
    "off as long as subscription is active": "de desconto enquanto a subscrição estiver ativa",
    // Badge "25% off" do checkout. TEM de vir depois da frase acima,
    // que tambem contem "off" e seria partida por este fragmento.
    "% off": "% de desconto",
    "annually starting": "anualmente a partir de",
    "Select subscription": "Escolhe a subscrição",
    "Choose what you pay": "Escolhe quanto pagas",
    "Leave a message": "Deixa uma mensagem",
    "Return to": "Voltar para",
    "Enter promo code": "Introduzir código promocional",
    "Start free Trial": "Começar teste gratuito",
    "Start free trial": "Começar teste gratuito",
    "Coupon code": "Código promocional",
    "Free for 7 days": "Grátis durante 7 dias",
    // Modal de mudanca de plano. O 1o no acaba aqui; o resto da frase
    // esta num unico no, tratado por regex ancorada em REGEX_RULES
    // (fragmentos como "for your" ou "expires on" soltos no mapa
    // partiam frases como "Thank you for your order").
    "You won't be charged until your": "Não haverá cobrança até o teu",
    "You will be charged": "Vai ser-te cobrado",
    "It may take a while": "Pode demorar um pouco",
    // Descontos de primeiro periodo. "For first year" e "First year
    // discount" TEM de vir antes da chave "year" (bloco das palavras
    // soltas), senao dava "For first por ano".
    "For first month": "No primeiro mês",
    "For first year": "No primeiro ano",
    "First month discount": "Desconto do primeiro mês",
    "First year discount": "Desconto do primeiro ano",
    "Billed monthly": "Cobrado mensalmente",
    "billed monthly": "cobrado mensalmente",
    "billed annually": "cobrado anualmente",
    "Total to pay": "Total a pagar",
    "Promo code": "Código promocional",
    "Taxes/VAT": "Impostos/IVA",
    "inc. tax/vat": "inc. impostos/IVA",
    "Billed": "Cobrado",

    // Gorjetas
    "By making this purchase you agree to Refund Policy": "Ao fazeres esta compra, aceitas a Política de Reembolso",
    // O link "Refund Policy" e um no de texto separado, por isso a frase
    // inteira acima nunca casa no modal. Este fragmento cobre esse caso.
    "By making this purchase you agree to": "Ao fazeres esta compra, aceitas a",
    "Tips are supported in USD only": "As gorjetas só são suportadas em USD",
    "Tips are non-refundable": "As gorjetas não são reembolsáveis",
    "By sending this tip you agree to our": "Ao enviares esta gorjeta, aceitas a nossa",
    "Send a message with tip": "Enviar mensagem com gorjeta",
    "Send message": "Enviar mensagem",
    "Add a tip to message": "Adicionar gorjeta à mensagem",
    "Unlock message for": "Desbloquear mensagem de",
    "Refund Policy": "Política de Reembolso",
    "Terms of Service": "Termos de Serviço",
    "Tip amount": "Valor da gorjeta",
    "Pay & Unlock": "Pagar e Desbloquear",
    "Pay & Subscribe": "Pagar e Subscrever",
    "Unlock now": "Desbloquear agora",
    "Add tip": "Adicionar gorjeta",

    // Feed / publicações
    "Share a preview of a locked post": "Partilha uma pré-visualização de uma publicação bloqueada",
    "Start a conversation by sending a message below": "Começa uma conversa enviando uma mensagem abaixo",
    "Join now to unlock exclusive": "Junta-te agora para desbloquear conteúdo exclusivo de",
    "You haven't sent": "Ainda não enviaste nenhuma mensagem a",
    "This post is available in the following plans": "Esta publicação está disponível nos seguintes planos",
    "Unlock exclusive content": "Desbloqueia conteúdo exclusivo",
    "Please enter a valid donation amount": "Introduz um valor de doação válido",
    "Start with a membership tier": "Começa por escolher um nível",
    "Hide recommendation": "Ocultar recomendação",
    "Highlighted reply": "Resposta destacada",
    "Share this post": "Partilha esta publicação",
    "Hide this post": "Ocultar esta publicação",
    "Become a member": "Torna-te membro",
    "Write a comment": "Escreve um comentário",
    "Write a message": "Escreve uma mensagem",
    "Top comments": "Comentários principais",
    // Ordenacao dos comentarios. "Newest comments" TEM de vir antes de
    // "Newest" (bloco das palavras soltas).
    "Newest comments": "Comentários mais recentes",
    "Most relevant": "Mais relevantes",
    "Load replies": "Carregar respostas",
    "Load Replies": "Carregar respostas",
    "Read more": "Ler mais",
    "Add spoiler": "Adicionar spoiler",
    "Remove spoiler": "Remover spoiler",
    // Modal de denuncia / bloqueio de comentarios
    "You will not see any comments from": "Não vais ver mais comentários de",
    "Expressess intentions of self-harm or suicide": "Expressa intenções de automutilação ou suicídio",
    "Suspicious or spam": "Suspeito ou spam",
    "Abusive or harmful": "Abusivo ou prejudicial",
    "Something else": "Outro motivo",
    "Report comment": "Denunciar comentário",
    "Submit report": "Enviar denúncia",
    "Copy RSS link": "Copiar link RSS",
    "Copy link": "Copiar link",
    "Add emoji": "Adicionar emoji",
    "Add image": "Adicionar imagem",
    "New member": "Novo membro",
    "Show more": "Ver mais",
    "Copied": "Copiado",

    // Filtros
    "Published date": "Data de publicação",
    // O BOTAO do sorter parte isto em 2 nos de texto com &nbsp; no meio
    // ("Newest&nbsp;<span>to oldest</span>"), por isso a frase inteira so
    // casa no dropdown. Os fragmentos "Newest"/"to oldest" estao no bloco
    // das palavras soltas e cobrem o botao, incluindo mobile (onde o span
    // esta escondido e so sobra "Newest").
    "Newest to oldest": "Mais recentes primeiro",
    "Oldest to newest": "Mais antigas primeiro",
    "Continue playing": "Continuar a reproduzir",
    "See history": "Ver histórico",
    "Showing posts with": "A mostrar publicações com",
    "Showing videos with": "A mostrar vídeos com",
    // Pop-up das notificacoes push (PWA / browser)
    "Get notified about new posts and comment replies": "Recebe avisos de novas publicações e de respostas aos teus comentários",
    "Please turn on notifications": "Ativa as notificações",
    "Turn on notifications": "Ativar notificações",
    "Enable notifications": "Ativar notificações",
    "Final results": "Resultado final",
    "Not now": "Agora não",
    "Maybe later": "Talvez mais tarde",
    "Content missing": "Conteúdo em falta",
    // Estados vazios do feed. O termo pesquisado vem a seguir, entre
    // plicas, por isso a chave para antes dele.
    "There are no posts matching term": "Não há publicações que correspondam a",
    "There are no videos matching term": "Não há vídeos que correspondam a",
    "These filters have no posts": "Estes filtros não têm publicações",
    "These filters have no videos": "Estes filtros não têm vídeos",
    "Reset filters": "Repor filtros",
    "Content type": "Tipo de conteúdo",
    "Apply filters": "Aplicar filtros",
    "Last 24 hours": "Últimas 24 horas",
    "Last 30 days": "Últimos 30 dias",
    "Last 7 days": "Últimos 7 dias",
    "Last year": "Último ano",
    "Clear all": "Limpar tudo",
    "All time": "Sempre",

    // Vídeos
    "Recently uploaded": "Carregados recentemente",
    "Recent videos": "Vídeos recentes",
    "Video series": "Séries de vídeos",
    "All videos": "Todos os vídeos",
    "New video": "Novo vídeo",
    "Watch now": "Ver agora",
    "See all": "Ver todos",

    // Vantagens (perks)
    "Paste this link into your favorite podcast player to listen to the members only audio feed": "Cola este link no teu leitor de podcasts para ouvires o feed de áudio exclusivo para membros",
    "You unlocked access to members-only posts for the": "Desbloqueaste o acesso às publicações exclusivas do nível",
    "You’ll receive email updates when new posts are added": "Vais receber e-mails quando forem publicados novos conteúdos",
    "Your members will see their private RSS link here": "Os teus membros vão ver aqui o link RSS privado",
    "Chat on members-only Discord with other members": "Conversa com outros membros no Discord exclusivo",
    "Access to members-only posts": "Acesso a publicações exclusivas para membros",
    "Acess to exclusive RSS Feed": "Acesso a Feed RSS Exclusivo",
    "Exclusive products for members": "Produtos exclusivos para membros",
    "Discount exclusive for members": "Desconto exclusivo para membros",
    "See the message left to you by": "Vê a mensagem que te foi deixada por",
    "View welcome post": "Ver publicação de boas-vindas",
    "Your welcome post": "A tua publicação de boas-vindas",
    "Connect to Discord": "Liga ao Discord",
    "Support & more": "Suporte e mais",
    "View posts": "Ver publicações",
    "Preview as": "Pré-visualizar como",
    "Your perks": "As tuas vantagens",
    "Shop now": "Comprar agora",

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
    // Texto adaptado, nao traduzido a letra: o original diz so
    // "members", mas contas gratuitas nao tem acesso a estes
    // produtos — convem ser explicito antes do clique.
    "This product is available for members only": "Este produto está disponível apenas para membros com subscrição ativa",
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

    // UI Fourthwall
    "Search results for": "Resultados de pesquisa para",
    "You may also like": "Também poderás gostar de",
    "All Products": "Todos os Produtos",
    // "Featured Products" TEM de vir antes de "Featured" (bloco das
    // palavras soltas), senao dava "Em destaque Products".
    "Featured Products": "Produtos em Destaque",
    // Bundles. "conjunto" em vez de "pack" (anglicismo) ou "leva no
    // pacote" (coloquial). "Bundle includes" antes de "Bundle".
    "Get in the bundle": "Disponível em conjunto",
    "Bundle includes": "O conjunto inclui",

    // Cartao-presente — pagina de consulta de saldo
    "Redeem your gift": "Resgata o teu presente",
    "Redeem gift card": "Resgatar cartão-presente",
    "You can apply your gift card in checkout using the code below": "Podes usar o teu cartão-presente no checkout com o código abaixo",
    "Gift card balance check": "Consulta de saldo do cartão-presente",
    "Original gift card value": "Valor original do cartão-presente",
    "Copy gift card code": "Copiar código do cartão-presente",
    "Current balance": "Saldo atual",
    "Gift card code": "Código do cartão-presente",
    "Click to reveal": "Clica para revelar",

    // Cartao-presente — descricao (acordeao "More Details").
    // NOTA: isto pode ser conteudo editavel na dashboard da FW; se
    // for, e' mais robusto traduzir la do que aqui.
    "The card balance is stored and redeemed in US dollars (USD). Purchases made in other currencies are converted to US dollars and deducted from your gift card balance in USD": "O saldo do cartão é guardado e usado em dólares americanos (USD). As compras noutras moedas são convertidas para dólares e deduzidas do saldo do cartão em USD",
    "Use this gift card on multiple orders until the balance is fully spent": "Usa este cartão-presente em várias encomendas até esgotares o saldo",
    "Your gift card balance does not expire. Use it anytime": "O saldo do teu cartão-presente não expira. Usa-o quando quiseres",
    "Balance stored and redeemed in USD": "Saldo guardado e usado em USD",
    "Gift card never expires": "O cartão-presente nunca expira",
    "Reusable across orders": "Reutilizável em várias encomendas",
    "More Details": "Mais detalhes",
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
    "Upgrade to access": "Faz upgrade para aceder",
    "Join or purchase": "Subscreve ou compra",
    "Continue reading": "Continua a ler",
    "Go Back Home": "Volta ao início",
    "Account": "Conta",
    // Alimenta o titulo da pagina E o botao. Infinitivo (nao "Inicia
    // sessao") porque o imperativo fica estranho como titulo.
    "Login": "Iniciar sessão",
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
    "Download audio": "Transferir áudio",
    "Download image": "Transferir imagem",
    "Download file": "Transferir ficheiro",

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
    // Cabeçalhos <th> da tabela de cookies. As mesmas 4 palavras existem
    // como data-column nas <td> (rótulos mobile) — essas são tratadas em
    // ATTR_MAP, não aqui. "Name" fica DEPOIS de "Name or nickname"/"Name or
    // username" (topo do ficheiro), senão partia esses campos do perfil.
    "Name": "Nome",
    "Domain": "Domínio",
    "Expiration": "Validade",
    "Description": "Descrição",

    // Cookie modal (camada 2)
    "Cookie preferences": "Preferências de cookies",
    "Cookie usage": "Utilização de cookies",
    "We use cookies to enhance your browsing experience on our website. These cookies help us analyze site traffic, personalize content, and provide you with a better user experience. By continuing to use our site, you consent to the use of cookies in accordance with our Cookie Policy. For more information, please review our privacy policy": "Usamos cookies para melhorar a tua experiência de navegação no nosso site. Estes cookies ajudam-nos a analisar o tráfego, personalizar conteúdo e proporcionar-te uma melhor experiência. Ao continuares a usar o site, consentes a utilização de cookies de acordo com a nossa Política de Cookies. Para mais informação, consulta a nossa política de privacidade",
    "Strictly necessary cookies": "Cookies estritamente necessários",
    "These cookies are essential for the proper functioning of this website. Without these cookies, the website would not work properly": "Estes cookies são essenciais para o funcionamento do site. Sem eles, o site não funciona corretamente",
    "Performance and Analytics cookies": "Cookies de desempenho e análise",
    "These cookies allow the website to remember the choices you have made in the past": "Estes cookies permitem ao site lembrar as escolhas que fizeste no passado",
    "Marketing and Targeting cookies": "Cookies de marketing e segmentação",
    "These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you": "Estes cookies recolhem informação sobre como usas o site, que páginas visitaste e em que links clicaste. Todos os dados são anonimizados e não permitem identificar-te",

    // Cookie modal — coluna Descrição das tabelas.
    // NENHUMA chave acaba em ponto final: o \b final do regex não casa
    // depois de "." e o match falharia. O ponto fica no ecrã na mesma.
    "Registers a unique ID for a website visitor it tracks how the visitor uses the website. The data is used for statistics": "Regista um ID único do visitante e acompanha a forma como usa o site. Os dados são usados para estatísticas",
    "This is a cookie that is set by twitter.com. It is used for optimizing ad relevance by collecting visitor navigation data": "Cookie definido pelo twitter.com. Serve para otimizar a relevância dos anúncios, recolhendo dados de navegação do visitante",
    "To measure and improve the performance of your advertising campaigns and to personalize the user's experience (including ads) on TikTok": "Medir e melhorar o desempenho das campanhas publicitárias e personalizar a experiência do utilizador (incluindo anúncios) no TikTok",
    "To measure and improve the performance of your advertising campaigns and to personalize the user's experience (including ads) on Klaviyo": "Medir e melhorar o desempenho das campanhas publicitárias e personalizar a experiência do utilizador (incluindo anúncios) no Klaviyo",
    "Identifies unique web browsers visiting Microsoft sites. These cookies are used for advertising, site analytics, and other operational purposes": "Identifica browsers únicos que visitam sites da Microsoft. Estes cookies são usados para publicidade, análise de sites e outros fins operacionais",
    "Indicates whether MUID is transferred to ANID, a cookie used for advertising. Clarity doesn't use ANID and so this is always set to 0": "Indica se o MUID é transferido para o ANID, um cookie usado para publicidade. A Clarity não usa o ANID, por isso está sempre definido como 0",
    "Connects multiple page views by a user into a single Clarity session recording": "Liga várias visualizações de páginas de um utilizador numa única gravação de sessão da Clarity",
    "Identifies the first-time Clarity saw this user on any site using Clarity": "Identifica a primeira vez que a Clarity viu este utilizador num site que use Clarity",
    "Used in synchronizing the MUID across Microsoft domains": "Sincroniza o MUID entre domínios da Microsoft",
    "To store and track visits across websites": "Armazenar e registar visitas em vários sites",
    "To store and track conversions": "Armazenar e registar conversões",

    // Cookie modal — coluna Validade.
    // DEPOIS das descrições: "session" partiria "session recording" do _clsk.
    "13 months": "13 meses",
    "12 months": "12 meses",
    "3 months": "3 meses",
    "2 years": "2 anos",
    "1 day": "1 dia",
    "persistent": "persistente",
    "session": "sessão",

    // ============================================================
    // SUPPORTERS — PALAVRAS SOLTAS
    // TEM de ficar no fim: são chaves de 1 palavra que apareceriam
    // dentro de frases mais longas (Date/Search/Payment/Post...).
    // Aqui em baixo, essas frases já foram substituídas.
    // ============================================================
    "Livestream": "Transmissão em direto",
    "Membership": "Subscrição",
    // "Then €8.50 billed monthly" -> "Depois, €8.50 cobrado mensalmente"
    "Then": "Depois,",
    // TEM de estar aqui em baixo: o texto longo do modal de cookies
    // contem "Privacy Policy" e era partido por esta chave, deixando
    // o paragrafo inteiro por traduzir.
    "Privacy Policy": "Política de Privacidade",
    // Depois de "Unlock for", "Unlock now", "Unlock message for" e
    // "Unlock exclusive content"
    "Unlock": "Desbloqueia",
    // Depois de "Pay & Subscribe"
    "Subscribe": "Subscrever",
    // Depois de "Upgrade account" e "Upgrade or purchase"
    "Upgrade": "Fazer upgrade",
    // Depois de "Join for free to access" (bloco de navegacao), senao
    // dava "Junta-te grátis to access".
    "Join for free": "Junta-te grátis",
    // Depois de "Payment history" e "See history", que sao chaves
    // completas la em cima.
    "History": "Histórico",
    "Highlighted": "Destacado",
    "Relevance": "Relevância",
    "Verified": "Verificado",
    "Featured": "Em destaque",
    "Messages": "Mensagens",
    "Discount": "Desconto",
    "Continue": "Continuar",
    "Optional": "Opcional",
    "Earned": "Conquistado",
    "Payment": "Pagamento",
    "Pinned": "Fixado",
    "Profile": "Perfil",
    "Billing": "Faturação",
    "Filters": "Filtros",
    "Country": "País",
    "Logout": "Terminar sessão",
    "Search": "Pesquisar",
    "Monthly": "Mensal",
    "Annual": "Anual",
    "yearly": "anual",
    "year": "por ano",
    "When": "Quando",
    // Fragmentos do BOTAO do sorter (ver nota no bloco dos filtros).
    // "to oldest"/"to newest" sao minusculas e nao colidem com
    // "Oldest"/"Newest", que sao maiusculas (o regex e case-sensitive).
    "to oldest": "primeiro",
    "to newest": "primeiro",
    "Newest": "Mais recentes",
    "Oldest": "Mais antigas",
    "Amount": "Valor",
    "Remove": "Remover",
    "Report": "Denunciar",
    "Return": "Voltar",
    "Badges": "Emblemas",
    "Change": "Alterar",
    "Reply": "Responder",
    "Block": "Bloquear",
    "Perks": "Vantagens",
    "Apply": "Aplicar",
    "Today": "Hoje",
    "Image": "Imagem",
    "Video": "Vídeo",
    "Audio": "Áudio",
    "Share": "Partilhar",
    "Okay": "Ok",
    "Poll": "Sondagem",
    "Text": "Texto",
    "Date": "Data",
    "Send": "Enviar",
    "Save": "Guardar",
    "Post": "Publicar",
    "Back": "Voltar",
    "Pin": "Fixar",
    // Chip da gorjeta: "Added&nbsp;<span>$1.23</span>&nbsp;tip" — 2 nos de
    // texto. "Added" TEM de estar aqui em baixo, senao partia
    // "Added to cart" (bloco do carrinho).
    "Added": "Adicionada gorjeta de",
    "tip": "",
    // "$10.00 + $2.30 tax". As variantes compostas ("plus tax",
    // "inc. tax/vat", "Taxes/VAT") ja correram bem antes desta.
    "tax": "de imposto",

    // Removidas para PT ficar com a ordem correta. Ex.:
    // "Join now to unlock exclusive <LOJA> content"
    //   -> "Junta-te agora para desbloquear conteúdo exclusivo de <LOJA>"
    // "You haven't sent <LOJA> any messages yet"
    //   -> "Ainda não enviaste nenhuma mensagem a <LOJA>"
    // NOTA: "tier" JA NAO esta aqui. Como chave cega apagava a palavra
    // em todo o lado — inclusive no modal de mudanca de plano, onde
    // "change your tier from X" ficava "change your from X" e parecia
    // um bug da Fourthwall. O "tier" a mais e' agora consumido pelas
    // regras de regex, que so o tiram no contexto certo.
    "any messages yet": "",
    "content": "",
  };

  // Atributos (não são nós de texto, logo o fillNode não lhes toca).
  // Cobre: rótulos mobile da tabela de cookies (data-column, injetados
  // por CSS via attr()), placeholders e labels de acessibilidade.
  const ATTR_MAP = [
    { sel: '[data-column]', attr: 'data-column', map: {
      "Name": "Nome",
      "Domain": "Domínio",
      "Expiration": "Validade",
      "Description": "Descrição"
    }},
    { sel: '[placeholder]', attr: 'placeholder', map: {
      "Search": "Pesquisar",
      "From": "De",
      "To": "Até",
      "Qty": "Qtd",
      "Write a message...": "Escreve uma mensagem...",
      "Write a comment...": "Escreve um comentário...",
      "Name or nickname": "Nome ou alcunha",
      "Name or username": "Nome ou nome de utilizador",
      "Email": "E-mail",
      "Password": "Palavra-passe",
      "Current password": "Palavra-passe atual",
      "New password": "Nova palavra-passe",
      "Confirm new password": "Confirma a nova palavra-passe",
      "Leave a message or ask a question": "Deixa uma mensagem ou faz uma pergunta",
      "Promo code": "Código promocional"
    }},
    { sel: '[aria-label]', attr: 'aria-label', map: {
      "Close": "Fechar",
      "Open": "Abrir",
      "Search": "Pesquisar",
      "Like": "Gosto",
      "Comment": "Comentar",
      "Open menu": "Abrir menu",
      "Close menu": "Fechar menu",
      "Close search": "Fechar pesquisa",
      "Become a member": "Torna-te membro",
      "Account": "Conta",
      "Cart": "Carrinho",
      "Previous image": "Imagem anterior",
      "Next image": "Imagem seguinte",
      "Number of gifts": "Número de ofertas"
    }},
    { sel: '[title]', attr: 'title', map: {
      "Your account": "A tua conta",
      "Go to cart": "Ir para o carrinho",
      "Messages": "Mensagens",
      "Back": "Voltar",
      "minumim 4 characters, only alphanumeric characters, space, hyphen, dot, apostrophe and/or underscore, with no whitespace around": "mínimo 4 caracteres; só letras, números, espaço, hífen, ponto, apóstrofo e/ou underscore, sem espaços no início ou no fim"
    }},
    { sel: '[data-disable-with]', attr: 'data-disable-with', map: {
      "Save": "Guardar"
    }},
    // O botao da pagina de password e <input type="submit" value="Enter">
    // — o texto esta no atributo, dai nunca ter sido traduzido.
    // So type=submit: mexer no value de outros inputs alterava os dados
    // enviados no formulario.
    { sel: 'input[type="submit"]', attr: 'value', map: {
      "Enter": "Entrar",
      "Submit": "Enviar",
      "Save": "Guardar",
      "Search": "Pesquisar"
    }},
    // O editor de comentarios (Quill) pinta o placeholder por CSS a
    // partir de data-placeholder; o valor Stimulus e a fonte que o
    // controller reaplica, por isso traduzem-se os dois.
    { sel: '[data-placeholder]', attr: 'data-placeholder', map: {
      "Write a comment...": "Escreve um comentário...",
      "Write a message...": "Escreve uma mensagem...",
      "Write a reply...": "Escreve uma resposta..."
    }},
    { sel: '[data-comment-form-placeholder-value]', attr: 'data-comment-form-placeholder-value', map: {
      "Write a comment...": "Escreve um comentário...",
      "Write a message...": "Escreve uma mensagem...",
      "Write a reply...": "Escreve uma resposta..."
    }},
    { sel: '[data-tippy-content]', attr: 'data-tippy-content', map: {
      "Add emoji": "Adicionar emoji",
      "Add image": "Adicionar imagem",
      "Add tip": "Adicionar gorjeta"
    }},
    { sel: '[data-confirm]', attr: 'data-confirm', map: {
      "Are you sure you want to hide this section?": "Tens a certeza que queres ocultar esta secção?"
    }},
    { sel: '[data-confirm-label]', attr: 'data-confirm-label', map: {
      "Hide": "Ocultar"
    }}
  ];

  // Texto por selector: usado quando a palavra é demasiado genérica
  // para entrar no TRANSLATIONS global (ex.: "From"/"To" comeriam
  // qualquer frase EM inglês que os contivesse).
  const TEXT_BY_SELECTOR = {
    'label[for="start_date"]': 'De',
    'label[for="end_date"]': 'Até',
    // Separador entre "Desbloqueia por X" e "Subscreve para aceder".
    // Nao pode ir para o TRANSLATIONS: "or" e demasiado comum e
    // dispararia dentro de qualquer frase EN que ainda sobrasse.
    '.post__section--column > span': ' ou '
  };

  // Zonas de alta-rotacao a ignorar (mutam frequentemente sem texto
  // traduzivel). Os leitores de media disparam mutacoes continuas.
  const SKIP_ZONES = '[class*="countdown"],mux-player,[class*="video__progress"],[class*="audio-player__controls"]';

  // O gtranslate poe lang="en" (e a classe translated-ltr) no <html>
  // quando traduz a pagina — e' o unico sinal fiavel do estado.
  // O cookie googtrans NAO e' escrito nem lido por esta versao do
  // widget (dwf.js), por isso a versao anterior desta funcao devolvia
  // sempre true e o pt-fill reescrevia para PT o ingles que o
  // gtranslate acabara de produzir: ping-pong.
  function isPTActive() {
    const lang = (document.documentElement.getAttribute('lang') || 'pt').toLowerCase();
    return lang.startsWith('pt');
  }

  // ============================================================
  // DATAS RELATIVAS ("10 days ago", "about 2 months ago")
  // Nao dava para resolver com o mapa literal: em PT o "há" vai
  // ANTES do numero e o "ago" esta DEPOIS. Estas regras correm
  // antes das chaves literais, dentro do translateNode.
  // ============================================================
  const REL_UNITS = {
    second: ['segundo', 'segundos', 'um'],
    minute: ['minuto', 'minutos', 'um'],
    hour:   ['hora',    'horas',    'uma'],
    day:    ['dia',     'dias',     'um'],
    week:   ['semana',  'semanas',  'uma'],
    month:  ['mês',     'meses',    'um'],
    year:   ['ano',     'anos',     'um']
  };

  const REL_RE = /\b(about\s+)?(an?|\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago\b/g;

  function relDate(match, about, qty, unit) {
    const u = REL_UNITS[unit];
    if (!u) return match;
    const isArticle = (qty === 'a' || qty === 'an');
    const n = isArticle ? 1 : parseInt(qty, 10);
    if (!isArticle && !(n > 0)) return match;
    const word = (n === 1) ? u[0] : u[1];
    const value = isArticle ? u[2] : n;
    return (about ? 'há cerca de ' : 'há ') + value + ' ' + word;
  }

  // Datas EN dentro de frases ("...a partir de Aug 28, 2026"). O
  // localizeDates so chega a elementos proprios; estas estao no meio
  // de texto corrido, logo tem de ser aqui.
  const MONTHS_EN = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const MONTHS_PT = ['janeiro','fevereiro','março','abril','maio','junho',
                     'julho','agosto','setembro','outubro','novembro','dezembro'];
  const DATE_RE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),\s*(\d{4})\b/g;

  function inlineDate(match, mon, day, year) {
    const i = MONTHS_EN.indexOf(mon.toLowerCase());
    if (i < 0) return match;
    return day + ' de ' + MONTHS_PT[i] + ' de ' + year;
  }

  // Restricao por nivel: o nome do tier vem interpolado no meio
  // ("This product is only available for "Tier 2" members"), por isso
  // nao da para chave fixa. Capturar e' tambem mais seguro do que
  // mapear "members" -> "", que partiria dezenas de frases.
  const ONLY_FOR_NOUNS = {
    product: 'Este produto', post: 'Esta publicação',
    video: 'Este vídeo', page: 'Esta página', content: 'Este conteúdo'
  };
  const ONLY_FOR_RE = /\bThis (product|post|video|page|content) is only available for (.+?) members\b/g;

  function onlyForTier(match, noun, tier) {
    const pt = ONLY_FOR_NOUNS[noun];
    if (!pt) return match;
    return pt + ' está disponível apenas para membros do nível ' + tier;
  }

  // Datas relativas compactas do feed ("4m ago", "1h ago", "3d ago")
  const COMPACT_UNITS = { s: 's', m: 'min', h: 'h', d: 'd', w: 'sem', y: 'a' };

  // Credito do tempo nao usado ao mudar de plano:
  // "Unused time on Tier 1 (349 days)"
  const UNUSED_RE = /\bUnused time on (.+?) \((\d+) days?\)/g;

  // Modal de mudanca de plano (upgrade/downgrade). Quatro variaveis
  // interpoladas. O original diz "change your tier from X to Y"; o
  // "tier" e' consumido aqui porque em PT a frase nao o leva.
  const CHANGE_TITLE_RE = /\bAre you sure you want to change your(?:\s+tier)?\s*from (.+?) to (.+?)\?/g;
  const CHANGE_BODY_RE = /\bYou won['\u2019]t be charged until your (.+?)(?: tier)? expires on (.+?), after which you['\u2019]ll be charged (.+?) for your (.+?)(?: tier)?\s*\./g;

  // Datas com dia da semana e ordinal ("Tuesday, Aug 10th"), usadas
  // neste modal. Corre DEPOIS do CHANGE_BODY_RE, sobre a data que
  // este devolveu intacta no grupo 2.
  const WEEKDAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const WEEKDAYS_PT = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  const WD_DATE_RE = /\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)\b/g;
  const ORD_DATE_RE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)\b/g;

  const REGEX_RULES = [
    { re: ONLY_FOR_RE, pt: onlyForTier },
    { re: CHANGE_TITLE_RE, pt: 'Tens a certeza que queres mudar de $1 para $2?' },
    { re: CHANGE_BODY_RE, pt: 'Não haverá cobrança até o teu nível $1 expirar em $2. A partir daí, serão cobrados $3 pelo teu nível $4.' },
    // A frase parte-se a volta da data (que vive num elemento proprio).
    // Confirmado no DOM: 2 nos de texto, um antes e outro depois.
    // ^...$ garante que so casam esses nos completos — fragmentos
    // soltos como "for your" partiriam "Thank you for your order".
    // O " tier" a seguir ao nome do nivel e' consumido aqui: em PT
    // diz-se "o teu nivel Tier 1", nao "o teu Tier 1 nivel".
    { re: /^(\s*)You won['\u2019]t be charged until your (.+?)(?: tier)? expires on(\s*)$/,
      pt: '$1Não haverá cobrança até o teu nível $2 expirar em$3' },
    { re: /^(\s*),\s*after which you['\u2019]ll be charged (.+?) for your (.+?)(?: tier)?\s*\.(\s*)$/,
      pt: '$1, e depois serão cobrados $2 pelo teu nível $3.$4' },
    // Vantagens: "...for the "Tier 1" tier" -> "...do nivel "Tier 1""
    { re: /\bYou unlocked access to members-only posts for the (.+?) tier\b/g,
      pt: 'Desbloqueaste o acesso às publicações exclusivas do nível $1' },
    { re: WD_DATE_RE, pt: function (m, wd, mon, day) {
        const i = MONTHS_EN.indexOf(mon.toLowerCase());
        if (i < 0) return m;
        return WEEKDAYS_PT[WEEKDAYS_EN.indexOf(wd)] + ', ' + day + ' de ' + MONTHS_PT[i];
      } },
    { re: ORD_DATE_RE, pt: function (m, mon, day) {
        const i = MONTHS_EN.indexOf(mon.toLowerCase());
        return i < 0 ? m : day + ' de ' + MONTHS_PT[i];
      } },
    { re: UNUSED_RE, pt: function (m, tier, d) {
        return 'Tempo não utilizado em ' + tier + ' (' + d + (d === '1' ? ' dia)' : ' dias)');
      } },
    // Contagem de membros nos cartoes de nivel ("4 members", "1 member").
    // DEPOIS do ONLY_FOR_RE, que ja consumiu a frase da restricao.
    { re: /\b(\d+)\s+members?\b/g, pt: function (m, n) { return n + (n === '1' ? ' membro' : ' membros'); } },
    // Sondagens: votos e tempo restante. A forma composta ("2d 22 hours
    // left") tem de vir antes da simples, senao esta come-lhe metade.
    { re: /\b(\d+)\s+votes?\b/g, pt: function (m, n) { return n + (n === '1' ? ' voto' : ' votos'); } },
    { re: /\b(\d+)d\s+(\d+)\s+hours?\s+left\b/g, pt: 'faltam $1 d $2 h' },
    { re: /\b(\d+)\s+days?\s+left\b/g, pt: function (m, n) { return (n === '1' ? 'falta ' : 'faltam ') + n + (n === '1' ? ' dia' : ' dias'); } },
    { re: /\b(\d+)\s+hours?\s+left\b/g, pt: function (m, n) { return (n === '1' ? 'falta ' : 'faltam ') + n + (n === '1' ? ' hora' : ' horas'); } },
    { re: /\b(\d+)\s+minutes?\s+left\b/g, pt: function (m, n) { return (n === '1' ? 'falta ' : 'faltam ') + n + (n === '1' ? ' minuto' : ' minutos'); } },
    // Compactas: "4m ago" -> "há 4 min". Antes da REL_RE.
    { re: /\b(\d+)([smhdwy])\s+ago\b/g, pt: function (m, n, u) {
        const s = COMPACT_UNITS[u];
        return s ? 'há ' + n + ' ' + s : m;
      } },
    { re: DATE_RE, pt: inlineDate },
    // TEM de vir antes do REL_RE: esse apanha o "a minute ago" e
    // deixava "less than há um minuto".
    { re: /\bless than a minute ago\b/g, pt: 'há menos de um minuto' },
    { re: /\bless than an hour ago\b/g, pt: 'há menos de uma hora' },
    // Fragmentos do aviso do reCAPTCHA, que fica partido por dois
    // links. Estas regras usam ^...$ e so casam quando o NO INTEIRO
    // e' aquela palavra — "and" como chave global seria desastroso.
    { re: /^(\s*)and(\s*)$/, pt: '$1e os$2' },
    { re: /^(\s*)apply\.?(\s*)$/, pt: '$1da Google.$2' },
    { re: REL_RE, pt: relDate },
    { re: /\bJust now\b/g, pt: 'Agora mesmo' },
    { re: /\bjust now\b/g, pt: 'agora mesmo' },
    // "1 video" / "12 videos" no banner das series
    { re: /\b(\d+)\s+videos?\b/g, pt: function(m, n){ return n + (n === '1' ? ' vídeo' : ' vídeos'); } },
    // "$4.99 / mo" e "$44.91 / year" do checkout. Regex porque o \b nao
    // funciona a seguir a "/" (dois caracteres nao-palavra seguidos).
    { re: /\/\s*mo\b/g, pt: '/mês' },
    { re: /\/\s*year\b/g, pt: '/ano' },
    // "Save 25% if you pay annually": tem de correr antes da chave
    // literal "Save" (botao), que aqui daria "Guardar 25% if you...".
    { re: /\bSave\s+(\d+)\s*%\s+if you pay annually\b/g, pt: 'Poupa $1% se pagares anualmente' }
  ];

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // A Fourthwall mistura apostrofo reto (') e curvo (’) no mesmo ecra.
  // Tratar os dois como equivalentes evita a falha silenciosa em que a
  // chave nao casa e uma chave curta seguinte trunca a frase.
  function keySource(str) {
    return escapeRegex(str).replace(/['\u2019]/g, "['\u2019]");
  }

  // Regexes compilados UMA vez (evita new RegExp por nodo em cada mutacao)
  const COMPILED = Object.keys(TRANSLATIONS).map(function (en) {
    return { re: new RegExp('\\b' + keySource(en) + '\\b', 'g'), pt: TRANSLATIONS[en] };
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
    // time[data-local] cobre emblemas, perfil, faturacao e historico de
    // pagamentos. As horas ("5:35 pm") dao Invalid Date e sao ignoradas.
    const SEL='.post-tile__date,.post__meta,.video-page__meta,time[data-local]';
    const els=new Set();
    const hit=root.closest&&root.closest(SEL);
    if(hit) els.add(hit);
    if(root.querySelectorAll) root.querySelectorAll(SEL).forEach(el=>els.add(el));
    els.forEach(el=>{
      // Sem guarda de dataset: no portal o Turbo faz morph e repunha o
      // texto EN mantendo o atributo, o que travava a reconversao.
      // new Date("11 de agosto de 2026") ja da Invalid Date -> sai sozinho.
      const d=new Date(el.textContent.trim());
      if(isNaN(d)) return;
      el.textContent=d.toLocaleDateString('pt-PT',{day:'numeric',month:'long',year:'numeric'});
    });
  }

  // Idempotente: depois de reescrito o valor já não está no mapa.
  // Não gera loop — o observer não vigia 'attributes'.
  function localizeAttrs(root){
    if(!isPTActive()||!root) return;
    if(root.nodeType===Node.TEXT_NODE) root=root.parentElement;
    if(!root||root.nodeType!==Node.ELEMENT_NODE) return;
    ATTR_MAP.forEach(function(cfg){
      const els=new Set();
      const hit=root.closest&&root.closest(cfg.sel);
      if(hit) els.add(hit);
      if(root.querySelectorAll) root.querySelectorAll(cfg.sel).forEach(el=>els.add(el));
      els.forEach(el=>{
        const pt=cfg.map[el.getAttribute(cfg.attr)];
        if(pt) el.setAttribute(cfg.attr, pt);
      });
    });
  }

  function localizeBySelector(root){
    if(!isPTActive()||!root) return;
    if(root.nodeType===Node.TEXT_NODE) root=root.parentElement;
    if(!root||root.nodeType!==Node.ELEMENT_NODE) return;
    Object.keys(TEXT_BY_SELECTOR).forEach(function(sel){
      const els=new Set();
      const hit=root.closest&&root.closest(sel);
      if(hit) els.add(hit);
      if(root.querySelectorAll) root.querySelectorAll(sel).forEach(el=>els.add(el));
      els.forEach(el=>{
        // Sem guarda de dataset, pela mesma razao das datas: o morph do
        // Turbo repunha o texto EN e a guarda travava a reconversao.
        // Comparar antes de escrever ja torna isto idempotente.
        if(el.textContent!==TEXT_BY_SELECTOR[sel]) el.textContent=TEXT_BY_SELECTOR[sel];
      });
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
    // Regex primeiro: reordena as datas relativas antes que chaves
    // literais curtas lhes toquem.
    for (let i = 0; i < REGEX_RULES.length; i++) {
      const newText = text.replace(REGEX_RULES[i].re, REGEX_RULES[i].pt);
      if (newText !== text) {
        text = newText;
        changed = true;
      }
    }
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

  function processNode(node) {
    injectTax(node);
    localizeDates(node);
    localizeAttrs(node);
    localizeBySelector(node);
    fillNode(node);
  }

  // Scheduler: idle callback se disponivel, senao setTimeout.
  // Timeout de 500ms de proposito: com valores curtos (~150ms) o
  // callback e' forcado mesmo com o browser ocupado, e durante o
  // scroll isso competia com o rendering e atrasava o lazy-load.
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
      processNode(document.body);
      fullScheduled = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFull);
  } else {
    runFull();
  }

  // Turbo: alem da navegacao normal, os turbo-streams substituem
  // conteudo sem disparar turbo:frame-load (ex.: o sidebar do checkout
  // quando se muda o valor em "Escolhe quanto pagas"). Sem estes
  // eventos, essas zonas voltavam a ingles e nada as reprocessava.
  // Todos passam pelo scheduler: o turbo:morph dispara a MEIO do morph
  // e traduzir sincronamente ai arriscava o Turbo comparar contra um
  // DOM ja alterado.
  ['turbo:load','turbo:frame-load','turbo:render','turbo:frame-render',
   'turbo:before-stream-render','turbo:submit-end','turbo:morph']
    .forEach(function (ev) { document.addEventListener(ev, runFull); });

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
  // THROTTLE (nao debounce): a 1a mutacao agenda, as seguintes so
  // acumulam em pending. Com debounce (cancel+reschedule), qualquer
  // churn continuo no DOM — mux-player, barras de progresso, turbo
  // frames — cancelava a execucao para sempre e o conteudo novo so
  // era traduzido depois de um reload.
  if (!mutScheduled) {
    mutScheduled = schedule(() => {
      const batch = pending;
      pending = [];
      mutScheduled = null;
      let stale = false;
      batch.forEach(node => {
         if (node.isConnected) { processNode(node); }
         // Nó já substituído (tipico de turbo-stream): perdiamos a
         // traducao dessa zona para sempre. Marca para passagem geral.
         else { stale = true; }
      });
      if (stale) processNode(document.body);
    });
  }
});
observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  // TOOLTIPS (tippy): o controller le data-tippy-content quando liga —
  // antes do pt-fill, que corre em defer + idle — e guarda o texto EN
  // em cache. Traduzir o atributo depois disso nao muda o balao ja
  // criado, dai so funcionar depois de um refresh. Aqui apanhamos o
  // balao ja renderizado ([data-tippy-root], anexado ao body) sem
  // esperar pelo idle callback do observer.
  document.addEventListener('pointerover', function () {
    requestAnimationFrame(function () {
      const tips = document.querySelectorAll('[data-tippy-root]');
      for (let i = 0; i < tips.length; i++) processNode(tips[i]);
    });
  }, true);
  // Re-aplicar PT-FILL quando o utilizador VOLTA a PT. O gtranslate
  // repoe o DOM original (o ingles do Fourthwall) e so o pt-fill o
  // traduz. Comparamos o lang anterior para nao disparar em cada
  // mudanca de classe, e repetimos uma vez porque a reposicao do
  // gtranslate acontece depois de ele mexer no lang.
  let lastLang = (document.documentElement.getAttribute('lang') || 'pt').toLowerCase();
  const stateObserver = new MutationObserver(() => {
    const now = (document.documentElement.getAttribute('lang') || 'pt').toLowerCase();
    if (now === lastLang) return;
    lastLang = now;
    if (!now.startsWith('pt')) return;
    runFull();
    setTimeout(runFull, 400);
  });
  stateObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'lang']
  });
})();

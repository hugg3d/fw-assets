# fw-assets

Ficheiros servidos por jsDelivr para o site Fourthwall **hugobran.co**
(loja + portal `/supporters`).

| Ficheiro | O que é |
|---|---|
| `hb-styles.css` | Todo o CSS custom do site |
| `pt-fill.js` | Camada de tradução PT-PT por cima do inglês da Fourthwall |
| `hb-scheme.js` | Toggle light/dark, nas duas superfícies |

O resto vive no **custom code** da Fourthwall: o header (que corre nas duas
superfícies) e o footer (que **não** corre no `/supporters`). O gtranslate
vive só no header — settings, seed do `lang` e carregamento do `dwf.js` numa
única cópia. Nunca voltar a pôr um `.gtranslate_wrapper` no markup do footer:
o `dwf.js` injecta um switcher em todos os wrappers que encontre.

**Ciclo de edição:** commit → purge em `jsdelivr.com/tools/purge` →
hard-refresh no site. As URLs usam `@main`, por isso qualquer commit entra em
produção assim que a cache expira. Decidido conscientemente: fixar numa tag
trocaria o purge por um ciclo de release, e com o repo a ser editado várias
vezes por sessão a fricção não compensa. A rever quando os ficheiros
assentarem — e nessa altura faz-se nos quatro `<script>`/`<link>` de uma vez,
com `integrity`, porque fazê-lo só nalguns não vale nada.

---

## Porque é que o código parece defensivo a mais

Estas são as descobertas que custaram iterações. Sem elas, várias guardas
parecem código desnecessário e alguém remove-as.

### O `dwf.js` do gtranslate renderiza DEPOIS do próprio evento `load`

Por isso uma flag do tipo "já estou a carregar" nunca chega: há sempre uma
janela em que o script já carregou, o wrapper ainda está vazio, e um evento do
Turbo dispara um segundo carregamento. Cada execução do `dwf.js` injecta o seu
switcher — resultado, dois ou três switchers lado a lado.

**Testado:** sem o `MutationObserver` que poda o wrapper no momento da
injecção, volta a duplicar. A flag sozinha não resolve.

O `dwf.js` tem ainda um bug próprio: regista a função `load_tlib`
directamente como listener de `pointerenter`/`focusin`, e o browser passa-lhe
o objecto do evento como primeiro argumento — que a função trata como se
fosse um callback. A partir do segundo hover, dá `TypeError: callback is not
a function` na consola. É inofensivo (serve só para pré-carregar a biblioteca
de tradução, coisa que o primeiro hover já fez) e não há forma de o corrigir
de fora.

### O Turbo restaura wrappers de snapshot sem handlers

Nós restaurados de um snapshot são clones. Um switcher que venha daí está no
ecrã mas não abre. É por isso que o bloco do gtranslate guarda uma referência
ao wrapper que criou e deita fora qualquer outro que apareça com o mesmo id.

São **dois problemas diferentes** e precisam dos dois mecanismos: o observer
não vê o caso do snapshot (não há injecção nova), e a verificação de
identidade não vê a corrida do `dwf.js`.

### A Fourthwall interpola o nome da loja num nó de texto único

`Join now to unlock exclusive <LOJA> content` chega como **um só** nó, não
partido por elemento. Regras ancoradas em `^...$` nunca casam aí — só servem
quando a frase vem mesmo repartida (é o caso do chip da gorjeta, confirmado no
DOM). Para o resto tem de ser captura da frase inteira.

### Chaves cegas destroem texto que não se vê a testar

`"tier": ""` apagava a palavra em todo o lado, incluindo no modal de mudança
de plano, onde `change your tier from X` ficava `change your from X` e parecia
um bug da plataforma. O mesmo valia para `"content": ""`.

A regra: se a chave é uma palavra comum, captura-se a frase com regex em vez
de se mapear a palavra. O perigo não está no texto que já viste traduzido —
está no inglês que a Fourthwall vier a mostrar num release futuro, sem aviso.

### A classe `translated-*` é o único sinal fiável do estado da tradução

O `lang` do `<html>` mente: o Turbo repõe-no na navegação (visto `lang="en-US"`
com a página em espanhol). E o cookie `googtrans` **não é escrito nem lido**
por esta versão do `dwf.js` — uma versão anterior do `isPTActive()` contava com
ele, devolvia sempre `true`, e o `pt-fill` reescrevia para PT o inglês que o
gtranslate acabara de produzir. Ping-pong.

Foi também por isto que o pré-seed do cookie saiu do footer: era código morto.

### O footer não corre no `/supporters`

A Fourthwall não injecta o footer custom code no portal. Só o header corre nas
duas superfícies — tudo o que o portal precisa tem de viver lá.

E as duas superfícies têm árvores diferentes: a loja usa
`.header__icons > .header__list` com `<li>`, o portal usa `.header__right-nav`
com `<a class="header__link">` directos. Selectores de uma falham em silêncio
na outra.

### O observer do `pt-fill` usa throttle, não debounce

Com debounce (cancelar e reagendar), qualquer churn contínuo no DOM —
leitores de media, barras de progresso, turbo frames — cancelava a execução
para sempre, e o conteúdo novo só era traduzido depois de um reload.

O `timeout` de 500 ms do `requestIdleCallback` também é deliberado: com ~150 ms
o callback é forçado mesmo com o browser ocupado, e durante o scroll competia
com o rendering e atrasava o lazy-load. Já foi revertido uma vez.

O mesmo padrão está agora no redacted, que passou a correr nas duas
superfícies.

### `innerHTML` reatribuído sem guarda é caro

Atribuir `innerHTML` destrói e recria a subárvore, mesmo quando o conteúdo não
muda — mata listeners e enche o `pt-fill` de mutações inúteis. Acontecia no
`paint()` do toggle de tema, que tem agora guarda, e no redacted, que varria
todos os elementos-folha da página a cada evento do Turbo.

Ler `innerHTML` só para procurar uma substring também é caro: serializa HTML.
Usar `textContent` quando o que se procura é texto.

### O redacted: `TreeWalker` sobre nós de texto, e fora do conteúdo alheio

O redacted foi reescrito: percorre nós de **texto** com um `TreeWalker` e
substitui só o nó onde há mesmo `[r]`, com `createTextNode` e `textContent`.
A versão anterior lia `textContent` de todos os elementos-folha — o que
percorre a mesma subárvore várias vezes na mesma passagem — e reatribuía
`innerHTML` a cada um.

Sobra um único `innerHTML`, no fallback para marcação que atravessa elementos
(`[r]texto <a>link</a>[/r]`), onde o `[r]` e o `[/r]` caem em nós diferentes.
Nesse caso delega-se o bloco inteiro ao fallback, pares completos incluídos:
delegar só quando **não** havia nenhum par completo deixava um `[r]` pendurado
em texto cru no ecrã, a seguir a um par já fechado.

**Zonas de terceiros estão excluídas** (`UNTRUSTED`: comentários, mensagens,
editor, `[contenteditable]`), por duas razões independentes e ambas
suficientes. Primeira: o `[r]` é marcação **nossa**, para conteúdo **nosso** —
sem a exclusão, qualquer membro pintava o próprio comentário com as cores da
marca, incluindo no painel lateral do feed. Segunda: o fallback reatribui
`innerHTML`, e sobre texto de outra pessoa isso é vector de mutation XSS — o
`innerHTML` devolve o markup que a Fourthwall escapou, e reatribuí-lo volta a
interpretá-lo como HTML. Testado que a FW escapa `<a>` em comentários, mas
isso cobre o caminho rápido, não o fallback, e pode mudar num release futuro.

O `/supporters/messages` é saltado **pelo path**, além do selector: a classe
do contentor é só `messages`, genérica de mais para se confiar nela quando o
que está do outro lado é texto de terceiros. Custo aceite: perde-se o
highlight nas mensagens que nós próprios escrevemos. Distinguir o autor
obrigaria a ancorar numa classe do tipo "mensagem do criador", e se essa
falhasse falhava do lado inseguro.

### As vars do tema têm uma única fonte

As cores do tema light vivem **só** no anti-FOUC inline do header, ancoradas em
`:root[data-scheme="light"]` e `:root[data-scheme="light"] #fw-section-header`
— a especificidade tem de ficar acima do `#fw-section-header` da Fourthwall,
senão a ordem no documento decide. O `hb-scheme.js` não tem cópia das cores:
trocar de tema é só trocar o atributo.

O anti-FOUC fica inline por obrigação — é o único bloco que tem de correr
antes do primeiro paint a partir do próprio documento.

### `--header-blur-*` vive no `:root`, não no `.header`

As propriedades personalizadas só herdam para descendentes, e o wrapper do
gtranslate é montado no `<body>`, fora do header. Declaradas no `.header`, o
switcher caía sempre no valor de fallback — os valores coincidiam, por isso
nunca se notou, mas ficariam dessincronizados na primeira alteração.

### O wrapper do conteúdo editável muda com a superfície

A loja serve rich text em `.html-formatter`; o portal serve-o em `.rich-text`,
dentro de `.post__body` (feed e posts) ou `.video-page__description` (vídeos).
Ancorar no wrapper exterior obriga a descobrir um novo de cada vez — foi assim
três vezes seguidas antes de se ancorar no `.rich-text`, que é comum a todos.

Cuidado com o `.post__content`: apesar do nome, é o **cartão inteiro** (data,
título, ações, comentários), não o texto. Ancorar aí pintou de azul a data, o
título e os botões de desbloqueio.

O `#fw-section-header` **não existe no portal** — regras ancoradas nele só
servem a loja. É o caso do hover do header, e isso é intencional: no portal
fica sólido, para se distinguir da loja. No anti-FOUC inline o id é
obrigatório, pela especificidade; lá não casar no portal é inofensivo.

### A Fourthwall declara `a:hover` e ganha

Os links de conteúdo tinham a cor certa em repouso e no hover saltavam para a
cor do texto (branco no tema escuro, preto no claro) — uma regra `a:hover` da
plataforma a ganhar em especificidade. Daí o `!important` na cor do hover, que
cai dentro da convenção de o usar só para sobrepor a Fourthwall. O `opacity:
0.7` que lá estava também saiu: sobre fundo escuro lavava o azul e lia-se como
cinzento.

### O highlight do redacted é permanente no portal

No `/supporters` o conteúdo é para quem já pagou, e o aparecer-e-desaparecer
com o scroll só atrapalha a leitura — o highlight fica sempre visível, via
classe `hb-redacted-static` no `<body>`, posta pelo JS **a partir do path**.
Por `:has()` falharia nas secções do portal sem posts. O observer continua a
correr e a pôr `.revealed`; o CSS do portal simplesmente não depende dela.

Consequência que obriga a duplicar selectores: as regras do link dentro de um
redacted precisam das duas variantes (`.redacted.revealed a` para a loja,
`body.hb-redacted-static .redacted a` para o portal). Sem a segunda, o link
mudava de cor sozinho ao entrar e sair da zona do observer, mesmo com o
highlight permanente por cima.

O `toggle` da classe tem de correr **antes** do `return` que salta o
`/messages`, senão a classe fica com o valor da página anterior.

### O seed do `lang` tem de correr antes dos scripts `defer`

Os `defer` executam **antes** do `DOMContentLoaded`, e o `pt-fill` agenda aí a
primeira passagem. Se nessa altura o `<html>` ainda disser `lang="en"`, o
`isPTActive()` devolve `false` e a página fica por traduzir até ao evento
Turbo seguinte. Por isso o `setLang()` do bloco gtranslate é chamado
imediatamente, e não dentro do `run()`.

O seed também não pode ser cego: forçar `lang="pt"` sempre — como fazia o
inline do footer — provocava um flash de PT antes de o gtranslate repor o EN
escolhido pelo utilizador. A versão actual respeita o `__GT_TRANSLATE_LANGS`.

### O painel de CSS de cada bloco aninha tudo no id da secção

O "Add custom CSS code" de um bloco não é global: a Fourthwall serve-o em
`custom sections.css` embrulhado em CSS nesting,
`#fw-section-<id> { & .image-with-text { … } }`. Duas consequências:

- **Chega à própria `<section>`**, porque o id é do wrapper exterior:
  `.image-with-text` no painel apanha a secção, não só o que está dentro.
- **`@keyframes` no painel é descartado sem erro.** Um `@keyframes` aninhado
  é inválido, e o browser ignora-o: a regra que chama a animação aplica-se,
  mas a animação não existe. Os keyframes vivem no `hb-styles.css` (ver
  SHAKE) e o painel só os chama.

### Um fundo opaco tapa a grelha e o backlight

A grelha (`body::before`, z-index -999) e a `.backlight` (-111) estão atrás
de tudo. Uma secção com fundo próprio tapa-as. A solução usada nos blocos:
fundo da secção a `none` e a cor num `::before` com z-index -1000, abaixo
dos dois efeitos. Três condições:

- **"Customize colors" desligado** — pinta o fundo no wrapper, que o painel
  não alcança, e volta a tapar tudo. As cores vão no CSS do painel.
- **Nenhum ancestral pode criar stacking context** (z-index, transform,
  filter). Se criar, o `::before` fica preso dentro dele, por cima da grelha,
  e o resultado parece o de antes, sem erro nenhum.
- **Os efeitos seguem o tema, não o bloco.** No tema claro as linhas e o
  brilho são escuros: sobre um fundo escuro ou azul quase não se veem.

### Bandas de contraste: `.hb-invert` troca o tema dentro da secção

Há dois tipos de faixa de cor na homepage:

- **Azul fixo** (cérebro, testemunho): fica azul nos dois temas. A paleta
  é fixada no painel do próprio bloco, com tokens `--color-*` locais.
- **Contraste invertido** (banda dos cartões, Clientes_): fica sempre com
  o tema contrário ao da página — escura no claro, creme no escuro — para
  continuar a ser uma faixa nos dois. É um Custom HTML com
  `class="hb-invert"` no wrapper; a regra (BANDA INVERTIDA, no
  `hb-styles.css`) encontra a secção com `:has()`.

A `.hb-invert` não pinta só o fundo: redefine `--color-background`,
`--color-on-background`, as variantes `-rgb`, `--color-primary` e
`--color-on-primary` dentro da secção. Texto, botões, caret, `.redacted`
e bordas dos cartões passam à paleta contrária sem regras próprias. A
grelha do body tem a cor do tema e some-se na banda, por isso a banda
desenha a sua, na cor contrária e alinhada com a do body (fixed, 20px).

**Os valores do tema contrário estão escritos à mão na regra.** Se a
paleta do tema na Fourthwall mudar, atualizar também a BANDA INVERTIDA.

### O `clip-path` corta bordas e sombras

Os cartões (`.hb-card`) e a imagem do hero (`.hb-shape`) têm a forma do
template — aba dobrada em baixo à direita, canto cortado em baixo à
esquerda — feita com `clip-path`. O recorte apanha tudo o que o elemento
pinta, incluindo `border` e `box-shadow`. Por isso:

- **Borda:** o cartão é pintado na cor da borda (`--hb-card-edge`, por
  omissão a cor do texto do tema a 20%) e um `::before` 1px para dentro,
  com `clip-path: inherit`, leva a cor do cartão (`--hb-card-bg`).
- **Sombra ou espessura:** vai num invólucro sem recorte, com
  `filter: drop-shadow()`, que segue a forma do filho. Os cartões de
  Recursos usam 6 drop-shadows de 2px em cadeia para 12px de espessura.

### O `<style>` de um Custom HTML é global

Ao contrário do painel de CSS, um `<style>` dentro de um bloco Custom
HTML aplica-se à página inteira. Cada bloco usa um prefixo próprio
(`.hb-band`, `.hb-steps`, `.hb-clients`, `.hb-res`) e nada genérico.
Para chegar à `<section>` da Fourthwall sem saber o id, usa-se
`section.custom-html:has(.prefixo)`. O hero é uma secção Liquid e faz o
mesmo com `.hero-{{ section.id }}`.

### Os breakpoints são os da Fourthwall: 640 e 1024

A Fourthwall muda de layout em dois pontos, e o CSS nosso tem de usar os
mesmos — nunca 768:

- **640px (`@sm`)**: header, menus, barras e o cartão sticky do carrinho
  passam a desktop (classes `hidden@sm` / `visible@sm`).
- **1024px (`@md`)**: as grelhas passam a 2 colunas
  (`col-grid--2-cols@md`, `col-grid--reversed@md`).
- **Exceção deliberada: o widget de língua.** Fica centrado até aos 1023px,
como o footer, que só passa a desktop aos 1024. Até aí também se esconde
enquanto o cartão do carrinho está visível: a partir dos 640px esse cartão
já está ancorado à direita, com até 480px, e passava por cima do widget.

Entre os dois há uma zona híbrida — header de desktop, conteúdo numa só
coluna — onde aparecem quase todos os problemas de tablet. Cada regra
segue o breakpoint do componente que afina: `max-width: 639px` /
`min-width: 640px` para header e barras, `max-width: 1023px` /
`min-width: 1024px` para blocos de conteúdo.

### O painel de CSS passa por Sass

O CSS do "Add custom CSS code" é compilado com Sass antes de ser servido.
O que isso muda:

- **`min()` / `max()` com `var()` dão erro de compilação** ("is not a number
  for `min`"): o Sass tenta calcular o `min()` sozinho. Alternativa
  equivalente: `width: 100%` + `max-width: var(--x)`.
- **Funcionam sem problema:** `clamp()` com valores fixos (incluindo
  `calc()` com `vw` e `px` misturados), `overflow: clip`, `@container`,
  `@media` aninhados.
- **`@keyframes` não** — ver a secção acima: é descartado por ficar aninhado.

### O observer do redacted também marca imagens

O mesmo `IntersectionObserver` dos redacted (header) vigia `.hb-shake` e
`.image-with-text__image`, e põe/tira `.hb-in-view` quando entram/saem da
faixa central do ecrã (`rootMargin -25%`). O JS só sinaliza; é o CSS de
cada bloco que decide se a classe faz alguma coisa. É o que faz o abanão
repetir em mobile a cada passagem — o `.is-visible` do scroll reveal é
posto uma vez e o elemento deixa de ser observado, por isso não serve.

### O widget de avaliações (EchoBrain) tem CSS próprio, fora do site

O widget corre isolado e usa classes genéricas (`.header`, `.grid`,
`.button`) que não tocam no resto do site — e, pela mesma razão, nem o
`hb-styles.css` nem os painéis da Fourthwall lhe chegam. O CSS dele só
tem efeito no campo de CSS personalizado **do painel do EchoBrain**.

O `echobrain.css` neste repo é uma **cópia de segurança, não ligada ao
site**: existe para não depender só da configuração deles (perda de
config, mudança de conta) e para o histórico ficar no git. Ao mudar:
primeiro no painel do EchoBrain, confirmar ao vivo, depois atualizar a
cópia no mesmo dia.

Regras atuais:

- **Abas sem overflow horizontal** (`.tools`, `.tools__option`): quebram
  linha em vez de empurrar a largura.
- **Tablet (640–1023): resumo e lista numa só coluna.** O widget divide
  25% / 75% a partir dos 640px, e o "0.0" é posicionado a 155px fixos,
  ao lado das estrelas. Com ~150px de coluna num tablet, ficava por cima
  do título. As 2 colunas só a partir dos 1024px, como o resto do site.

### O "(plus tax)" é da Fourthwall, não nosso

O `pt-fill` injetava um "(plus tax)" nos preços. Desde novembro de 2026 a
Fourthwall mostra o seu (`span.price-tax`, `data-product="tax-note"`) nos
cartões, na página de produto e no carrinho, e o nosso aparecia em
duplicado. O injetor foi removido: a FW sabe que produtos pagam imposto
— o cartão-presente não paga na compra (vale multiuso: o IVA é cobrado
quando é usado) e a página dele não tem etiqueta.

- **Tradução:** a chave `"plus tax": "+IVA"` continua no `pt-fill`, para
  traduzir a etiqueta da FW.
- **Aspeto:** `.plus-tax-label, .price-tax` no hb-styles (letra mais
  pequena e esbatida). O `.plus-tax-label` continua a ser usado pelo
  bloco PLANOS P.M. do header, que reescreve o preço dos planos.
- **Patch temporário no header:** a FW põe a etiqueta no cartão-presente
  na listagem e no carrinho (erro deles, reportado). Até corrigirem, um
  `<style>` logo a seguir ao link do hb-styles esconde-a pelo slug do
  produto. Slugs cobertos: o prefixo `cartao-presente` (todos os
  cartões-presente novos começam assim) e o antigo `new-gift-card-offer`.
  Novos valores entram no mesmo produto, não precisam de slug novo.
  Apagar o bloco quando a FW corrigir.

### Emblemas com número: "N-month member"

O emblema de subscrição contínua muda de nome todos os meses ("1-month
member", "2-month member"…), por isso é uma regra em `REGEX_RULES` e não
uma chave fixa: "Membro há 1 mês", "Membro há N meses", para qualquer
número. Se a FW passar a usar anos ("1-year member"), junta-se uma regra
igual.

---

## Blocos custom da homepage

O código destes blocos vive na Fourthwall, não neste repo. O que é
partilhado entre eles está no `hb-styles.css`.

| Bloco | Tipo | Usa do hb-styles |
|---|---|---|
| Hero ("Segurança digital…") | Secção Liquid | `.hb-card`, `.hb-shape`, `.hb-caret` |
| "Arruma a tua vida digital" + 01–03 | Custom HTML `.hb-steps` | — |
| Banda dos cartões | Custom HTML `.hb-band` | `.hb-invert`, `.hb-card` |
| Testemunho | Bloco da FW + painel | — |
| Clientes_ | Custom HTML `.hb-clients` | `.hb-invert`, `.hb-caret` |
| // Recursos | Custom HTML `.hb-res` | `.hb-card` |
| Cérebro | image-with-text + painel | `hb-shake` |
| Innovate with us | image-with-text + painel | — |

## Convenções

- **CSS vive no `hb-styles.css`.** Misturar `<style>` inline no header com o
  ficheiro já causou duplicações silenciosas.
- **`!important` só** para sobrepor estilos inline **ou regras** da Fourthwall.
- **Tudo idempotente e turbo-aware.** O portal corre Turbo Drive com morph.
- **Ancorar em `data-testid`**, não em posição. As versões posicionais
  partiram-se todas as vezes que a Fourthwall mexeu na árvore.
- **Falha segura:** se o CSS não carregar, o site deve degradar para o estado
  da Fourthwall, não para um estado partido. Ver as notas do logo e do scroll
  reveal no `hb-styles.css`.
- **Comentários longos vivem aqui, não no custom code.** O header tem limite
  de 25 000 caracteres; o porquê de cada guarda fica no README e no código
  fica uma linha a apontar para cá.
- **Nada de marcação nossa sobre texto de terceiros.** Ver a secção do
  redacted: comentários, mensagens e editores ficam de fora, por segurança e
  por coerência de marca.
- **Glossário e registo de voz** estão no topo do `pt-fill.js`. Consultar antes
  de acrescentar chaves.
- **Blocos simples personalizam-se no painel do próprio bloco.** O
  `hb-styles.css` fica para o que é reutilizável (tokens, utilitários como
  `.hb-shake`, `@keyframes`) ou para o que o painel não alcança.
- **O que dois blocos partilham passa para o `hb-styles.css`.** Foi assim
  com os cartões (`.hb-card`, `.hb-shape`) e com a banda invertida
  (`.hb-invert`): os blocos ficam só com a disposição (largura, tamanho de
  letra, posição).

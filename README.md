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
marca. Segunda: o fallback reatribui `innerHTML`, e sobre texto de outra
pessoa isso é vector de mutation XSS — o `innerHTML` devolve o markup que a
Fourthwall escapou, e reatribuí-lo volta a interpretá-lo como HTML. Testado
que a FW escapa `<a>` em comentários, mas isso cobre o caminho rápido, não o
fallback, e pode mudar num release futuro.

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
servem a loja. No caso do hover do header isso é agora intencional: o portal
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

---

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

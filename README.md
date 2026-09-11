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

### `innerHTML` reatribuído sem guarda é caro

Atribuir `innerHTML` destrói e recria a subárvore, mesmo quando o conteúdo não
muda — mata listeners e enche o `pt-fill` de mutações inúteis. Acontecia no
redacted (sobre todos os elementos-folha da página, a cada evento do Turbo) e
no `paint()` do toggle de tema. Ambos têm agora guarda.

Ler `innerHTML` só para procurar uma substring também é caro: serializa HTML.
Usar `textContent` quando o que se procura é texto.

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

---

## Convenções

- **CSS vive no `hb-styles.css`.** Misturar `<style>` inline no header com o
  ficheiro já causou duplicações silenciosas.
- **`!important` só** para sobrepor estilos inline da Fourthwall.
- **Tudo idempotente e turbo-aware.** O portal corre Turbo Drive com morph.
- **Ancorar em `data-testid`**, não em posição. As versões posicionais
  partiram-se todas as vezes que a Fourthwall mexeu na árvore.
- **Falha segura:** se o CSS não carregar, o site deve degradar para o estado
  da Fourthwall, não para um estado partido. Ver as notas do logo e do scroll
  reveal no `hb-styles.css`.
- **Glossário e registo de voz** estão no topo do `pt-fill.js`. Consultar antes
  de acrescentar chaves.

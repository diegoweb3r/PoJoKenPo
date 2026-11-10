# Documento de Requisitos de Software

## Pokémon Jokenpô

| Campo | Informação |
| :--- | :--- |
| **Produto** | PoJokenpô |
| **Tipo de documento** | Especificação de Requisitos de Software (ERS) |
| **Versão** | 1.0 |
| **Status** | Baseline inicial --- sujeito à validação das regras de jogo |
| **Plataforma** | Aplicação web responsiva |
| **Idioma inicial** | Português (Brasil) |

---

## 1. Introdução

### 1.1. Objetivo

Este documento especifica os requisitos funcionais e não funcionais do
PoJokenpô, um jogo web de cartas inspirado no universo Pokémon e
na mecânica de Jokenpô.

O documento estabelece o escopo, as regras conhecidas, os dados
consumidos da PokéAPI, os comportamentos esperados da interface e os
critérios de aceitação. Deve servir como referência para design,
implementação, testes e evolução do produto.

### 1.2. Visão do produto

O PoJokenpô permitirá que uma pessoa jogue contra um oponente
controlado pelo computador. Cada participante terá uma mão de três
cartas Pokémon. Em cada rodada, ambos escolhem uma carta e as escolhas
são reveladas para comparação.

O resultado será determinado por uma matriz própria de vantagens e
desvantagens entre tipos Pokémon. A partida será disputada em melhor de
três rodadas decisivas.

### 1.3. Público-alvo

Pessoas interessadas em Pokémon e jogos casuais de cartas, com foco em
uma experiência simples, acessível e intuitiva.

### 1.4. Convenções

-   **Deve** indica requisito obrigatório.
-   **Deverá** indica comportamento esperado e verificável.
-   **Poderá** indica funcionalidade opcional ou evolução futura.
-   Requisitos identificados como **pendentes de decisão** não devem ser
    tratados como regras definitivas até serem aprovados.

---

## 2. Escopo

### 2.1. Funcionalidades incluídas na primeira versão (MVP)

1.  Exibir uma tela inicial e permitir iniciar uma partida.
2.  Obter dados de Pokémon da primeira geração por meio da PokéAPI.
3.  Montar uma mão de três cartas para o jogador e três cartas para o
    computador.
4.  Exibir as cartas do jogador com suas informações.
5.  Manter as cartas do computador ocultas até a revelação da jogada.
6.  Permitir que o jogador selecione uma carta disponível.
7.  Realizar a escolha do computador sem revelar previamente sua carta.
8.  Revelar as duas cartas e comparar seus tipos.
9.  Exibir o resultado da rodada e atualizar o placar.
10. Tratar empates conforme a regra de reposição a ser validada.
11. Encerrar a partida quando um participante alcançar duas vitórias.
12. Permitir iniciar uma nova partida.

### 2.2. Fora do escopo inicial

Não fazem parte do MVP:

-   Modo multiplayer ou partidas online.
-   Cadastro, login ou perfil de usuário.
-   Backend próprio ou banco de dados.
-   Loja, coleção persistente ou sistema de cartas colecionáveis.
-   Evolução, níveis, experiência ou atributos de combate.
-   Ataques, pontos de vida ou mecânicas do Pokémon TCG.
-   Uso de estatísticas oficiais para determinar o vencedor.
-   Aplicativo nativo para dispositivos móveis.

Essas funcionalidades poderão ser consideradas em versões futuras.

---

## 3. Premissas e restrições

1.  O jogo utilizará exclusivamente os 151 Pokémon da primeira geração,
    identificados pelos números de Pokédex de 1 a 151.
2.  A fonte de dados será a PokéAPI v2.
3.  Cada carta utilizará somente o tipo principal do Pokémon para
    identidade visual e regras de batalha.
4.  Pokémon com dois tipos terão seu tipo secundário ignorado nesta
    versão.
5.  O computador será um oponente local controlado pela aplicação.
6.  A interface deverá ser responsiva para desktop e dispositivos
    móveis.
7.  O projeto será desenvolvido inicialmente no frontend, sem backend.
8.  A aplicação dependerá de conexão com a internet para consultar a
    PokéAPI, salvo eventual implementação futura de cache local.

---

## 4. Tecnologias e arquitetura

### 4.1. Tecnologias definidas

| Tecnologia | Responsabilidade |
| :--- | :--- |
| **HTML5** | Estrutura semântica da aplicação |
| **CSS3** | Estilização, layout, responsividade e animações |
| **JavaScript** | Regras, processamento e manipulação dos dados |
| **React** | Construção da interface por componentes e gerenciamento de estado |
| **Vite** | Ferramenta de desenvolvimento e build |
| **ESLint** | Análise estática e identificação de problemas no código |
| **PokéAPI** | Fonte externa de dados dos Pokémon |
| **Git e GitHub** | Versionamento e hospedagem do código-fonte |

### 4.2. Diretrizes arquiteturais

-   A interface deverá ser dividida em componentes reutilizáveis.
-   A comunicação com a PokéAPI deverá ficar separada dos componentes
    visuais.
-   As regras do jogo deverão ficar separadas da camada de apresentação.
-   Os dados recebidos da API deverão ser normalizados para um formato
    interno consistente.
-   O estado da partida deverá ser gerenciado de forma centralizada o
    suficiente para manter placar, mãos, seleção e etapa atual
    sincronizados.
-   A aplicação deverá evitar chamadas repetidas e desnecessárias à API.

### 4.3. Estrutura de diretórios proposta

``` text
pokemon-jokenpo/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── PlayerDeck.jsx
│   │   ├── ComputerDeck.jsx
│   │   ├── BattleArena.jsx
│   │   ├── Scoreboard.jsx
│   │   └── GameResult.jsx
│   ├── services/
│   │   └── pokemonApi.js
│   ├── utils/
│   │   ├── gameRules.js
│   │   └── pokemonMapper.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
└── package.json
```

A estrutura é uma referência inicial e poderá ser adjusted conforme a
implementação evoluir.

---

## 5. Integração com a PokéAPI

### 5.1. Fonte

A aplicação deverá consumir a PokéAPI v2:

-   Página oficial: https://pokeapi.co/
-   Documentação: https://pokeapi.co/docs/v2

A API é pública e não exige chave de autenticação para as consultas
previstas.

### 5.2. Conjunto de Pokémon

-   A aplicação deverá limitar a seleção aos Pokémon com identificadores
    de 1 a 151.
-   Não deverão ser incluídas formas regionais, variantes ou Pokémon de
    outras gerações.
-   Cada Pokémon deverá ser representado por um registro interno com, no
    mínimo:
    -   `id`: identificador numérico da PokéAPI;
    -   `name`: nome do Pokémon;
    -   `image`: URL da imagem escolhida;
    -   `types`: tipos retornados pela API;
    -   `primaryType`: tipo principal utilizado pelo jogo.

### 5.3. Endpoints de referência

| Finalidade | Endpoint |
| :--- | :--- |
| **Consultar Pokémon por identificador** | `https://pokeapi.co/api/v2/pokemon/{id}` |
| **Consultar espécie e descrições** | `https://pokeapi.co/api/v2/pokemon-species/{id}` |

A consulta de espécie será necessária somente se a descrição da Pokédex
for aprovada para exibição nas cartas.

### 5.4. Seleção de imagem

A aplicação deverá escolher uma imagem consistente para todas as cartas,
priorizando uma ilustração oficial de boa qualidade disponibilizada pela
API, quando presente. Caso a imagem escolhida não esteja disponível,
deverá existir uma alternativa de fallback.

### 5.5. Tipo principal

A PokéAPI retorna os tipos associados ao Pokémon com a propriedade
`slot`.

-   O tipo com `slot: 1` deverá ser considerado o tipo principal.
-   O tipo com `slot: 2`, quando existente, deverá ser ignorado nas
    regras e na identidade visual da carta.
-   O tipo principal deverá ser normalizado para uso interno.

### 5.6. Tratamento de falhas

A aplicação deverá:

-   Tratar falhas de rede e respostas HTTP malsucedidas.
-   Apresentar uma mensagem compreensível caso não consiga carregar os
    dados.
-   Evitar iniciar uma partida com cartas sem os dados mínimos
    necessários.
-   Exibir um estado de carregamento durante a obtenção dos dados.
-   Não deixar a interface em estado inconsistente quando uma consulta
    falhar.

---

## 6. Tipos Pokémon e identidade visual

### 6.1. Tipos contemplados

A primeira geração possui 15 tipos no sistema de tipos original. A
aplicação deverá contemplar todos eles:

| Tipo (API) | Nome de exibição | Cor principal |
| :--- | :--- | :--- |
| `normal` | Normal | `#A8A878` |
| `fire` | Fire | `#F08030` |
| `water` | Water | `#6890F0` |
| `electric` | Electric | `#F8D030` |
| `grass` | Grass | `#78C850` |
| `ice` | Ice | `#98D8D8` |
| `fighting` | Fighting | `#C03028` |
| `poison` | Poison | `#A040A0` |
| `ground` | Ground | `#E0C068` |
| `flying` | Flying | `#A890F0` |
| `psychic` | Psychic | `#F85888` |
| `bug` | Bug | `#A8B820` |
| `rock` | Rock | `#B8A038` |
| `ghost` | Ghost | `#705898` |
| `dragon` | Dragon | `#7038F8` |

Os tipos Dark, Steel e Fairy não fazem parte do conjunto de tipos
original da primeira geração e não são necessários para o escopo
definido.

### 6.2. Aplicação das cores

-   Cada carta deverá apresentar uma identidade visual associada ao seu
    tipo principal.
-   A cor poderá ser aplicada à borda, faixa de identificação,
    cabeçalho, selo ou detalhes da carta.
-   A cor não deverá comprometer a legibilidade do nome, número ou
    demais informações.
-   O texto deverá manter contraste adequado com o fundo.
-   A cor deverá ser aplicada de maneira consistente em todas as
    ocorrências do mesmo tipo.

### 6.3. Tipos e regras

A cor visual do tipo não determina o resultado da batalha. O resultado
será calculado exclusivamente pela matriz de vantagens e desvantagens
definida para o jogo.

---

## 7. Requisitos funcionais

### RF-001 --- Tela inicial

A aplicação deverá apresentar uma tela inicial com o nome do jogo,
identidade visual Pokémon e uma ação para iniciar a partida.

**Critério de aceitação:** ao acessar a aplicação, o usuário deverá
visualizar a apresentação inicial e identificar como começar uma
partida.

### RF-002 --- Iniciar partida

O usuário deverá conseguir iniciar uma nova partida por meio de um botão
ou ação claramente identificada.

**Critério de aceitação:** ao iniciar, a aplicação deverá preparar os
dados necessários, distribuir as mãos e apresentar a interface de jogo.

### RF-003 --- Carregar Pokémon

A aplicação deverá obter os dados dos Pokémon elegíveis na PokéAPI.

**Critério de aceitação:** somente Pokémon de identificadores entre 1 e
151 poderão ser selecionados para compor as mãos.

### RF-004 --- Montar cartas

A aplicação deverá transformar os dados obtidos em cartas com estrutura
visual e dados padronizados.

**Critério de aceitação:** cada carta deverá apresentar, no mínimo,
imagem, nome, número da Pokédex e tipo principal.

### RF-005 --- Distribuir mãos

Cada participante deverá receber três cartas no início da partida.

**Critério de aceitação:** o jogador deverá visualizar três cartas
disponíveis e o computador deverá possuir três cartas ocultas.

### RF-006 --- Ocultar cartas do computador

As cartas do computador deverão permanecer viradas para baixo antes da
revelação da rodada.

**Critério de aceitação:** nome, imagem, número e tipo das cartas do
computador não poderão ser visualizados pelo jogador antes da revelação.

### RF-007 --- Selecionar carta

O jogador deverá conseguir selecionar uma carta disponível em sua mão.

**Critério de aceitação:** a seleção deverá receber destaque visual e
não deverá ser possível selecionar uma carta indisponível.

### RF-008 --- Escolha do computador

O computador deverá selecionar uma carta sem revelar previamente sua
identidade ao jogador.

**Critério de aceitação:** a escolha do computador deverá permanecer
oculta até o momento definido para a revelação.

### RF-009 --- Revelar cartas

Após a confirmação da jogada do jogador e a escolha do computador, a
aplicação deverá revelar ambas as cartas no campo de batalha.

**Critério de aceitação:** as duas cartas deverão ser exibidas
simultaneamente ou por meio de uma sequência visual de revelação, sem
expor antecipadamente a escolha do computador.

### RF-010 --- Comparar tipos

A aplicação deverá comparar os tipos principais das duas cartas
utilizando a matriz de regras do jogo.

**Critério de aceitação:** o resultado deverá ser calculado pela lógica
central de regras, sem depender de comparações de texto ou cores da
interface.

### RF-011 --- Registrar resultado da rodada

A aplicação deverá identificar e apresentar vitória do jogador, vitória
do computador ou empate.

**Critério de aceitação:** o resultado deverá ser exibido de maneira
clara e o placar deverá refletir somente vitórias válidas.

### RF-012 --- Atualizar placar

A aplicação deverá manter a quantidade de vitórias de cada participante
durante a partida.

**Critério de aceitação:** cada vitória deverá incrementar apenas o
placar do respectivo vencedor. Empates não deverão conceder ponto.

### RF-013 --- Tratar empate

Em caso de empate, a aplicação deverá solicitar ou realizar a compra de
uma nova carta para substituir a carta empatada, conforme a regra final
de reposição.

**Critério de aceitação:** o empate não deverá conceder ponto a nenhum
participante. A partida deverá continuar após a reposição, sem deixar o
estado do jogo inconsistente.

**Observação:** a quantidade de cartas de reposição, a origem do novo
conjunto e o impacto do empate no limite de rodadas ainda precisam ser
formalmente definidos.

### RF-014 --- Encerrar partida

A partida deverá terminar quando um participante alcançar duas vitórias.

**Critério de aceitação:** ao alcançar duas vitórias, novas jogadas
deverão ser bloqueadas e o resultado final deverá ser apresentado.

### RF-015 --- Nova partida

O usuário deverá conseguir iniciar outra partida após o encerramento da
atual.

**Critério de aceitação:** o placar, as seleções, as cartas da partida
anterior e o histórico deverão ser reinicializados para a nova partida.

### RF-016 --- Histórico de rodadas

A interface deverá apresentar um histórico simples das rodadas já
concluídas, indicando as cartas utilizadas e o resultado.

**Critério de aceitação:** o histórico deverá ser atualizado após cada
rodada concluída e permanecer disponível até o encerramento ou reinício
da partida.

### RF-017 --- Estados da interface

A aplicação deverá representar visualmente os estados de carregamento,
partida pronta, carta selecionada, batalha em andamento, resultado da
rodada e partida encerrada.

**Critério de aceitação:** o usuário deverá conseguir identificar em
qual etapa do jogo está e qual ação é esperada.

---

## 8. Regras de negócio

### RN-001 --- Limite de Pokémon

Somente os 151 Pokémon da primeira geração poderão participar.

### RN-002 --- Tipo utilizado

Somente o tipo principal (`slot: 1`) será considerado na comparação.

### RN-003 --- Mão inicial

Cada participante começará com três cartas.

### RN-004 --- Escolha do jogador

O jogador deverá escolher uma carta disponível de sua mão para a rodada.

### RN-005 --- Escolha do computador

O computador deverá escolher uma carta de sua própria mão sem revelar
sua identidade antes da revelação.

### RN-006 --- Determinação do vencedor

O resultado deverá ser determinado por uma matriz de vantagens e
desvantagens entre os tipos.

### RN-007 --- Empate

Uma combinação sem vantagem definida para nenhum dos lados será tratada
como empate, conforme a matriz aprovada.

### RN-008 --- Pontuação

Somente vitórias em rodadas decisivas concederão pontos.

### RN-009 --- Condição de vitória da partida

O primeiro participante a alcançar duas vitórias será declarado vencedor
da partida.

### RN-010 --- Independência entre apresentação e regras

As regras deverão ser implementadas em módulo independente da interface,
permitindo testar os resultados sem renderizar componentes React.

---

## 9. Matriz de vantagens e desvantagens

A matriz de tipos é uma regra central do produto e deverá ser aprovada
antes da implementação definitiva do cálculo de resultados.

A proposta inicial de relações registrada durante a concepção do projeto
foi:

| Tipo | Vantagens propostas | Desvantagens propostas |
| :--- | :--- | :--- |
| **Grass** | Water, Rock | Fire, Ice |
| **Fire** | Grass, Ice | Water, Rock |
| **Water** | Fire, Rock | Electric, Grass |
| **Electric** | Water, Flying | Rock, Grass |
| **Rock** | Fire, Electric | Water, Grass |
| **Ice** | Grass, Flying | Fire, Rock |

Essa proposta contempla apenas seis tipos e ainda não é uma matriz
completa nem validada.

**Pendência obrigatória:** definir as relações de vitória, derrota e
empate para os 15 tipos listados na seção 6. A matriz final deverá ser
consistente, documentada e coberta por testes. Não se deve presumir que
as relações oficiais do jogo Pokémon serão utilizadas: o projeto prevê
regras próprias inspiradas em Jokenpô.

---

## 10. Requisitos de interface e experiência do usuário

### 10.1. Direção visual

A interface deverá utilizar uma identidade inspirada nos jogos clássicos
de Pokémon e na primeira geração.

Características esperadas:

-   Visual colorido, lúdico e nostálgico.
-   Referências a menus de batalha, Pokédex e jogos portáteis.
-   Elementos gráficos com contornos definidos.
-   Hierarquia visual clara.
-   Tipografia legível e compatível com a temática.
-   Aparência de jogo independente, evitando estética corporativa de
    dashboard.
-   Uso equilibrado das cores para não prejudicar a leitura.

### 10.2. Cabeçalho

O cabeçalho deverá conter:

-   Nome ou logotipo Pokémon Jokenpô.
-   Identificação da rodada ou etapa atual, quando aplicável.
-   Placar do jogador e do computador.
-   Indicação de que a partida é melhor de três.

### 10.3. Área do computador

A área do computador deverá:

-   Identificar o oponente como treinador rival ou CPU.
-   Apresentar três cartas viradas para baixo.
-   Utilizar um verso de carta inspirado no universo Pokémon,
    preferencialmente com referência à Pokébola.
-   Não expor dados das cartas antes da revelação.

### 10.4. Campo de batalha

A área central deverá:

-   Representar visualmente uma arena ou campo de batalha.
-   Reservar posições para a carta do jogador e a carta do computador.
-   Apresentar um elemento visual de confronto, como "VS".
-   Exibir o resultado da rodada.
-   Apresentar uma mensagem de orientação quando nenhuma batalha estiver
    em andamento.

### 10.5. Área do jogador

A área do jogador deverá:

-   Identificar o conjunto de cartas como "Seu time" ou equivalente.
-   Apresentar as três cartas disponíveis lado a lado em telas maiores.
-   Permitir a seleção de uma carta.
-   Destacar visualmente a carta selecionada.
-   Diferenciar cartas disponíveis, selecionadas e utilizadas.

### 10.6. Conteúdo das cartas

Cada carta deverá exibir:

1.  Imagem do Pokémon.
2.  Nome.
3.  Número da Pokédex.
4.  Tipo principal.
5.  Identidade visual correspondente ao tipo.

A descrição da Pokédex poderá ser incluída em uma versão posterior ou em
um detalhe expandido da carta. Não é requisito obrigatório do MVP.

### 10.7. Feedback visual

A interface deverá oferecer feedback para:

-   Seleção de carta.
-   Confirmação da jogada.
-   Revelação das cartas.
-   Vitória, derrota ou empate na rodada.
-   Vitória final ou derrota final.
-   Carregamento e falha ao obter dados.

Animações deverão ser breves e não poderão impedir a continuidade da
partida.

### 10.8. Responsividade

**Desktop:**
- Arena centralizada.
- Três cartas por jogador em uma linha.
- Campo de batalha com espaço suficiente para as duas cartas.

**Mobile:**
- Organização vertical.
- Cartas com dimensões adequadas à leitura e ao toque.
- Placar facilmente identificável.
- Ausência de rolagem horizontal.
- Área de batalha preservada e compreensível.

---

## 11. Requisitos não funcionais

### RNF-001 --- Usabilidade

A interface deverá ser intuitiva, com ações claramente identificadas e
instruções suficientes para que uma pessoa consiga iniciar e jogar uma
partida sem treinamento.

### RNF-002 --- Responsividade

A aplicação deverá funcionar em diferentes larguras de tela, incluindo
desktop, tablet e smartphone.

### RNF-003 --- Desempenho

A aplicação deverá evitar consultas desnecessárias à API, reutilizar
dados já carregados durante a sessão e apresentar estados de
carregamento adequados.

### RNF-004 --- Confiabilidade

Falhas na comunicação com a API não deverão causar travamentos ou
estados inválidos. A aplicação deverá informar o problema e permitir uma
nova tentativa quando aplicável.

### RNF-005 --- Manutenibilidade

O código deverá ser organizado em componentes e módulos com
responsabilidades claras. Regras de negócio não deverão ficar acopladas
à apresentação visual.

### RNF-006 --- Acessibilidade

A interface deverá:

-   Utilizar HTML semântico.
-   Disponibilizar nomes acessíveis para botões e controles.
-   Permitir navegação por teclado nas ações principais.
-   Não utilizar somente cores para comunicar vitória, derrota, empate
    ou tipo.
-   Manter contraste adequado entre texto e fundo.
-   Respeitar a preferência de redução de movimento do sistema quando
    houver animações.

### RNF-007 --- Compatibilidade

A aplicação deverá funcionar nas versões atuais dos principais
navegadores modernos, especialmente Chrome, Firefox, Edge e Safari.

### RNF-008 --- Segurança

A aplicação não deverá armazenar credenciais ou dados pessoais. Dados
externos recebidos da API deverão ser tratados como conteúdo, não como
código executável.

### RNF-009 --- Versionamento

O código-fonte deverá ser versionado com Git e hospedado em repositório
GitHub.

---

## 12. Estados e ciclo de vida da partida

A implementação deverá considerar, no mínimo, os seguintes estados
conceituais:

| Estado | Descrição |
| :--- | :--- |
| `initial` | Tela inicial, sem partida ativa |
| `loading` | Carregamento dos dados necessários |
| `ready` | Mãos distribuídas e aguardando seleção |
| `selected` | Jogador selecionou uma carta |
| `revealing` | Escolha do computador e revelação das cartas |
| `roundResult` | Resultado da rodada em exibição |
| `drawReplacement` | Reposição de cartas após empate |
| `finished` | Partida encerrada |

As transições entre estados deverão ser controladas para impedir ações
fora de ordem, como selecionar cartas durante a revelação ou continuar
jogando após o encerramento.

---

## 13. Modelo de dados conceitual

### 13.1. Pokémon

``` js
{
  id: 1,
  name: "bulbasaur",
  image: "URL_DA_IMAGEM",
  types: ["grass", "poison"],
  primaryType: "grass"
}
```

### 13.2. Carta

``` js
{
  pokemonId: 1,
  name: "bulbasaur",
  image: "URL_DA_IMAGEM",
  pokedexNumber: 1,
  type: "grass",
  status: "available"
}
```

### 13.3. Estado da partida

Modelo conceitual, sujeito a ajustes durante a implementação:

``` js
{
  status: "ready",
  playerHand: [],
  computerHand: [],
  selectedCardId: null,
  playerScore: 0,
  computerScore: 0,
  roundHistory: [],
  currentRound: 1,
  winner: null
}
```

Os exemplos são ilustrativos e não representam código final obrigatório.

---

## 14. Estratégia de testes

### 14.1. Testes de integração com API

-   Verificar se os Pokémon retornados pertencem ao intervalo de IDs de
    1 a 151.
-   Verificar se os dados são convertidos para o modelo interno.
-   Verificar se o tipo principal é extraído corretamente.
-   Verificar o tratamento de respostas inválidas e falhas de rede.
-   Verificar a existência de imagem ou fallback.

### 14.2. Testes das regras

-   Testar cada relação de vitória definida na matriz.
-   Testar cada relação de derrota.
-   Testar empates.
-   Testar que o resultado não depende da cor ou do nome exibido na
    carta.
-   Testar que empates não alteram o placar.
-   Testar que a partida termina ao alcançar duas vitórias.

### 14.3. Testes da interface

-   Verificar a tela inicial.
-   Verificar a distribuição de três cartas para cada participante.
-   Verificar o ocultamento das cartas do computador.
-   Verificar a seleção e o destaque da carta do jogador.
-   Verificar a revelação das cartas.
-   Verificar a atualização do placar e do histórico.
-   Verificar o reinício da partida.
-   Verificar os principais tamanhos de tela.

---

## 15. Critérios de aceite do MVP

O MVP será considerado concluído quando:

1.  A aplicação puder ser iniciada localmente e compilada para produção.
2.  A tela inicial apresentar a identidade visual do jogo.
3.  Uma partida puder ser iniciada.
4.  Somente Pokémon de IDs 1 a 151 forem utilizados.
5.  As cartas apresentarem imagem, nome, número e tipo principal.
6.  Cada jogador possuir três cartas no início.
7.  As cartas do computador permanecerem ocultas antes da revelação.
8.  O jogador puder selecionar uma carta disponível.
9.  O computador realizar sua escolha sem revelá-la antecipadamente.
10. As cartas forem reveladas e comparadas pela matriz de regras
    aprovada.
11. O resultado e o placar forem apresentados corretamente.
12. O empate for tratado conforme a regra de reposição aprovada.
13. O primeiro participante a alcançar duas vitórias vencer a partida.
14. O usuário puder iniciar uma nova partida.
15. Os estados de carregamento e erro forem tratados.
16. A interface funcionar em desktop e dispositivos móveis.
17. As regras centrais puderem ser testadas independentemente dos
    componentes visuais.

---

## 16. Pendências e decisões necessárias

Os itens abaixo precisam ser resolvidos antes de considerar as regras de
negócio fechadas.

| ID | Questão | Situação |
| :--- | :--- | :--- |
| **PD-001** | Aprovar a matriz de vantagens e desvantagens dos 15 tipos | Pendente |
| **PD-002** | Definir se uma carta utilizada em vitória é descartada | Pendente |
| **PD-003** | Definir se as cartas não utilizadas permanecem na mão na rodada seguinte | Pendente |
| **PD-004** | Definir de onde vêm as cartas de reposição após empate | Pendente |
| **PD-005** | Definir se o empate pode gerar reposições ilimitadas ou se haverá limite | Pendente |
| **PD-006** | Definir se o empate consome uma rodada decisiva | Proposta: não consumir |
| **PD-007** | Definir se a descrição da Pokédex aparecerá na carta ou em detalhe expandido | Opcional para o MVP |
| **PD-008** | Definir se o computador escolherá aleatoriamente ou usará estratégia | Proposta atual: escolha oculta; estratégia ainda não especificada |
| **PD-009** | Definir a imagem padrão e o fallback para cartas | Pendente |

### 16.1. Propostas de decisão para validação

Para manter o MVP simples, recomenda-se:

-   Manter três cartas na mão de cada participante.
-   Remover as cartas utilizadas após cada rodada decisiva.
-   Não conceder pontos em caso de empate.
-   Não contabilizar empates como rodadas decisivas.
-   Em caso de empate, substituir as cartas empatadas por novas cartas
    de um conjunto disponível.
-   Evitar que o mesmo Pokémon apareça simultaneamente nas mãos dos dois
    participantes, salvo decisão contrária.
-   Encerrar a partida assim que um participante alcançar duas vitórias.

Essas propostas deverão ser confirmadas antes de se tornarem regras
obrigatórias.

---

## 17. Evoluções possíveis

Após a conclusão do MVP, poderão ser avaliadas:

-   Efeitos sonoros e trilha opcional.
-   Animações mais elaboradas de batalha.
-   Descrições da Pokédex nas cartas.
-   Diferentes níveis de dificuldade do computador.
-   Histórico de partidas entre sessões.
-   Estatísticas de vitórias por tipo.
-   Modo de dois jogadores no mesmo dispositivo.
-   Sistema de seleção de Pokémon antes da partida.

Essas evoluções não deverão comprometer a entrega do escopo inicial.

---

## 18. Referências

-   PokéAPI: https://pokeapi.co/
-   Documentação PokéAPI v2: https://pokeapi.co/docs/v2
-   React: https://react.dev/
-   Vite: https://vite.dev/
-   ESLint: https://eslint.org/

---

**Fim do documento --- Pokémon Jokenpô \| ERS v1.0**

Este documento registra os requisitos conhecidos até o momento. As
pendências indicadas deverão ser validadas antes de orientar a
implementação definitiva das regras de jogo.
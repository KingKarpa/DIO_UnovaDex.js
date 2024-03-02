# UnovaDex

Esse projeto foi feito para cumprir o desafio final de Fundamentos de Front-End da DIO, durante o curso Desenvolvimento Frontend com Angular. <br>
O desafio consiste em fazer uma pokedex consumido os dados vindos da PokeAPI. Além de estilizar o projeto de acordo.

### [Teste UnovaDex](https://kingkarpa.github.io/DIO_UnovaDex.js/)

## Sobre a Aplicação
A ideia para realizar o desafio foi recriar a pokedex do jogo Pokemon que fez parte da minha infância, inspirando-me em seu design original. <br>
Com isso em mente, o objetivo desta aplicação é recriar a pokedex de Unova (Pokemon Black and White), usando a PokeAPI para adquirir os dados necessários e apenas JS para manipular e tratar estes dados.

### Estrutura da Aplicação

**Estrutura de Arquivos** <br>
 - index.html -> Principal e único arquivo html do projeto;
 - /assets/img/ -> Contém um ícone clássico do jogo Pokemon Black, usado como logo e favicon da página;
 - /assets/styles/ -> Contém todos os 4 arquivos css do projeto;
    - normalizeStyle.css -> padronização css básica do projeto nos diferentes navegadores;
    - indexStyle.css -> estiliza os principais Containers estáticos na página;
    - pokedexStyle.css -> estiliza todo conteúdo da section pokedex, responsável por conter a lista de pokemons;
    - pokemonPreviewStyle.css -> estiliza todo conteúdo da section pokemonPreview, responsável por conter as informações do pokemon atualmente selecionado;
    
 - /assets/script/ -> Contém todos os 3 arquivos js do projeto;
    - classModel.js -> define duas classes para modelo dos objetos criados no código;
    - pokeAPI.js -> define funções para guiar o fluxo de requisições e o tratamento de suas respostas;
    - main.js -> define funções para manipular o DOM e consumir os dados já tratados;

## :hammer_and_wrench: Construção
Essa aplicação foi construida na IDE **VSCode**, usando JavaScript puro.

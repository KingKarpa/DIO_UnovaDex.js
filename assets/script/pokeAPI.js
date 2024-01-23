// SCRIPT relacionado ao fluxo das requisições na PokeAPI e o tratamento das respostas

// CONSTANTES FUNDAMENTAIS
// Reúne as funções que serão chamadas fora deste arquivo
const pokeAPI = {};
// Reúne objetos de todos os pokemons requisitados e informações básicas de cada um (entry_number, nameNaPokedex, url's)
const pokedex = [];
// Usado para calcular o id national dos pokemons de Unova para buscar informações específicas. Diminuindo a quantidade de requisições necessárias
const unovaDexStartID = 494;

function convertToPokedexEntryModel(pokedexEntryAPI){
    const {entry_number, pokemon_species} = pokedexEntryAPI;
    const {name, url} = pokemon_species;

    const entry = entry_number.toString().padStart(3, "0");

    const nationalID = unovaDexStartID + entry_number;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${nationalID}`;
    const pokemonIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${nationalID}.png`;

    const pokemon = new PokedexEntry();
    pokemon.entry = entry;
    pokemon.name = name;
    pokemon.speciesUrl = url;
    pokemon.pokemonUrl = pokemonUrl;
    pokemon.icon = pokemonIcon;

    pokedex.push(pokemon);

    return pokemon;
}

async function convertToPokemonModel(pokemonInfoAPI, entry, pokedexEntry){
    const {id, height, weight, sprites} = pokemonInfoAPI;
    const {name} = pokedexEntry;
    const types = pokemonInfoAPI.types.map(typeSlot => typeSlot.type.name);
    const photosAPI = sprites.other["official-artwork"];

    const stats = pokemonInfoAPI.stats.map(stat => stat.base_stat);
    const [hp, attack, defense, special_attack, special_defense, speed] = stats;

    const speciesInfo = await getSpeciesInfoAPI(pokedexEntry);

    let rarity;
    if (speciesInfo.is_legendary) rarity = "js-isLegendary";
    else if (speciesInfo.is_mythical) rarity =  "js-isMythical";
    else rarity = "js-isCommon";

    const pokemonInfo = new PokemonInfo();
    pokemonInfo.id = id;
    pokemonInfo.entry = entry.toString().padStart(3, "0");
    pokemonInfo.name = name;
    pokemonInfo.height = height / 10;
    pokemonInfo.weight = weight / 10;

    pokemonInfo.types = types;
    pokemonInfo.photo = photosAPI.front_default;
    pokemonInfo.photoShiny = photosAPI.front_shiny;
    pokemonInfo.stats = {hp, attack, defense, special_attack, special_defense, speed};

    pokemonInfo.category = speciesInfo.genera[7].genus;
    pokemonInfo.rarity = rarity;

    return pokemonInfo;
}

function getSpeciesInfoAPI (pokedexEntry) {
    return fetch(pokedexEntry.speciesUrl)
        .then(res => res.json())
        .then(speciesInfo => speciesInfo)
        .catch(error => console.log("Erro na função getSpeciesInfoAPI, confira o erro \n" + error))
}

pokeAPI.getPokedexInfoAPI = () => {
    const url = "https://pokeapi.co/api/v2/pokedex/original-unova";

    return fetch(url)
        .then(res => res.json())
        .then(pokedexBody => pokedexBody.pokemon_entries)
        .then(pokedexInfoAPI => pokedexInfoAPI.map(convertToPokedexEntryModel))
        .then(pokedex => pokedex)
        .catch(error => console.log("Erro na função getPokedexInfoAPI, confira o erro \n" + error))
}

pokeAPI.getPokemonInfoAPI = (entry) => {
    const pokedexEntry = pokedex[entry];

    return fetch(pokedexEntry.pokemonUrl)
        .then(res => res.json())
        .then(pokemonInfoAPI => convertToPokemonModel(pokemonInfoAPI, entry, pokedexEntry))
        .then(pokemonInfo => pokemonInfo)
        .catch(error => console.log("Erro na função getPokemonInfoAPI, confira o erro \n" + error))
}
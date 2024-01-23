// SCRIPT relacionado a definição de classes para modelo dos objetos criados no código

class PokemonInfo {
    id;
    entry;
    name;
    category;
    rarity;
    heigth;
    weight;
    types = [];
    photo; /* sprites > other > official-artwork > front-default */
    photoShiny; /* sprites > other > official-artwork > front-shiny  */
    stats = {
        // hp,
        // attack,
        // defense,
        // special_attack,
        // special_defense,
        // speed
    }
}

class PokedexEntry {
    entry;
    name;
    speciesUrl;
    pokemonUrl;
    icon;
}

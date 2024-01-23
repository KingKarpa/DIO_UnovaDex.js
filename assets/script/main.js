// SCRIPT relacionado a manipulação do DOM e consumo de dados

const pokedexList = document.querySelector(".js-pokedexList");
const pokemonPreview = document.querySelector(".js-pokemonPreview");

loadPokedex();
// loadPokemonPreview();

function loadPokedex(){
    pokeAPI.getPokedexInfoAPI()
        .then((pokedex = []) => {
            const newHTML = pokedex.map(convertPokedexEntryToLi).join('');
            pokedexList.innerHTML += newHTML;
        })
        .then(() => {
            const pokemonItems = document.querySelectorAll(".js-pokemonItem");
            pokemonItems.forEach(pokemonItem => {
                pokemonItem.addEventListener('click', (e) => changeSelectedPokemon(e.currentTarget))
            })
        })
        .then(() => loadPokemonPreview())
        .catch((error) => console.log("Erro na função loadPokedex, confira o erro \n" + error))
}

function loadPokemonPreview(pokemonItem = null, lastSelected){
    !pokemonItem ? pokemonItem = document.querySelector(".isSelected") : {};

    pokeAPI.getPokemonInfoAPI(pokemonItem.id)
        .then(pokemonInfo => {
            const newHTML = convertPokemonInfoToPreview(pokemonInfo);
            pokemonPreview.innerHTML = newHTML;
        })
        .then(() => {
            const previewPhotos = document.querySelectorAll(".js-photoPreview");
            previewPhotos.forEach((photo) => {
                photo.addEventListener('click', (e) => changePhoto(e.currentTarget, previewPhotos))
            })
        })
        .catch(error => {
            changeSelectedPokemon(lastSelected);
            console.log("Erro na função loadPokemonPreview, confira o erro \n" + error);
        })
}

function changeSelectedPokemon(pokemonItemTarget){
    const currentSelected = document.querySelector(".isSelected");

    if (pokemonItemTarget === currentSelected) return;

    currentSelected.classList.remove("isSelected");
    pokemonItemTarget.classList.add("isSelected");

    loadPokemonPreview(pokemonItemTarget, currentSelected);
}

function changePhoto(photoTarget, photos){
    const photosArray = Array.from(photos);
    const [hiddenPhoto] = photosArray.filter(photo => photo.id !== photoTarget.id);
    photoTarget.style.display = "none";
    hiddenPhoto.style.display = "block";
}

function convertPokedexEntryToLi(pokedexEntry, index){
    return `
        <li class="pokemonItem js-pokemonItem ${index == 0 ? "isSelected" : ""}" id="${index}">
            <div class="OnlyStyle pokemonItem-iconContainer">
                <span class="OnlyStyle pokemonIcon-border left"></span>
                <img draggable="false" src="${pokedexEntry.icon}" alt="Ícone do ${pokedexEntry.name}" class="pokemonItem-icon">
                <span class="OnlyStyle pokemonIcon-border right"></span>
            </div>
            <div class="pokemonItem-identity">
                <p>${pokedexEntry.entry} - &nbsp;${pokedexEntry.name}</p>
            </div>
        </li>
    `
}

function convertPokemonInfoToPreview(pokemonInfo){
    return `
        <div class="OnlyStyle pokemonPreview-topBg">
            <div class="OnlyStyle pokemonPreview-infoContainer">
                <img draggable="false" src="${pokemonInfo.photo}" alt="Imagem do ${pokemonInfo.name}" class="pokemonPreview-photo js-photoPreview" id="photoDefault">
                <img draggable="false" src="${pokemonInfo.photoShiny}" alt="Imagem do ${pokemonInfo.name} shiny" class="pokemonPreview-photoShiny js-photoPreview" id="photoShiny">
                <div class="OnlyStyle infoContainer-identityContainer">
                    <section class="info__identity">
                        <h2>${pokemonInfo.entry} - &nbsp;${pokemonInfo.name}</h2>
                    </section>
                    <section class="info__category ${pokemonInfo.rarity}">
                        <h3>${pokemonInfo.category}</h3>
                    </section>
                </div>
            </div>
        </div>
        <div class="OnlyStyle pokemonPreview-lowBg">
            <div class="OnlyStyle pokemonPreview-infoContainer">
                <section class="info__type infoSection">
                    <p class="info-title">Type</p>
                    <div>
                        ${pokemonInfo.types.map((type) => `<div class="types ${type}">${type}</div>`).join("")}
                    </div>
                </section>

                <section class="info__id infoSection">
                    <p class="info-title">National Dex</p>
                    <p>#${pokemonInfo.id}</p>
                </section>

                <section class="info__measures infoSection">
                    <div>
                        <p class="info-title">Height</p>
                        <p>${pokemonInfo.height}m</p>
                    </div>
                    <div>
                        <p class="info-title">Weight</p>
                        <p>${pokemonInfo.weight}kg</p>
                    </div>
                </section>

                <section class="info__stats infoSection">
                    <p class="info-title">Base Stats</p>
                    <div>
                        <p><span>HP:</span> ${pokemonInfo.stats.hp}</p>
                        <p><span>Attack:</span> ${pokemonInfo.stats.attack}</p>
                        <p><span>Defense:</span> ${pokemonInfo.stats.defense}</p>
                        <p><span>Special Attack:</span> ${pokemonInfo.stats.special_attack}</p>
                        <p><span>Special Defense:</span> ${pokemonInfo.stats.special_defense}</p>
                        <p><span>Speed:</span> ${pokemonInfo.stats.speed}</p>
                    </div>
                </section>
            </div>
        </div>
    `
}
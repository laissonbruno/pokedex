function convertPokemonType(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}


function convertToHtml(pokemon) {
    return `
     <li class="pokemon">
                <span class="numero">#${pokemon.order}</span>
                <span class="nome">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${convertPokemonType(pokemon.types).join('')}
                    </ol>

                    <img src="${pokemon.sprites.other.dream_world.front_default}"
                        alt="${pokemon.name}">
                </div>

            </li>
    `
}

const pokemonList = document.getElementById('pokemonList')

PokeApi.getPokemons().then((pokemons = []) => {
    
    pokemonList.innerHTML += pokemons.map(convertToHtml).join('')

})

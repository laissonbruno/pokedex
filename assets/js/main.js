const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10;
const primeiraGeracao = 151;
let offset = 0;


function loadPokemons(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="numero">#${pokemon.number}</span>
            <span class="nome">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.imagem}"
                    alt="${pokemon.name}">
            </div>

        </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdPage = offset + limit

    if (qtdPage >= primeiraGeracao) {
        const newLimit = primeiraGeracao - offset
        loadPokemons(offset, newLimit)
    
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemons(offset, limit)
    }    
    
})
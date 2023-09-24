const PokeApi = {}

function convertApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = types
    pokemon.type = type
    pokemon.imagem = pokeDetail.sprites.other.dream_world.front_default;
    
    return pokemon
}


PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertApiToPokemon)
}



PokeApi.getPokemons = (offset = 0, limit = 20) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}



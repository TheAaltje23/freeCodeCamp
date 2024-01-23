// DOM ELEMENTS
const searchForm = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const typeContainer = document.getElementById('types');

// POKEMON DATA ELEMENTS
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonImage = document.getElementById('sprite');
const pokemonTypes = document.getElementById('types');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpAttack = document.getElementById('special-attack');
const pokemonSpDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');

const fetchData = async () => {
    const pokemon = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputFormat(searchInput.value)}`;
    try {
        const response = await fetch(pokemon);
        const data = await response.json();
        renderData(data);
    } catch (err) {
        alert('Pokémon not found');
    };
};

const checkInput = () => {
    if (searchInput.value) {
        fetchData();
        searchInput.value = '';
    };
};

const inputFormat = (input) => {
    const regex = /[A-Za-z0-9-]/g;
    const matches = input.split(' ').join('-').match(regex);
    const formatted = matches ? matches.join('').toLowerCase() : null;
    return formatted;
};

const renderData = (data) => {
    const { name, id, weight, height, sprites, types, stats } = data;
    pokemonName.textContent = name;
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonImage.src = sprites.front_default;
    pokemonImage.alt = `image of ${name}`;
    typeContainer.innerHTML = '';
    types.forEach((item) => {
        const span = document.createElement('span');
        span.classList.add('types', `${item.type.name}`);
        span.textContent = `${item.type.name}`;
        typeContainer.append(span);
    });
    pokemonHp.textContent = stats[0].base_stat;
    pokemonAttack.textContent = stats[1].base_stat;
    pokemonDefense.textContent = stats[2].base_stat;
    pokemonSpAttack.textContent = stats[3].base_stat;
    pokemonSpDefense.textContent = stats[4].base_stat;
    pokemonSpeed.textContent = stats[5].base_stat;
};

// EVENT LISTENERS
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInput();
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkInput();
    };
});
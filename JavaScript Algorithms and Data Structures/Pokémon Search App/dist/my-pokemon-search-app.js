"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchForm = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const typeContainer = document.getElementById('types');
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
;
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const pokemon = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputFormat(searchInput.value)}`;
    try {
        const response = yield fetch(pokemon);
        const data = yield response.json();
        renderData(data);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err);
            alert('Pokémon not found');
        }
        else {
            alert('Pokémon not found');
        }
        ;
    }
    ;
});
const checkInput = () => {
    if (searchInput.value) {
        fetchData();
        searchInput.value = '';
    }
    ;
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
    pokemonHp.textContent = String(stats[0].base_stat);
    pokemonAttack.textContent = String(stats[1].base_stat);
    pokemonDefense.textContent = String(stats[2].base_stat);
    pokemonSpAttack.textContent = String(stats[3].base_stat);
    pokemonSpDefense.textContent = String(stats[4].base_stat);
    pokemonSpeed.textContent = String(stats[5].base_stat);
};
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInput();
});
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkInput();
    }
    ;
});
//# sourceMappingURL=my-pokemon-search-app.js.map
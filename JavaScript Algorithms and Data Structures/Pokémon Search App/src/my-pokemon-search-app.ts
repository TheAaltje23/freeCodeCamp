// DOM ELEMENTS
const searchForm: HTMLFormElement | null = document.getElementById('search-container') as HTMLFormElement;
const searchInput: HTMLInputElement | null = document.getElementById('search-input') as HTMLInputElement;
const searchBtn: HTMLButtonElement | null = document.getElementById('search-button') as HTMLButtonElement;
const typeContainer: HTMLDivElement | null = document.getElementById('types') as HTMLDivElement;

// POKEMON DATA ELEMENTS
const pokemonName: HTMLParagraphElement | null = document.getElementById('pokemon-name') as HTMLParagraphElement;
const pokemonId: HTMLParagraphElement | null = document.getElementById('pokemon-id') as HTMLParagraphElement;
const pokemonWeight: HTMLParagraphElement | null = document.getElementById('weight') as HTMLParagraphElement;
const pokemonHeight: HTMLParagraphElement | null = document.getElementById('height') as HTMLParagraphElement;
const pokemonImage: HTMLImageElement | null = document.getElementById('sprite') as HTMLImageElement;
const pokemonTypes: HTMLDivElement | null = document.getElementById('types') as HTMLDivElement;
const pokemonHp: HTMLSpanElement | null = document.getElementById('hp') as HTMLSpanElement;
const pokemonAttack: HTMLSpanElement | null = document.getElementById('attack') as HTMLSpanElement;
const pokemonDefense: HTMLSpanElement | null = document.getElementById('defense') as HTMLSpanElement;
const pokemonSpAttack: HTMLSpanElement | null = document.getElementById('special-attack') as HTMLSpanElement;
const pokemonSpDefense: HTMLSpanElement | null = document.getElementById('special-defense') as HTMLSpanElement;
const pokemonSpeed: HTMLSpanElement | null = document.getElementById('speed') as HTMLSpanElement;

interface PokemonDataSubset {
    name: string;
    id: number;
    weight: number;
    height: number;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number
    }[];
};

const fetchData = async (): Promise<void> => {
    const pokemon: string = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputFormat(searchInput.value)}`;
    try {
        const response: Response = await fetch(pokemon);
        const data: PokemonDataSubset = await response.json();
        renderData(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err);
            alert('Pokémon not found');
        } else {
            alert('Pokémon not found');
        };
    };
};

const checkInput = (): void => {
    if (searchInput.value) {
        fetchData();
        searchInput.value = '';
    };
};

const inputFormat = (input: string): string | null => {
    const regex: RegExp = /[A-Za-z0-9-]/g;
    const matches: RegExpMatchArray | null = input.split(' ').join('-').match(regex);
    const formatted: string | null = matches ? matches.join('').toLowerCase() : null;
    return formatted;
};

const renderData = (data: PokemonDataSubset): void => {
    const { name, id, weight, height, sprites, types, stats } = data;
    pokemonName.textContent = name;
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonImage.src = sprites.front_default;
    pokemonImage.alt = `image of ${name}`;
    typeContainer.innerHTML = '';
    types.forEach((item: { type: { name: string } }) => {
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
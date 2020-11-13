const container: HTMLElement | null = document.getElementById("app");

if (!container) throw Error("Container not found.");

// Constants ===================================================================
const NUM_OF_POKEMONS: number = 100;
const POKEMON_API: string = 'https://pokeapi.co/api/v2/pokemon/';
// END Constants ===============================================================

// Interfaces ==================================================================
interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

interface IPoketypeResponse {
  slot: number;
  type: {
      name: string;
      url: string;
  };
}

interface IPokemonResponse {
  id: number;
  name: string,
  types: [IPoketypeResponse];
  sprites: {
    front_default: string;
  };
}

interface ITransformedPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}
// END Interfaces ==============================================================

const showPokemon = (transformedPokemon: ITransformedPokemon): void => {
  let pokemonHTMLCard: string = `
    <div class="card">
      <span class="card--id">#${transformedPokemon.id}</span>
      <img class="card--image" src=${transformedPokemon.image} alt=${transformedPokemon.name} />
      <h1 class="card--name">${transformedPokemon.name}</h1>
      <span class="card--details">${transformedPokemon.type}</span>
    </div>
  `;

  container.innerHTML += pokemonHTMLCard;
};

const getPokemon = async (id: number): Promise<void> => {
  const response: Response = await fetch(`${POKEMON_API}${id}`);
  const pokemon: IPokemonResponse = await response.json();
  const pokemonType: string = pokemon.types
    .map((pokeType: IPoketypeResponse) => pokeType.type.name)
    .join(', ');

  const transformedPokemon: ITransformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: pokemonType,
  }

  showPokemon(transformedPokemon);
};

const fetchPokemonData = (): void => {
  for (let pokemonNum = 1; pokemonNum < NUM_OF_POKEMONS; pokemonNum++) {
    getPokemon(pokemonNum);
  }
};

fetchPokemonData();
const container: HTMLElement | null = document.getElementById("app");

if (!container) throw Error("Container not found.");

// Constants ===================================================================
const NUM_OF_POKEMONS: number = 150;
const POKEMON_API: string = "https://pokeapi.co/api/v2/pokemon/";
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
  name: string;
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

const showPokemon = (fetchedPokemons: ITransformedPokemon[]): void => {
  for (let pokemon of fetchedPokemons) {
    container.innerHTML += `
      <div class="card">
        <span span class="card--id">#${pokemon.id}</span>
        <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
        <h1 class="card--name">${pokemon.name}</h1>
        <span class="card--details">${pokemon.type}</span>
      </div> 
    `;
  }
};

const getPokemon = async (id: number): Promise<ITransformedPokemon> => {
  const response: Response = await fetch(`${POKEMON_API}${id}`);
  const pokemon: IPokemonResponse = await response.json();
  const pokemonType: string = pokemon.types
    .map((pokeType: IPoketypeResponse) => pokeType.type.name)
    .join(", ");

  const transformedPokemon: ITransformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: pokemonType,
  };

  return transformedPokemon;
};

const fetchPokemonData = async (): Promise<ITransformedPokemon[]> => {
  const allFetchedPokemon: Promise<ITransformedPokemon>[] = [];

  for (let pokemonNum = 1; pokemonNum <= NUM_OF_POKEMONS; pokemonNum++) {
    allFetchedPokemon.push(getPokemon(pokemonNum));
  }

  const results = await Promise.all(allFetchedPokemon);

  return results;
};

const start = async (): Promise<void> => {
  const listOfTransformedPokemonData = await fetchPokemonData();
  const sortedData = listOfTransformedPokemonData.sort((pokemon1, pokemon2) => {
    return pokemon1.id > pokemon2.id ? 1 : -1;
  });

  showPokemon(sortedData);
};

start();

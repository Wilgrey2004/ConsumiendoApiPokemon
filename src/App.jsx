import { useState, useEffect } from "react";
import "./index.css";
import PokemonCard from "./components/pokemonCard";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const URL_Base = "https://pokeapi.co/api/v2/pokemon/";

  const fetchPokemons = async (id) => {
    try {
      const response = await fetch(`${URL_Base}${id}`);
      const data = await response.json();

      // Agrega el nuevo Pokémon al estado existente
      setPokemonData((prevPokemonData) => [...prevPokemonData, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllsPokemons = () => {
    for (let i = 1; i <= 20; i++) {
      fetchPokemons(i);
    }
  };

  useEffect(() => {
    fetchAllsPokemons();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-screen w-screen bg-slate-400">
        <h1 className="col-span-2 md:col-span-4 text-center text-4xl">
          Lista De <span className="text-yellow-400 font-bold">Pokemons</span>{" "}
        </h1>
        <div
          className="grid grid-cols-2 md:grid-cols-4
                        gap-7 w-screen border border-transparent 
                        shadow-2xl shadow-slate-200 rounded-3xl p-4 bg-slate-200"
        >
          {pokemonData.map((pokemon) => (
            <PokemonCard pokemonData={pokemon} key={pokemon.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

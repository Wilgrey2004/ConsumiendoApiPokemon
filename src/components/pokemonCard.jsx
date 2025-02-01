import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const PokemonCard = ({ pokemonData }) => {
  
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

  // Obtener todos los sprites disponibles
  const allSprites = pokemonData
    ? [
        pokemonData.sprites.front_default,
        pokemonData.sprites.back_default,
      ].filter(Boolean)
    : []; // Filtramos sprites nulos

  // Efecto para rotar sprites
  useEffect(() => {
    if (allSprites.length > 1) {
      const interval = setInterval(() => {
        setCurrentSpriteIndex((prev) => (prev + 1) % allSprites.length);
      }, 2000); // Cambia cada 2 segundos

      return () => clearInterval(interval);
    }
  }, [allSprites.length]);

  if (!pokemonData) {
    return (
      <h1 className="text-red-600">
        Cargando <span className="text-yellow-400 font-bold">....</span>
      </h1>
    );
  }

  return (
    <div
      className="border bg-slate-700 rounded-4xl shadow-xl 
      shadow-slate-500 border-transparent flex
      flex-col justify-center items-center relative
      hover:scale-105 transition-transform duration-300"
    >
      <div className="w-32 h-32 relative">
        {allSprites.map((sprite, index) => (
          <img
            key={index}
            className={`w-full h-full absolute transition-opacity duration-500 ${
              index === currentSpriteIndex ? "opacity-100" : "opacity-0"
            }`}
            src={sprite}
            alt={`Sprite de ${pokemonData.name}`}
          />
        ))}
      </div>

      <div className="flex gap-2 items-center p-2">
        <h5 className="text-red-600">
          ID:{" "}
          <span className="text-yellow-400 font-bold">{pokemonData.id}</span>
        </h5>
        <h4 className="text-red-600 ">
          Nombre:{"    "}
          <span className="text-yellow-400 font-bold">{pokemonData.name}</span>
        </h4>
      </div>
    </div>
  );
};

export default PokemonCard;

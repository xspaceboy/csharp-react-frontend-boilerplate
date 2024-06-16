import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../../table";

export default function Details() {
  const { id } = useParams();

  const [pokemon, setPokemonData] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5042/api/pokemons/${id}`,
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  return (
    <div className="px-[30px] py-4">
      <h1 className="text-xl font-semibold">Pokemon Details</h1>
      {pokemon && (
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mr-4 h-32 w-32"
            />
            <div>
              <h1 className="text-3xl font-bold">{pokemon.name}</h1>
              <p className="text-gray-600">#{pokemon.number}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Details</h2>
            <p>
              <strong>Generation:</strong> {pokemon.generation}
            </p>
            <p>
              <strong>Height:</strong> {pokemon.height} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight} kg
            </p>
            <p>
              <strong>Types:</strong> {pokemon.types.join(", ")}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Stats</h2>
            <ul>
              {pokemon.stats.map((stat, index) => (
                <li key={index} className="flex justify-between">
                  <span>{stat.name}:</span>
                  <span>{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Moves</h2>
            <ul>
              {pokemon.moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Abilities</h2>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Evolution</h2>
            <p>
              <strong>From:</strong> {pokemon.evolution.from}
            </p>
            <p>
              <strong>To:</strong> {pokemon.evolution.to.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

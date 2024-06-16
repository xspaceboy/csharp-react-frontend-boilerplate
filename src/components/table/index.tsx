import React, { useState, useEffect } from "react";
// import MockData from "../../data/pokemon.json";

export interface Pokemon {
  number: number;
  name: string;
  generation: string;
  height: number;
  weight: number;
  types: string[];
  stats: {
    name: string;
    value: number;
  }[];
  moves: string[];
  abilities: string[];
  evolution: {
    from: string;
    to: string[];
  };
  image: string;
}

const DataTable: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage: number = 25;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("http://localhost:5042/api/pokemons");
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  const indexOfLastRow: number = currentPage * rowsPerPage;
  const indexOfFirstRow: number = indexOfLastRow - rowsPerPage;
  const currentRows: Pokemon[] = pokemonData.slice(
    indexOfFirstRow,
    indexOfLastRow,
  );

  const totalPages = Math.ceil(pokemonData.length / rowsPerPage);
  const maxPagesToShow = 5;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  const startPage = Math.max(1, currentPage - halfMaxPages);
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="bg-gray-50 px-6 py-3">Number</th>
            <th className="bg-gray-50 px-6 py-3">Name</th>
            <th className="bg-gray-50 px-6 py-3">Generation</th>
            <th className="bg-gray-50 px-6 py-3">Height</th>
            <th className="bg-gray-50 px-6 py-3">Weight</th>
            <th className="bg-gray-50 px-6 py-3">Types</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((pokemon) => (
            <tr key={pokemon.number} className="bg-white">
              <td className="px-6 py-4">{pokemon.number}</td>
              <td className="px-6 py-4">
                <a href={`/pokemon/${pokemon.number}`}>{pokemon.name}</a>
              </td>
              <td className="px-6 py-4">{pokemon.generation}</td>
              <td className="px-6 py-4">{pokemon.height}</td>
              <td className="px-6 py-4">{pokemon.weight}</td>
              <td className="px-6 py-4">{pokemon.types.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          className="mx-2 bg-gray-200 p-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              className={`mx-2 p-2 ${
                currentPage === pageNumber
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="mx-2 bg-gray-200 p-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(pokemonData.length / rowsPerPage)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DataTable;

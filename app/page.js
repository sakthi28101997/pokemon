"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
import { usePokemon } from "@/context/PokemonContext"; // Ensure correct path
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // User input
  const [searchQuery, setSearchQuery] = useState(""); // Applied search on button click
  const [selectedType, setSelectedType] = useState("all");
  const { pokemon, loading, error } = usePokemon();

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" ||
      p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const types = [
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const handleSearch = () => {
    setSearchQuery(searchTerm); // Update searchQuery only on button click
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-8 p-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] bg-white text-[#374957] py-6 px-4 outline-none focus:ring-0 focus-visible:outline-none">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="text-[16px] font-medium outline-none bg-white w-full">
              {types.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="w-full p-1 text-gray-300"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1 max-w-sm flex items-center bg-white pl-2 rounded-[8px] shadow-md">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none flex-1 px-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-900 text-primary-foreground rounded-r-[8px] cursor-pointer p-4"
            >
              Search
            </button>
          </div>
        </div>

        {/* Pokemon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPokemon.length == 0 ? (
            <div className="flex justify-center items-center ">
              No Data Found
            </div>
          ) : (
            <>
              {filteredPokemon.map((poke) => (
                <Card
                  key={poke.id}
                  className="overflow-hidden transition-shadow bg-[#ffffffc5]"
                >
                  <div className="aspect-square relative bg-white p-4">
                    <img
                      src={poke.sprites.other["official-artwork"].front_default}
                      alt={poke.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 p-3">
                      <h2 className="text-2xl font-bold capitalize">
                        {poke.name}
                      </h2>
                      <Link
                        href={`/${poke.id}`}
                        className="flex items-center mt-10 text-blue-300 text-[14px]"
                      >
                        Details <ArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

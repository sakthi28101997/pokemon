"use client"
import { useContext, useEffect, useState } from "react";
import { usePokemon } from "@/context/PokemonContext"; // Make sure path is correct
import { CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Heart, Shield, Swords, Zap } from "lucide-react";
import Link from "next/link";

const Page = ({params} ) => {
  const { id } = params;
   const { pokemon, loading, error } = usePokemon();

  const [poke, setPoke] = useState(null);

  useEffect(() => {
    if (pokemon.length) {
      const foundPokemon = pokemon.find((p) => p.id == id);
      setPoke(foundPokemon);
    }
  }, [pokemon, id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!poke) return <div className="text-center">Pokémon not found</div>;
  const getStatIcon = (statName) => {
    switch (statName) {
      case 'hp':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'attack':
        return <Swords className="h-4 w-4 text-orange-500" />;
      case 'defense':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'speed':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-600',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-blue-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-600',
      dragon: 'bg-purple-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-400'
    };
    return `${colors[type] || 'bg-gray-400'} text-white`;
  };

  return (
    <div className="min-h-screen">
    <div className="flex items-center p-6">
        <Link href="/" className="text-red-500 flex items-center">  Home</Link> &nbsp;/&nbsp;<span className="capitalize"> {poke.name} </span>
    </div>
    <div className="flex justify-center items-center ">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <img
          src={poke.sprites.other["official-artwork"].front_default}
          alt={poke.name}
          className="w-48 mx-auto"
        />
        <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold capitalize">{poke.name}</h2>
                  <span className="text-sm text-muted-foreground">#{poke.id.toString().padStart(3, '0')}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  {poke.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(type.type.name)}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {poke.stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {getStatIcon(stat.stat.name)}
                      <span className="text-sm font-medium capitalize">
                        {stat.stat.name}: {stat.base_stat}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
      </div>
    </div>
    </div>
  );
};

export default Page;

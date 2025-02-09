"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  type Character = {
    name: string;
    image: string;
  };

  const characters: Character[] = [
    {
      name: "Edward Elric",
      image:
        "https://static.wikia.nocookie.net/fma/images/0/08/213254_1407532169190_full.png",
    },
    {
      name: "Alphonse Elric",
      image: "https://static.wikia.nocookie.net/fma/images/c/c3/AlManga.png",
    },
    {
      name: "Roy Mustang",
      image: "https://static.wikia.nocookie.net/fma/images/b/bb/Avatar_roy.png",
    },
  ];

  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Character[]>(
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };
  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    setFilteredSuggestions([]);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-auto">
      <div className="w-[25%] h-auto text-center m-10">
        <img alt="fmab_logo" src="/assets/fmab_logo.webp" />
        <h1 className="text-[var(--red)] font-outline text-[2.5vw] font-bold font-poppins">
          WORDLE
        </h1>
      </div>
      <div className="border-[0.2vw] w-[25%] text-wrap text-center font-bold bg-[var(--background)] rounded-[0.6vw]">
        <div className="m-[0.5vw]">
          <h1 className="text-[1vw]">
            Guess today's Fullmetal Alchemist: Brotherhood character!
          </h1>
          <div className="flex items-center justify-center">
            <input
              id="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              className="focus:outline-none focus:ring-0 bg-[var(--gray)] w-[75%] m-[1vw] border-[0.2vw] rounded-[0.4vw] border-[var(--red)] text-[0.8vw] p-[0.4vw] font-bold text-black"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3vw"
              height="3vw"
              fill="#c51117"
              viewBox="0 0 256 256"
              className="cursor-pointer"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm29.66,109.66-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,157.66,133.66Z"></path>
            </svg>
          </div>
          {filteredSuggestions.length > 0 && (
            <ul
              id="suggestions"
              className="absolute top-[calc(9%+20vw)] left-[39.7vw] w-[17.5vw] text-[0.9vw] bg-white border rounded-md shadow-md max-h-60 overflow-auto"
            >
              {filteredSuggestions.map((character) => (
                <li
                  key={character.name}
                  className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(character.name)}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-[2.5vw] h-[2.5vw] border-[0.2vw] border-[var(--red)] rounded-full mr-2"
                  />
                  <h1 className="text-black font-bold">{character.name}</h1>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center m-[3vh]">
        <div className=" flex flex-col m-[1vh]">
          <div className=" flex text-[1.5vw] font-bold gap-[2vw] text-center">
            <h1 className="w-[8.5vw]">Characters: </h1>
            <h1 className="w-[8.5vw]">Species: </h1>
            <h1 className="w-[8.5vw]">Gender: </h1>
            <h1 className="w-[8.5vw]">Age: </h1>
            <h1 className="w-[8.5vw]">Nationality: </h1>
            <h1 className="w-[8.5vw]">Debut: </h1>
            <h1 className="w-[8.5vw]">Affiliations: </h1>
            <h1 className="w-[8.5vw]">Abilities: </h1>
          </div>
          <span className="border-[0.1vw]" />
        </div>

        {/* mock ed */}
        <div className="flex w-full border-[0.2vw] h-[10vw] bg-[var(--background)] items-center font-bold m-[1vh]">
          <div className="w-[12.5%] h-full border-[var(--background)] border-[0.4vw] overflow-hidden">
            <img src="https://static.wikia.nocookie.net/fma/images/0/08/213254_1407532169190_full.png" />
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex flex-col justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1 className="text-[1.3vw]">Human</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-yellow-600">
            <h1 className="text-[1.7vw]">Male</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-red-600">
            <h1 className="text-[1.9vw]">15</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="text-[1.3vw] flex flex-col justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-red-600">
            <h1>Amestrian,</h1>
            <h1>Xerxesian</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1 className="text-[1.2vw]">Episode 1: Fullmetal Alchemist</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex font-bold flex-col text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1>Rockbell Automail,</h1>
            <h1>Amestrian State Military</h1>
            <h1>Izumi Curtis,</h1>
            <h1>Roy Mustang",</h1>
            <h1>Greed</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex flex-col text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-yellow-600">
            <h1>Alchemy,</h1>
            <h1>High Intelligence,</h1>
            <h1>Alchemy Without Circle,</h1>
            <h1>Automail User</h1>
          </div>
        </div>

        {/* mock al */}
        <div className="flex w-full border-[0.2vw] h-[10vw] bg-[var(--background)] items-center font-bold m-[1vh]">
          <div className="w-[12.5%] h-full border-[var(--background)] border-[0.4vw] overflow-hidden">
            <img src="https://static.wikia.nocookie.net/fma/images/c/c3/AlManga.png" />
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex flex-col justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1 className="text-[1.3vw]">Human</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-yellow-600">
            <h1 className="text-[1.7vw]">Male</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-red-600">
            <h1 className="text-[1.9vw]">15</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="text-[1.3vw] flex flex-col justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-red-600">
            <h1>Amestrian,</h1>
            <h1>Xerxesian</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1 className="text-[1.2vw]">Episode 1: Fullmetal Alchemist</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex font-bold flex-col text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1>Rockbell Automail,</h1>
            <h1>Amestrian State Military</h1>
            <h1>Izumi Curtis,</h1>
            <h1>Roy Mustang",</h1>
            <h1>Greed</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex flex-col text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-yellow-600">
            <h1>Alchemy,</h1>
            <h1>High Intelligence,</h1>
            <h1>Alchemy Without Circle,</h1>
            <h1>Automail User</h1>
          </div>
        </div>

        {/* mock roy */}
        <div className="flex w-full border-[0.2vw] h-[10vw] bg-[var(--background)] items-center font-bold m-[1vh]">
          <div className="w-[12.5%] h-full border-[var(--background)] border-[0.4vw] overflow-hidden">
            <img src="https://static.wikia.nocookie.net/fma/images/b/bb/Avatar_roy.png" />
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex flex-col justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1 className="text-[1.3vw]">Human</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-yellow-600">
            <h1 className="text-[1.7vw]">Male</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-red-600">
            <h1 className="text-[1.9vw]">15</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="text-[1.3vw] flex flex-col justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-red-600">
            <h1>Amestrian,</h1>
            <h1>Xerxesian</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1 className="text-[1.2vw]">Episode 1: Fullmetal Alchemist</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex font-bold flex-col text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-green-600">
            <h1>Rockbell Automail,</h1>
            <h1>Amestrian State Military</h1>
            <h1>Izumi Curtis,</h1>
            <h1>Roy Mustang",</h1>
            <h1>Greed</h1>
          </div>
          <span className="w-0 h-[90%] border" />
          <div className="flex flex-col text-center justify-center items-center w-[12.5%] h-full border-[var(--background)] border-[0.4vw] bg-yellow-600">
            <h1>Alchemy,</h1>
            <h1>High Intelligence,</h1>
            <h1>Alchemy Without Circle,</h1>
            <h1>Automail User</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FlippingCard from "@/components/FlippingCard";
import api from "@/apiClient/apiCaller";
import {
  Character,
  CharacterComplete,
  CharacterResponse,
} from "@/types/character";
import fmab_data from "@/data/fmab_characters.json";
import { AxiosResponse } from "axios";
import React from "react";

export default function Home() {
  const [yesterdayCharacter, setYesterdayCharacter] = useState<string>("");
  const [won, setWon] = useState<boolean>(false);
  const [history, setHistory] = useState<CharacterResponse[]>([]);

  useEffect(() => {
    const won = localStorage.getItem("won");
    const date = localStorage.getItem("date");
    const history = localStorage.getItem("history");

    const today = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");

    if (date == today) {
      if (won === "true") {
        setWon(true);
      } else {
        setWon(false);
      }

      if (history) {
        try {
          const parsedHistory: CharacterResponse[] = JSON.parse(history);
          setHistory(parsedHistory);
          restoreHistory(parsedHistory);
        } catch (error) {
          console.error("Failed to parse history:", error);
          setHistory([]); // Fallback to empty array if parsing fails
        }
      }
    } else {
      setWon(false);
    }
  }, []);

  useEffect(() => {
    api
      .get("last-character")
      .then((response: AxiosResponse<{ yesterday_character: string }>) => {
        setYesterdayCharacter(response.data.yesterday_character);
      });
  }, []);

  const [query, setQuery] = useState<string>("");

  //characters data
  const characters_data: CharacterComplete[] =
    fmab_data.characters as CharacterComplete[];

  //characters name and image
  const [characters, setCharacters] = useState<Character[]>(
    characters_data.map(({ name, image }: { name: string; image: string }) => ({
      name,
      image,
    })),
  );

  const [guesses, setGuesses] = useState<
    { id: string; element: React.ReactNode }[]
  >([]);

  //filtered suggestions
  const [filteredSuggestions, setFilteredSuggestions] = useState<Character[]>(
    [],
  );

  const sendCharacter = () => {
    api
      .post("character-guess", { name: query })
      .then((response: AxiosResponse<CharacterResponse>) => {
        setCharacters(
          characters.filter(
            (character) => character.name !== response.data.name,
          ),
        );
        updateGuesses(response.data, true);

        history.push(response.data);
        localStorage.setItem("history", JSON.stringify(history));

        if (response.data.win) {
          setWon(true);
          localStorage.setItem("won", "true");
        }

        const date = localStorage.getItem("date");
        const today = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");

        if (date !== today) {
          localStorage.setItem(
            "date",
            moment().tz("America/Sao_Paulo").format("DD/MM/YYYY"),
          );
        }
      });
  };

  const updateGuesses = (answer: CharacterResponse, isNew: boolean) => {
    const currentGuess = characters_data.find(
      (character) => character.name === answer.name,
    );

    if (!currentGuess) return;

    const age_diff_aux =
      answer.age_diff < 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8vw"
          height="8vw"
          fill="var(--dark-red)"
          viewBox="0 0 256 256"
          className="absolute -z-10 "
        >
          <path d="M229.66,141.66l-96,96a8,8,0,0,1-11.32,0l-96-96A8,8,0,0,1,32,128H72V48A16,16,0,0,1,88,32h80a16,16,0,0,1,16,16v80h40a8,8,0,0,1,5.66,13.66Z"></path>
        </svg>
      ) : (
        <></>
      );
    const age_diff =
      answer.age_diff > 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8vw"
          height="8vw"
          fill="var(--dark-red)"
          viewBox="0 0 256 256"
          className="absolute -z-10"
        >
          <path d="M231.39,123.06A8,8,0,0,1,224,128H184v80a16,16,0,0,1-16,16H88a16,16,0,0,1-16-16V128H32a8,8,0,0,1-5.66-13.66l96-96a8,8,0,0,1,11.32,0l96,96A8,8,0,0,1,231.39,123.06Z"></path>
        </svg>
      ) : (
        age_diff_aux
      );

    const episode_diff_aux =
      answer.episode_diff < 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8vw"
          height="8vw"
          fill="var(--dark-red)"
          viewBox="0 0 256 256"
          className="absolute -z-10 "
        >
          <path d="M229.66,141.66l-96,96a8,8,0,0,1-11.32,0l-96-96A8,8,0,0,1,32,128H72V48A16,16,0,0,1,88,32h80a16,16,0,0,1,16,16v80h40a8,8,0,0,1,5.66,13.66Z"></path>
        </svg>
      ) : (
        <></>
      );
    const episode_diff =
      answer.episode_diff > 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8vw"
          height="8vw"
          fill="var(--dark-red)"
          viewBox="0 0 256 256"
          className="absolute -z-10"
        >
          <path d="M231.39,123.06A8,8,0,0,1,224,128H184v80a16,16,0,0,1-16,16H88a16,16,0,0,1-16-16V128H32a8,8,0,0,1-5.66-13.66l96-96a8,8,0,0,1,11.32,0l96,96A8,8,0,0,1,231.39,123.06Z"></path>
        </svg>
      ) : (
        episode_diff_aux
      );

    setGuesses((prevGuesses) => [
      {
        id: crypto.randomUUID(),
        element: (
          <div className="flex w-full border-[0.2vw] h-[9.5vw] bg-[var(--background)] items-center font-bold m-[1vh]">
            <div className="w-[12.5%] h-full border-[var(--background)] border-[0.4vw] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={currentGuess.image}
              />
            </div>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={1} color={answer.species}>
              <h1 className="text-[1.3vw]">
                {currentGuess.species.join(", ")}
              </h1>
            </FlippingCard>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={2} color={answer.gender}>
              <h1 className="text-[1.7vw]">{currentGuess.gender}</h1>
            </FlippingCard>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={3} color={answer.age}>
              <h1 className="text-[1.9vw]">{currentGuess.age}</h1>
              {age_diff}
            </FlippingCard>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={4} color={answer.nationality}>
              <h1 className="text-[1.3vw] ">
                {currentGuess.nationality.join(", ")}
              </h1>
            </FlippingCard>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={5} color={answer.debut_episode}>
              <h1 className="text-[1.2vw]">{currentGuess.debut_episode}</h1>
              {episode_diff}
            </FlippingCard>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={6} color={answer.affiliations}>
              <h1>{currentGuess.affiliations.join(", ")}</h1>
            </FlippingCard>
            <span className="w-0 h-[90%] border" />
            <FlippingCard isNew={isNew} index={7} color={answer.abilities}>
              <h1>{currentGuess.abilities.join(", ")}</h1>
            </FlippingCard>
          </div>
        ),
      },
      ...prevGuesses,
    ]);
    setQuery("");
  };

  const restoreHistory = (history: CharacterResponse[]) => {
    history.forEach((answer) => updateGuesses(answer, false));
  };

  //input change
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

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = moment().tz("America/Sao_Paulo");
      const midnight = now.clone().endOf("day");
      const diffSeconds = midnight.diff(now, "seconds");

      const hours = Math.floor(diffSeconds / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);
      const seconds = diffSeconds % 60;

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-auto">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-[25%] h-auto text-center mb-8 m-10"
      >
        <img alt="fmab_logo" src="/assets/fmab_logo.webp" />
        <h1 className="text-[var(--red)] font-outline text-[2.5vw] font-bold font-poppins">
          WORDLE
        </h1>
      </motion.div>

      <div className="flex gap-2 mb-8 font-bold">
        <h1>Next Character In: </h1>
        <h1 className="text-[var(--red)]">{`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</h1>
      </div>

      <div className="border-[0.2vw] w-[25%] text-wrap text-center font-bold bg-[var(--background)] rounded-[0.6vw]">
        <div className="m-[0.5vw]">
          <h1 className="text-[1vw]">
            Guess today's Fullmetal Alchemist: Brotherhood character!
          </h1>

          <div className="flex gap-3 items-center justify-center">
            <div className="relative w-[75%]">
              <input
                id="search"
                type="text"
                disabled={won}
                value={query}
                onChange={handleInputChange}
                className={`focus:outline-none focus:ring-0 ${won ? "opacity-50" : " "} bg-[var(--gray)] w-full border-[0.2vw] rounded-[0.4vw] border-[var(--red)] text-[0.8vw] p-[0.4vw] font-bold text-black`}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="hide-scrollbar absolute top-full left-0 w-full flex flex-col items-center bg-gray-200 border rounded-md shadow-md max-h-60 overflow-auto z-10">
                  {filteredSuggestions.map((character, index) => (
                    <li
                      key={character.name}
                      className={`w-[95%] flex items-center p-2 hover:bg-gray-100 cursor-pointer
                                ${index !== filteredSuggestions.length - 1 ? "border-b border-gray-900" : ""}`}
                      onClick={() => handleSuggestionClick(character.name)}
                    >
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-[2.5vw] h-[2.5vw] border-[0.2vw] border-[var(--red)] rounded-full mr-2 object-cover"
                      />
                      <h1 className="text-black font-bold">{character.name}</h1>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="3vw"
              height="3vw"
              fill="#c51117"
              viewBox="0 0 256 256"
              className={`cursor-pointer ${won ? "pointer-events-none opacity-50" : ""}`}
              whileHover={{ scale: 1.1 }}
              onClick={sendCharacter}
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm29.66,109.66-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,157.66,133.66Z"></path>
            </motion.svg>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-4 m-8 font-bold">
        <h1>Yesterday Character was: </h1>
        <h1 className="text-[var(--red)]">{yesterdayCharacter}</h1>
      </div>
      <div className="flex flex-col items-center m-[3vh]">
        <div
          className={`flex flex-col m-[1vh] ${guesses.length > 0 ? "" : "hidden"}`}
        >
          <div className=" flex text-[1.2vw] font-bold gap-[2vw] text-center">
            <h1 className="w-[7.5vw]">Characters: </h1>
            <h1 className="w-[7.5vw]">Species: </h1>
            <h1 className="w-[7.5vw]">Gender: </h1>
            <h1 className="w-[7.5vw]">Age: </h1>
            <h1 className="w-[7.5vw]">Nationality: </h1>
            <h1 className="w-[7.5vw]">Debut: </h1>
            <h1 className="w-[7.5vw]">Affiliations: </h1>
            <h1 className="w-[7.5vw]">Abilities: </h1>
          </div>
          <span className="border-[0.1vw]" />
        </div>
        {guesses.map((guess) => (
          <React.Fragment key={guess.id}>{guess.element}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

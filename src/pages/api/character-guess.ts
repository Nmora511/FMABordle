import { NextApiRequest, NextApiResponse } from "next";
import rng from "seedrandom";
import moment from "moment-timezone";
import { CharacterComplete, CharacterResponse } from "@/types/character";
import fmab_data from "@/data/fmab_characters.json";

const areArraysEqual = (arr1: string[], arr2: string[]) =>
  arr1.length === arr2.length &&
  arr1.toSorted().join() === arr2.toSorted().join();

const getEpisodeNumber = (episode: string): number => {
  const match = episode.match(/Episode (\d+):/i);
  return match ? parseInt(match[1], 10) : 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { name }: { name: string } = req.body;

      const characters: CharacterComplete[] =
        fmab_data.characters as CharacterComplete[];

      const character_guessed = characters.find((character) => {
        return character.name === name;
      });

      if (!character_guessed) {
        return res.status(400).json({ message: "Character not found" });
      }

      const date = moment().tz("America/Sao_Paulo").format("DDMMYYYY");

      // Set the seed
      const myrng: rng.prng = rng(date);
      const index = Math.floor(myrng() * (characters.length - 1));
      const day_character = characters[index];

      const result: CharacterResponse = {
        name: name,
        species: "red",
        gender: "red",
        age: "red",
        age_diff: 1,
        nationality: "red",
        debut_episode: "red",
        episode_diff: 1,
        affiliations: "red",
        abilities: "red",
        win: true,
      };

      //check species
      if (areArraysEqual(character_guessed.species, day_character.species)) {
        result.species = "green";
      } else if (
        character_guessed.species.some((species) =>
          day_character.species.includes(species),
        )
      ) {
        result.species = "yellow";
        result.win = false;
      } else {
        result.species = "red";
        result.win = false;
      }

      //check gender
      if (character_guessed.gender === day_character.gender) {
        result.gender = "green";
      } else {
        result.gender = "red";
        result.win = false;
      }

      //check age
      if (parseInt(character_guessed.age) === parseInt(day_character.age)) {
        result.age = "green";
        result.age_diff = 0;
      } else if (
        parseInt(character_guessed.age) > parseInt(day_character.age)
      ) {
        result.age = "red";
        result.age_diff = -1;
        result.win = false;
      } else {
        result.age = "red";
        result.age_diff = 1;
        result.win = false;
      }

      //check nationality
      if (
        areArraysEqual(character_guessed.nationality, day_character.nationality)
      ) {
        result.nationality = "green";
      } else if (
        character_guessed.nationality.some((nationality) =>
          day_character.nationality.includes(nationality),
        )
      ) {
        result.nationality = "yellow";
        result.win = false;
      } else {
        result.nationality = "red";
        result.win = false;
      }

      //check debut_episode
      if (character_guessed.debut_episode === day_character.debut_episode) {
        result.debut_episode = "green";
        result.episode_diff = 0;
      } else if (
        getEpisodeNumber(character_guessed.debut_episode) >
        getEpisodeNumber(day_character.debut_episode)
      ) {
        result.episode_diff = -1;
        result.debut_episode = "red";
        result.win = false;
      } else {
        result.episode_diff = 1;
        result.debut_episode = "red";
        result.win = false;
      }

      //check affiliations
      if (
        areArraysEqual(
          character_guessed.affiliations,
          day_character.affiliations,
        )
      ) {
        result.affiliations = "green";
      } else if (
        character_guessed.affiliations.some((affiliation) =>
          day_character.affiliations.includes(affiliation),
        )
      ) {
        result.affiliations = "yellow";
        result.win = false;
      } else {
        result.affiliations = "red";
        result.win = false;
      }

      //check abilities
      if (
        areArraysEqual(character_guessed.abilities, day_character.abilities)
      ) {
        result.abilities = "green";
      } else if (
        character_guessed.abilities.some((ability) =>
          day_character.abilities.includes(ability),
        )
      ) {
        result.abilities = "yellow";
        result.win = false;
      } else {
        result.abilities = "red";
        result.win = false;
      }

      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while sending characters information", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
function seedrandom(arg0: string) {
  throw new Error("Function not implemented.");
}

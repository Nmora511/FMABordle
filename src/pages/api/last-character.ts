import { NextApiRequest, NextApiResponse } from "next";
import rng from "seedrandom";
import moment from "moment-timezone";
import { CharacterComplete, CharacterResponse } from "@/types/character";
import fmab_data from "@/data/fmab_characters.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const characters: CharacterComplete[] =
        fmab_data.characters as CharacterComplete[];

      const yesterday = moment()
        .tz("America/Sao_Paulo")
        .subtract(1, "day")
        .format("DDMMYYYY");

      // Set the seed
      const myrng: rng.prng = rng(yesterday);
      const index = Math.floor(myrng() * (characters.length - 1));
      const yesterday_character = characters[index];

      res.status(200).json({ yesterday_character: yesterday_character.name });
    } catch (error) {
      res.status(500).json({
        message: "Error while receiving character information",
        error,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

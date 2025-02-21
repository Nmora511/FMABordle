export type Character = {
  name: string;
  image: string;
};

export type CharacterComplete = {
  image: string;
  name: string;
  species: string[];
  gender: string;
  age: string;
  nationality: string[];
  debut_episode: string;
  affiliations: string[];
  abilities: string[];
};

export type CharacterResponse = {
  name: string;
  species: "red" | "green" | "yellow";
  gender: "red" | "green";
  age: "red" | "green";
  age_diff: 1 | 0 | -1;
  nationality: "red" | "green" | "yellow";
  debut_episode: "red" | "green";
  episode_diff: 1 | 0 | -1;
  affiliations: "red" | "green" | "yellow";
  abilities: "red" | "green" | "yellow";
  win: boolean;
};

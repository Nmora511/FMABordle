declare module "seedrandom" {
  export = seedrandom;
  function seedrandom(seed?: string | number, options?: any): seedrandom.prng;
  namespace seedrandom {
    interface prng {
      (): number;
      quick(): number;
      int32(): number;
      double(): number;
    }
  }
}

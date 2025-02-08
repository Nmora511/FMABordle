import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-auto">
      <div className="w-[25%] h-auto text-center m-10">
        <img alt="fmab_logo" src="/assets/fmab_logo.webp" />
        <h1 className="text-[var(--red)] font-outline text-[2.5vw] font-bold font-poppins">
          WORDLE
        </h1>
      </div>
      <div className="border-[0.2vw] w-[25%] text-wrap text-center font-bold bg-[var(--background)] rounded-[0.6vw]">
        <h1 className="text-[1vw]">
          Guess today's Fullmetal Alchemist: Brotherhood character!
        </h1>
        <input></input>
      </div>
    </div>
  );
}

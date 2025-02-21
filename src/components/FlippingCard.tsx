"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";

const FlippingCard = ({
  children,
  color,
  index,
  isNew,
}: {
  children: React.ReactNode;
  color: string;
  index: number;
  isNew: boolean;
}) => {
  const cardVariants = {
    hidden: isNew ? { rotateY: 180 } : { rotateY: 0 },
    visible: (i: number) => ({
      rotateY: 0,
      transition: { duration: 1, delay: i * 0.6, ease: "easeOut" }, // Delay per card
    }),
  };

  const colorMap: Record<string, string> = {
    red: "bg-red-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
  };

  const colorCss = colorMap[color] || "bg-black";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      style={{ transformStyle: "preserve-3d" }}
      className="w-[12.5%] h-full flex flex-col justify-center items-center"
    >
      <div
        className={clsx(
          "inset-0 absolute flex flex-col justify-center items-center text-center w-full h-full border-[var(--background)] border-[0.4vw]",
          colorCss,
        )}
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(0deg)",
        }}
      >
        {children}
      </div>
      <div
        className="absolute inset-0 flex justify-center items-center"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="scale-95 w-full h-full flex justify-center items-center border-[var(--for)] border-[0.2vw] bg-gray-700">
          <img className="h-[80%] w-auto" src="/assets/flamel.png" />
        </div>
      </div>
    </motion.div>
  );
};

export default FlippingCard;

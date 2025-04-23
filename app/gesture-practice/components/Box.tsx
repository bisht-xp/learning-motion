"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type BoxProps = {
  className?: string;
};

const Box = ({ className }: BoxProps) => {
  const boxVariants = {
    initial: {
      x: 0,
      scale: 1,
      backgroundColor: "#3b82f6",
      borderRadius: "0%",
    },
    hover: {
      scale: 2.2,
      rotate: 360,
      x: 500,
      borderRadius: "50%", // Circle on hover
      backgroundColor: "#ec4899", // Pink-500
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 3,
        ease: "easeInOut",
        scale: { duration: 5 },
        rotate: { delay: 1 },
      },
    },
    tap: {
      scale: [1, 0.8, 0.8],
      x: [0, 0, -500],
      backgroundColor: "#10b981",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        times: [0, 0.5, 1], //sequence
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      variants={boxVariants}
      whileHover="hover"
      className={cn("w-40 h-40", className)}
      whileTap="tap"
    ></motion.div>
  );
};

export default Box;

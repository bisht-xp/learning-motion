"use client";
import { Lightbulb, Mouse, SquareCheck, Target } from "lucide-react";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

export const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to FlowMate",
    description:
      "Your new workspace to organize, create, and flow without distractions.",
    icon: <Lightbulb />,
    bgColor: "#F0F9FF",
  },
  {
    id: 2,
    title: "Focus-First Design",
    description:
      "Minimal UI, smooth animations, and only what you need. Nothing else.",
    icon: <Target />,
    bgColor: "#FEF9EC",
  },
  {
    id: 3,
    title: "Drag. Drop. Done.",
    description:
      "Customize your layout with intuitive gestures. It's that easy.",
    icon: <Mouse />,
    bgColor: "#F6F8FF",
  },
  {
    id: 4,
    title: "You're All Set!",
    description: "Let’s get started. Your workspace is waiting. 🚀",
    icon: <SquareCheck />,
    bgColor: "#E8FDEB",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNext = () => {
    if (currentStep + 1 < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const cardVariants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <ProgressBar currentStep={currentStep} steps={4} />

      <AnimatePresence>
        {onboardingSteps.map((step, index) => (
          <motion.div
            key={step.id}
            variants={cardVariants}
            exit={"hidden"}
            animate={"visible"}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={cn(
              " w-80 h-100 mt-5 p-4 flex flex-col",
            //   `${index !== currentStep && "hidden"}`
            )}
            style={{ background: `${step.bgColor}` }}
          >
            <h1 className="flex justify-start items-center gap-2 text-xl font-semibold">
              <span>{step.icon}</span> <span>{step.title}</span>
            </h1>
            <div className="w-full h-full flex justify-center items-center text-center font-medium text-lg">
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex justify-end items-center gap-2 absolute bottom-0 right-10">
        <button
          onClick={handlePrev}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

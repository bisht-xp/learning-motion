"use client";
import { Lightbulb, Mouse, SquareCheck, Target } from "lucide-react";
import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import { cn } from "@/lib/utils";

type Props = {};

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

const page = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    if(currentStep+1 < 4) {
      setCurrentStep(prev => prev+1);
    }
  }
  const handlePrev = () => {
    if(currentStep > 0) {
      setCurrentStep(prev => prev-1);
    }
  }
  return (
    <div className="flex flex-col justify-start items-center w-full h-[calc(100vh-100px)] mt-2 px-6 relative bg-white">
      <h1 className="font-bold text-5xl text-center text-[#1d2112] before:content-[''] relative before:absolute before:w-1/2 before:bg-[#393f28] md:before:w-1/3 before:-bottom-2 before:h-1">
        Onborarding Flow
      </h1>

      <p className="mt-5 leading-8 text-lg md:text-2xl text-center">
        This is the onboarding user flow to get the better experience.
      </p>

      <ProgressBar currentStep={1} steps={4} />

      {onboardingSteps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            " w-80 h-100 mt-5 p-4 flex flex-col",
            `${index !== currentStep && "hidden"}`
          )}
          style={{ background: `${step.bgColor}` }}
        >
          <h1 className="flex justify-start items-center gap-2 text-xl font-semibold">
            <span>{step.icon}</span> <span>{step.title}</span>
          </h1>
          <div className="w-full h-full flex justify-center items-center text-center font-medium text-lg">
            <p>{step.description}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-end items-center gap-2 absolute bottom-0 right-10">
        <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Previous
        </button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default page;

import { cn } from "@/lib/utils";
import React, { Fragment } from "react";

type ProgressBarProps = {
  currentStep: number;
  steps: number;
};

const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-5xl mt-5 flex justify-between items-center  ">
      {Array.from({ length: steps }).map((_, index) => (
        <Fragment key={index}>
          <div
            className={cn(
              "w-12 h-12 rounded-full  text-white flex justify-center items-center text-xl",
              `${currentStep >= index ? "bg-blue-500": "bg-neutral-900 " }`
            )}
          >
            {index + 1}
          </div>

          {index + 1 !== steps && (
            <div className="flex-1 h-1 mx-2 bg-amber-400" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;

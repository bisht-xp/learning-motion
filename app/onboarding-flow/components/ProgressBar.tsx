import { cn } from "@/lib/utils";
import React, { Fragment } from "react";
import { motion } from "motion/react";

type ProgressBarProps = {
  currentStep: number;
  steps: number;
};

const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-5xl mt-5 flex justify-between items-center">
      {Array.from({ length: steps }).map((_, index) => (
        <Fragment key={index}>
          {/* Step Circle */}
          <motion.div
            className={cn(
              "w-12 h-12 rounded-full text-white flex justify-center items-center text-xl",
              currentStep >= index ? "bg-blue-500" : "bg-neutral-900"
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: currentStep === index ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {index + 1}
          </motion.div>

          {/* Progress Bar (don't render after the last circle) */}
          {index < steps - 1 && (
            <div className="flex-1 h-1 mx-2 bg-neutral-300 relative">
              <motion.div
                className="absolute inset-0 bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ 
                  width: currentStep > index ? "100%" : "0%" 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};


export default ProgressBar;

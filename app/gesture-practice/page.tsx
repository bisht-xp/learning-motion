import React from "react";
import Box from "./components/Box";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full bg-black h-[calc(100vh-82px)] mx-auto">
      <div className="px-28 py-10 flex flex-col justify-center items-center space-y-3">
        <div className="flex justify-center items-center gap-3 w-full ">
          {/* Gesture-practice */}
          <div className="flex flex-col justify-center items-center space-y-5">
            <h3 className="text-neutral-100 text-lg font-semibold">
              Interactive Box{" "}
            </h3>
            <Box className={" rounded-xl"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

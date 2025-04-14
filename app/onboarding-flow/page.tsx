import Onboarding from "./components/Onboarding";

const page = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-[calc(100vh-100px)] mt-2 px-6 relative bg-white">
      <h1 className="font-bold text-5xl text-center text-[#1d2112] before:content-[''] relative before:absolute before:w-1/2 before:bg-[#393f28] md:before:w-1/3 before:-bottom-2 before:h-1">
        Onborarding Flow
      </h1>

      <p className="mt-5 leading-8 text-lg md:text-2xl text-center">
        This is the onboarding user flow to get the better experience.
      </p>
      <Onboarding />
    </div>
  );
};

export default page;

"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Onboarding-flow",
    link: "/onboarding-flow",
  },
  {
    text: "Weekly-Challenge",
    link: "/",
  },
  {
    text: "gesture-practice",
    link: "/gesture-practice",
  },
];

const Header = () => {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const getActiveTab = () => {
    return tabs.find((tab) => pathname === tab.link) || tabs[0];
  };

  useEffect(() => {
    const tab = getActiveTab();
    setSelectedTab(tab);
    // setHoveredTab(tab.text);
  }, [pathname]);
  return (
    <nav
      className={cn(
        "w-full md:max-w-5xl bg-black flex justify-center items-center mx-auto py-5 px-5"
      )}
    >
      <motion.ul className="flex justify-center items-center relative border px-5 md:px-20  rounded-xl w-fit">
        {tabs.map((tab) => (
          <Link key={tab.text} href={tab.link}>
            <motion.li
              key={tab.text}
              onClick={() => setSelectedTab(tab)}
              onHoverStart={() => setHoveredTab(tab.text)}
              onHoverEnd={() => setHoveredTab(selectedTab.text)}
              className="cursor-pointer py-2 px-3 relative"
              style={{
                color: selectedTab.text !== tab.text ? "#606c38" : "#283618",
              }}
            >
              {hoveredTab === tab.text && (
                <motion.div
                  layoutId="hover-background"
                  className="absolute inset-0 rounded-md bg-[#eaedda]"
                  transition={{
                    type: "spring",
                    stiffness: 400, // Higher = faster, snappier
                    damping: 25, // Higher = less bouncy
                    mass: 0.8, // Lower = less inertia
                  }}
                />
              )}
              <span className="relative z-10 font-semibold">{tab.text}</span>
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Header;

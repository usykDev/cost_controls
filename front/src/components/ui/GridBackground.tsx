"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GridBackground = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen w-full bg-white"></div>; // Prevent hydration mismatch

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-300 ${
        resolvedTheme === "dark"
          ? "bg-[#272727] text-white bg-grid-white/[0.05]"
          : "bg-white text-black bg-grid-black/[0.05]"
      }`}
    >
      <div
        className={`absolute pointer-events-none inset-0 ${
          resolvedTheme === "dark"
            ? "bg-[#272727] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
            : "bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        }`}
      />
      {children}
    </div>
  );
};

export default GridBackground;

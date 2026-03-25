"use client";

import { useState, useEffect } from "react";

interface SkipLinkProps {
  targetId: string;
  text?: string;
  className?: string;
}

export default function SkipLink({
  targetId,
  text = "Saltar al contenido",
  className = "",
}: SkipLinkProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip link when user starts tabbing
      if (e.key === "Tab") {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      // Hide skip link when clicking
      setIsVisible(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without jumping
      window.history.pushState(null, "", `#${targetId}`);
    }
    setIsVisible(false);
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`
        fixed top-4 left-4 z-[100]
        bg-primary-600 text-white
        px-6 py-3 rounded-lg
        font-semibold text-base
        shadow-lg
        transform transition-transform duration-200
        focus:outline-none focus:ring-4 focus:ring-primary-300
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${className}
      `}
      tabIndex={0}
    >
      {text}
    </a>
  );
}

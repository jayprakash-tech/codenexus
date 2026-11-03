"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Code2, Play, Send } from "lucide-react";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TopBarProps {
  /** Name of the currently open problem (shown in the center of the bar). */
  problemTitle: string;
  /** Difficulty of the currently open problem. */
  difficulty: Difficulty;
  /** Languages offered in the dropdown. */
  languages: readonly string[];
  /** Currently selected language (controlled by the page). */
  selectedLanguage: string;
  /** Called when the user picks a different language. */
  onLanguageChange: (language: string) => void;
  /** Placeholder Run handler (visual only in Sprint 1). */
  onRun?: () => void;
  /** Placeholder Submit handler (visual only in Sprint 1). */
  onSubmit?: () => void;
}

const DIFFICULTY_BADGE_CLASSES: Record<Difficulty, string> = {
  Easy: "bg-green-600/20 text-green-400 border border-green-600/40",
  Medium: "bg-yellow-600/20 text-yellow-400 border border-yellow-600/40",
  Hard: "bg-red-600/20 text-red-400 border border-red-600/40",
};

/**
 * Top navigation bar (56px tall, bg-gray-900).
 * Left: logo · Center: problem title + difficulty badge (also shown on mobile)
 * · Right: language picker + Run/Submit.
 * The action buttons are visual placeholders for Sprint 1 (non-functional).
 */
export default function TopBar({
  problemTitle,
  difficulty,
  languages,
  selectedLanguage,
  onLanguageChange,
  onRun,
  onSubmit,
}: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close the language dropdown when clicking outside of it.
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handlePointerDown = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isDropdownOpen]);

  const handleLanguageSelect = (language: string): void => {
    onLanguageChange(language);
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-gray-800 bg-gray-900 px-3 sm:px-4">
      {/* Left: Logo */}
      <div className="flex min-w-0 items-center gap-2">
        <Code2 className="h-5 w-5 shrink-0 text-blue-500" />
        <span className="whitespace-nowrap text-base font-bold tracking-tight text-white">
          CodeNexus
        </span>
      </div>

      {/* Center: Problem title + difficulty badge (visible at all breakpoints) */}
      <div className="flex min-w-0 items-center justify-center gap-2">
        <span className="truncate text-sm font-medium text-gray-300">
          {problemTitle}
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_BADGE_CLASSES[difficulty]}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Right: Language dropdown + Run / Submit (visual placeholders only) */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen((open) => !open)}
            className="flex items-center gap-1.5 rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-700"
          >
            {selectedLanguage}
            <ChevronDown className="h-4 w-4" />
          </button>
          {isDropdownOpen && (
            <ul
              role="listbox"
              className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-md border border-gray-700 bg-gray-800 py-1 shadow-lg"
            >
              {languages.map((language) => (
                <li key={language}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === selectedLanguage}
                    onClick={() => handleLanguageSelect(language)}
                    className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-left text-sm transition-colors hover:bg-gray-700 ${
                      language === selectedLanguage
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    <Check
                      className={`h-3.5 w-3.5 ${
                        language === selectedLanguage
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {language}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Placeholder buttons – wired up in Sprint 3 (code runner). */}
        <button
          type="button"
          onClick={onRun}
          title="Run Code (placeholder – non-functional in Sprint 1)"
          className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 active:scale-95"
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Run Code</span>
        </button>
        <button
          type="button"
          onClick={onSubmit}
          title="Submit (placeholder – non-functional in Sprint 1)"
          className="flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-500 active:scale-95"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>
    </header>
  );
}

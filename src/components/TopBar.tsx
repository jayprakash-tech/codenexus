"use client";

import { useState } from "react";
import { ChevronDown, Code2, Play, Send } from "lucide-react";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TopBarProps {
  /** Name of the currently open problem (shown in the center of the bar). */
  problemTitle: string;
  /** Difficulty of the currently open problem. */
  difficulty: Difficulty;
  /** Languages offered in the dropdown. */
  languages: readonly string[];
}

const DIFFICULTY_BADGE_CLASSES: Record<Difficulty, string> = {
  Easy: "bg-green-600/20 text-green-400 border border-green-600/40",
  Medium: "bg-yellow-600/20 text-yellow-400 border border-yellow-600/40",
  Hard: "bg-red-600/20 text-red-400 border border-red-600/40",
};

/**
 * Top navigation bar (56px tall, bg-gray-900).
 * Left: logo · Center: problem title + difficulty badge · Right: language picker + Run/Submit.
 * The action buttons are visual placeholders for Sprint 1 (non-functional).
 */
export default function TopBar({
  problemTitle,
  difficulty,
  languages,
}: TopBarProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languages[0] ?? "Python",
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLanguageSelect = (language: string): void => {
    setSelectedLanguage(language);
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

      {/* Center: Problem title + difficulty badge */}
      <div className="hidden min-w-0 items-center gap-2 md:flex">
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
        <div className="relative">
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
                    className={`w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-gray-700 ${
                      language === selectedLanguage
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
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
          title="Run Code (placeholder – non-functional in Sprint 1)"
          className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Run Code</span>
        </button>
        <button
          type="button"
          title="Submit (placeholder – non-functional in Sprint 1)"
          className="flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-500"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>
    </header>
  );
}

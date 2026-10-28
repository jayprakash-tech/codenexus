"use client";

import { useState } from "react";
import { BookOpen, Flame, Lightbulb, Zap } from "lucide-react";

export interface ProblemExample {
  id: string;
  title: string;
  input: string;
  output: string;
}

export interface GamificationStats {
  /** Experience points earned so far (hardcoded demo value in Sprint 1). */
  xp: number;
  /** Consecutive-day streak (hardcoded demo value in Sprint 1). */
  streak: number;
}

export interface ProblemDescriptionProps {
  title: string;
  statement: string;
  examples: ProblemExample[];
  constraints: string[];
  hint: string;
  stats: GamificationStats;
}

/**
 * Left panel: problem description with a toggleable hint and a gamification
 * strip pinned at the bottom. Scrollable on desktop, static on mobile.
 */
export default function ProblemDescription({
  title,
  statement,
  examples,
  constraints,
  hint,
  stats,
}: ProblemDescriptionProps) {
  const [isHintVisible, setIsHintVisible] = useState<boolean>(false);

  return (
    <section className="flex flex-col overflow-hidden bg-gray-900 md:h-full md:w-2/5 md:border-r md:border-gray-800">
      {/* Scrollable problem content */}
      <div className="p-4 sm:p-5 md:min-h-0 md:flex-1 md:overflow-y-auto">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">
            Problem Description
          </h2>
        </div>

        <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-gray-300">{statement}</p>

        {/* Examples */}
        <div className="mb-5 space-y-3">
          {examples.map((example) => (
            <div
              key={example.id}
              className="rounded-lg border border-gray-800 bg-gray-950 p-3"
            >
              <h4 className="mb-2 text-sm font-medium text-gray-200">
                {example.title}
              </h4>
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-gray-300">
                <span className="text-gray-400">Input: </span>
                {example.input}
                {"\n"}
                <span className="text-gray-400">Output: </span>
                {example.output}
              </pre>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mb-5">
          <h4 className="mb-2 text-sm font-semibold text-white">Constraints</h4>
          <ul className="list-disc space-y-1 pl-5">
            {constraints.map((constraint) => (
              <li key={constraint} className="font-mono text-xs text-gray-300">
                {constraint}
              </li>
            ))}
          </ul>
        </div>

        {/* Hints (toggle with useState) */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Hints
            </h4>
            <button
              type="button"
              aria-expanded={isHintVisible}
              onClick={() => setIsHintVisible((visible) => !visible)}
              className="rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700"
            >
              {isHintVisible ? "Hide Hint" : "Show Hint"}
            </button>
          </div>
          {isHintVisible && (
            <p className="mt-2 rounded-lg border border-gray-800 bg-gray-950 p-3 text-xs leading-relaxed text-gray-300">
              {hint}
            </p>
          )}
        </div>
      </div>

      {/* Gamification strip (hardcoded demo values – Sprint 1) */}
      <div className="flex shrink-0 items-center gap-3 border-t border-gray-800 bg-gray-950 px-4 py-2.5">
        <span className="flex items-center gap-1.5 rounded-full border border-blue-600/40 bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-400">
          <Zap className="h-3.5 w-3.5" />
          XP: {stats.xp}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-orange-600/40 bg-orange-600/20 px-3 py-1 text-xs font-semibold text-orange-400">
          <Flame className="h-3.5 w-3.5" />
          Streak: {stats.streak} 🔥
        </span>
      </div>
    </section>
  );
}

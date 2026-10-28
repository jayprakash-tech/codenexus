"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

export type ResultTab = "Test Cases" | "Console";

export interface TestCase {
  id: string;
  label: string;
}

export interface ResultsPanelProps {
  /** Tabs shown in the tab bar, e.g. ["Test Cases", "Console"]. */
  tabs: readonly ResultTab[];
  /** Test case selector buttons, e.g. Example 1 / 2 / 3. */
  testCases: TestCase[];
  /** Console output lines (green monospace text in Sprint 1). */
  consoleLines: readonly string[];
}

/**
 * Right panel – bottom area: tabbed results panel with test-case buttons and
 * a black console output box. Will be connected to the code runner in Sprint 3.
 */
export default function ResultsPanel({
  tabs,
  testCases,
  consoleLines,
}: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>(
    tabs[0] ?? "Test Cases",
  );
  const [activeTestCaseId, setActiveTestCaseId] = useState<string>(
    testCases[0]?.id ?? "",
  );

  return (
    <div className="flex min-h-[280px] flex-1 flex-col overflow-hidden border-t border-gray-800 bg-gray-900 md:h-2/5 md:min-h-0 md:flex-none">
      {/* Tab bar */}
      <div className="flex h-9 shrink-0 items-stretch border-b border-gray-800 bg-gray-900">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={tab === activeTab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-4 text-xs font-medium transition-colors ${
              tab === activeTab
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-3 sm:flex-row sm:items-stretch">
        {/* Test case selector buttons */}
        <div className="flex shrink-0 gap-2 sm:flex-col">
          {testCases.map((testCase) => (
            <button
              key={testCase.id}
              type="button"
              onClick={() => setActiveTestCaseId(testCase.id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                testCase.id === activeTestCaseId
                  ? "border-blue-500 bg-blue-600/20 text-blue-400"
                  : "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {testCase.label}
            </button>
          ))}
        </div>

        {/* Console output box */}
        <div className="flex min-h-0 flex-1 flex-col rounded-md border border-gray-800 bg-black p-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
            <Terminal className="h-3.5 w-3.5" />
            Output
          </div>
          <pre className="min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-green-500">
            {consoleLines.join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
}

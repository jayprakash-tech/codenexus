import EditorPane from "@/components/EditorPane";
import ProblemDescription, {
  GamificationStats,
  ProblemExample,
} from "@/components/ProblemDescription";
import ResultsPanel, {
  ResultTab,
  TestCase,
} from "@/components/ResultsPanel";
import TopBar, { Difficulty } from "@/components/TopBar";

/* ------------------------------------------------------------------ */
/* Sprint 1: all data below is hardcoded demo data. Real problem data, */
/* auth, the Monaco editor and the code runner arrive in later sprints. */
/* ------------------------------------------------------------------ */

const PROBLEM_TITLE = "Two Sum";
const DIFFICULTY: Difficulty = "Easy";
const LANGUAGES: readonly string[] = ["Python", "C", "SQL"];

const STATEMENT =
  "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.";

const EXAMPLES: ProblemExample[] = [
  {
    id: "ex1",
    title: "Example 1:",
    input: "nums = [2,7,11,15], target = 9",
    output: "[0,1]",
  },
  {
    id: "ex2",
    title: "Example 2:",
    input: "nums = [3,2,4], target = 6",
    output: "[1,2]",
  },
];

const CONSTRAINTS: string[] = [
  "2 <= nums.length <= 10^4",
  "-10^9 <= nums[i] <= 10^9",
  "-10^9 <= target <= 10^9",
  "Only one valid answer exists.",
];

const HINT =
  "A brute-force O(n²) solution checks every pair. Can you do better with a hash map? While iterating, store each value's index; if (target - current) already exists in the map, you have found your pair.";

const STATS: GamificationStats = { xp: 120, streak: 3 };

const TABS: readonly ResultTab[] = ["Test Cases", "Console"];

const TEST_CASES: TestCase[] = [
  { id: "tc1", label: "Example 1" },
  { id: "tc2", label: "Example 2" },
  { id: "tc3", label: "Example 3" },
];

const CONSOLE_LINES: readonly string[] = [
  "> Ready. Code runner will be connected in Sprint 3.",
];

export default function Home() {
  return (
    <main className="flex h-screen flex-col bg-gray-950 text-gray-300">
      {/* 1. Top navigation bar (56px) */}
      <TopBar
        problemTitle={PROBLEM_TITLE}
        difficulty={DIFFICULTY}
        languages={LANGUAGES}
      />

      {/* 2. Main content area – row on desktop, stacked column below 768px */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
        {/* LEFT PANEL (40% width on desktop) */}
        <ProblemDescription
          title={PROBLEM_TITLE}
          statement={STATEMENT}
          examples={EXAMPLES}
          constraints={CONSTRAINTS}
          hint={HINT}
          stats={STATS}
        />

        {/* RIGHT PANEL (60% width on desktop) */}
        <div className="flex w-full shrink-0 flex-col md:h-full md:w-3/5 md:shrink">
          {/* TOP 60%: editor placeholder */}
          <EditorPane language={LANGUAGES[0]} />
          {/* BOTTOM 40%: results panel */}
          <ResultsPanel
            tabs={TABS}
            testCases={TEST_CASES}
            consoleLines={CONSOLE_LINES}
          />
        </div>
      </div>
    </main>
  );
}

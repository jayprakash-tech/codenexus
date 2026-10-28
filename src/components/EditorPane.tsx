import { FileCode2 } from "lucide-react";

export interface EditorPaneProps {
  /** Language shown in the fake editor tab (drives the starter snippet). */
  language: string;
  /** Number of gutter line numbers to render in the placeholder. */
  lineCount?: number;
}

const STARTER_SNIPPETS: Record<string, string> = {
  Python: "class Solution:",
  C: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {",
  SQL: "SELECT num, name FROM problems",
};

/**
 * Right panel – top area. A styled placeholder that mimics a code editor
 * (gutter line numbers + starter snippet). Monaco will replace this in Sprint 2.
 */
export default function EditorPane({
  language,
  lineCount = 16,
}: EditorPaneProps) {
  const starterLine =
    STARTER_SNIPPETS[language] ?? "// Write your solution here";
  const lines: number[] = Array.from(
    { length: lineCount },
    (_, index) => index + 1,
  );

  return (
    <div className="flex min-h-[320px] flex-col overflow-hidden bg-gray-950 md:h-3/5 md:min-h-0">
      {/* Fake tab bar */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-900 px-3">
        <FileCode2 className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-300">
          main.{language.toLowerCase()}
        </span>
        <span className="ml-auto hidden text-[10px] uppercase tracking-wide text-gray-500 sm:inline">
          Editor placeholder
        </span>
      </div>

      {/* Editor body: gutter + code area */}
      <div className="flex min-h-0 flex-1 overflow-hidden font-mono text-sm leading-6">
        {/* Line-number gutter */}
        <div
          aria-hidden="true"
          className="w-12 shrink-0 select-none border-r border-gray-800 bg-gray-900 py-3 pr-3 text-right text-gray-600"
        >
          {lines.map((lineNumber) => (
            <div key={lineNumber}>{lineNumber}</div>
          ))}
        </div>

        {/* Code area */}
        <div className="flex-1 px-4 py-3">
          <div className="text-gray-500">{"// " + starterLine}</div>
          <div className="pl-4 text-gray-600">{"// TODO: implement me"}</div>
          {/* Monaco Editor will be integrated in Sprint 2 */}
        </div>
      </div>

    </div>
  );
}

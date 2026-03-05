"use client";

import { useState } from "react";

function fakeAIContent(keyword: string) {
  return `Unlock the best strategies for "${keyword}" with our in-depth guide and expert tips. Discover how PageForge generates conversion-optimized content at scale.`;
}

export default function AIContentPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate latency for AI
    await new Promise((r) => setTimeout(r, 900));
    setResult(fakeAIContent(keyword.trim()));
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">AI Content</h1>
      <p className="text-muted-foreground">
        Enter a keyword or topic below and generate optimized SEO content with AI.
      </p>
      <div className="border rounded-lg bg-muted p-6">
        <label className="block font-semibold mb-1">Keyword / Topic</label>
        <input
          className="w-full rounded border px-3 py-2 mb-3"
          placeholder="e.g. best project management tools"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="rounded bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-50"
          disabled={!keyword.trim() || loading}
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </div>
      {result && (
        <div className="border-l-4 border-primary bg-primary/5 rounded p-4 mt-4">
          <div className="font-bold mb-2">Generated Content</div>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
}
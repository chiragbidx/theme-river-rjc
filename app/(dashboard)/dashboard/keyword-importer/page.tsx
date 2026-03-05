"use client";

import { useState } from "react";

export default function KeywordImporterPage() {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function parseCSV(text: string): string[] {
    return text
      .split(/[\r\n,;]+/)
      .map((k) => k.trim())
      .filter(Boolean);
  }

  const handleImport = () => {
    try {
      let extracted: string[] = [];
      if (input.includes(",") || input.includes(";")) {
        extracted = parseCSV(input);
      } else {
        extracted = input
          .split(/\r?\n/)
          .map((k) => k.trim())
          .filter(Boolean);
      }
      if (!extracted.length) throw new Error("No keywords found.");
      setKeywords(extracted);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setKeywords([]);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Keyword Importer</h1>
      <p className="text-muted-foreground">
        Paste or upload your target keywords. Supports line breaks, commas, or semicolon-separated lists. Import and track keywords easily for every campaign.
      </p>
      <div className="border rounded-lg bg-muted p-6">
        <label className="block font-semibold mb-1">Paste keywords (or upload CSV*)</label>
        <textarea
          className="w-full rounded border px-3 py-2 resize-y mb-3"
          rows={6}
          placeholder="Keyword 1&#10;Keyword 2,Keyword 3;Keyword 4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="rounded bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-50"
          disabled={!input.trim()}
          onClick={handleImport}
        >
          Import Keywords
        </button>
        <div className="mt-1 text-xs text-muted-foreground">
          <span className="font-medium">*</span> File upload support coming soon.
        </div>
        {error && (
          <div className="text-red-600 mt-2">{error}</div>
        )}
      </div>
      {keywords.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Imported Keywords</h2>
          <ul className="list-disc ml-5 space-y-1 text-primary">
            {keywords.map((k, idx) => (
              <li key={k + idx}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
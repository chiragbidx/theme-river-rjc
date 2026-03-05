"use client";

import { useState } from "react";

export default function BulkGenerationPage() {
  // Mock template options
  const [templates] = useState([
    { id: 1, name: "City Guide Template" },
    { id: 2, name: "Product Comparison Template" },
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [keywords, setKeywords] = useState("");
  const [generated, setGenerated] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!keywords.trim()) return;
    const words = keywords
      .split("\n")
      .map((k) => k.trim())
      .filter(Boolean)
      .slice(0, 1000);

    // Simulate page generation
    setGenerated(words.map((word, i) => `/${templates.find(t=>t.id===selectedTemplate)?.name.replace(/\s+/g,"-").toLowerCase()}/${word.replace(/\s+/g, "-").toLowerCase()}-${i + 1}`));
    setKeywords("");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Bulk Page Generation</h1>
      <p className="text-muted-foreground">
        Generate thousands of SEO-optimized pages at scale. Select a template and add your keywords below.
      </p>
      <div className="border rounded-lg bg-muted p-6">
        <label className="block font-semibold mb-1">Template</label>
        <select
          className="w-full rounded border px-3 py-2 mb-3"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(Number(e.target.value))}
        >
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.id}>
              {tpl.name}
            </option>
          ))}
        </select>
        <label className="block font-semibold mb-1">Paste Your Keywords (one per line)</label>
        <textarea
          className="w-full rounded border px-3 py-2 resize-y mb-3"
          rows={6}
          placeholder="Keyword 1&#10;Keyword 2&#10;Keyword 3"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <button
          className="rounded bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-50"
          disabled={!keywords.trim()}
          onClick={handleGenerate}
        >
          Generate Pages
        </button>
      </div>
      {generated.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Generated URLs</h2>
          <ul className="space-y-1 text-primary">
            {generated.map((url) => (
              <li key={url}>
                <code>{url}</code>
              </li>
            ))}
          </ul>
          <div className="text-muted-foreground mt-3 text-sm">
            These are simulated programmatic SEO URLs (saving to database requires schema approval).
          </div>
        </div>
      )}
    </div>
  );
}
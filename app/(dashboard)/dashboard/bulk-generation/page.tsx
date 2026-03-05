"use client";

import { useEffect, useState } from "react";
import { bulkGeneratePages, getPages } from "./actions";
import { getTemplates } from "../template-builder/actions";
import { getKeywords } from "../keyword-importer/actions";

type Template = {
  id: string;
  name: string;
  structure: any;
};

type Keyword = {
  id: string;
  value: string;
};

type Page = {
  id: string;
  url: string;
  aiContent?: string;
  createdAt: string;
  publishedAt: string;
};

export default function BulkGenerationPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [result, setResult] = useState<{ success?: boolean; error?: string; count?: number } | null>(null);
  const [generated, setGenerated] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);

  async function refreshAll() {
    const tplList = (await getTemplates()) as Template[];
    setTemplates(tplList || []);
    setSelectedTemplate((tplList?.[0]?.id as string) || null);
    const kwList = (await getKeywords()) as Keyword[];
    setKeywords(kwList || []);
    const pages = (await getPages()) as Page[];
    setGenerated(pages || []);
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line
  }, []);

  const handleBulkGenerate = async () => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.set("templateId", selectedTemplate || "");
    selectedKeywords.forEach((keyword) => formData.append("keywords", keyword));

    const res = await bulkGeneratePages(formData);
    setResult(res);
    await refreshAll();
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Bulk Page Generation</h1>
      <p className="text-muted-foreground">
        Generate thousands of SEO-optimized pages at scale. Select a template and keywords below.
      </p>
      <div className="border rounded-lg bg-muted p-6">
        <label className="block font-semibold mb-1">Template</label>
        <select
          className="w-full rounded border px-3 py-2 mb-3"
          value={selectedTemplate || ""}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.id}>
              {tpl.name}
            </option>
          ))}
        </select>
        <label className="block font-semibold mb-1">Select Keywords</label>
        <div className="border rounded mb-3 p-2 min-h-[48px] max-h-40 overflow-y-auto flex gap-2 flex-wrap bg-white">
          {keywords.length === 0 ? (
            <span className="text-muted-foreground">No keywords found.</span>
          ) : (
            keywords.map((k) => (
              <button
                key={k.id}
                className={`px-2 py-1 rounded border text-xs font-mono mb-1 mr-1 ${
                  selectedKeywords.includes(k.value)
                    ? "bg-primary text-white border-primary"
                    : "bg-muted border-zinc-300"
                }`}
                type="button"
                onClick={() => {
                  setSelectedKeywords((prev) =>
                    prev.includes(k.value)
                      ? prev.filter((v) => v !== k.value)
                      : [...prev, k.value]
                  );
                }}
              >
                {k.value}
              </button>
            ))
          )}
        </div>
        <button
          className="rounded bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-50"
          disabled={!selectedTemplate || selectedKeywords.length === 0 || loading}
          onClick={handleBulkGenerate}
        >
          {loading ? "Generating..." : "Generate Pages"}
        </button>
        {result?.error && (
          <div className="text-red-600 mt-2">{result.error}</div>
        )}
        {result?.success && (
          <div className="text-green-700 mt-2">
            {result.count} pages generated!
          </div>
        )}
      </div>
      {generated.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Generated Pages</h2>
          <ul className="space-y-1 text-primary">
            {generated.map((page) => (
              <li key={page.id}>
                <code>{page.url}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
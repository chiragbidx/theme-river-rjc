"use client";

import { useEffect, useState } from "react";
import { getPages } from "../bulk-generation/actions";

type Page = {
  id: string;
  url: string;
  aiContent?: string;
};

export default function AIContentPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function refreshPages() {
    const pages = (await getPages()) as Page[];
    setPages(pages || []);
  }

  useEffect(() => {
    refreshPages();
  }, []);

  const handlePreview = (content: string) => {
    setPreview(content);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">AI Content</h1>
      <p className="text-muted-foreground">
        View SEO-optimized, AI-generated content for your programmatic pages below.
      </p>
      <div className="border rounded-lg bg-muted p-6">
        <label className="block font-semibold mb-1">Choose a Page</label>
        <select
          className="w-full rounded border px-3 py-2 mb-3"
          value={selectedPage || ""}
          onChange={(e) => {
            setSelectedPage(e.target.value);
            setPreview(null);
          }}
        >
          <option value="">-- Select --</option>
          {pages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.url}
            </option>
          ))}
        </select>
        {selectedPage && (
          <button
            className="rounded bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 ml-1"
            onClick={() => {
              const found = pages.find((p) => p.id === selectedPage);
              setLoading(true);
              setTimeout(() => {
                handlePreview(found?.aiContent || "");
                setLoading(false);
              }, 700);
            }}
          >
            {loading ? "Loading..." : "Preview Content"}
          </button>
        )}
      </div>
      {preview && (
        <div className="border-l-4 border-primary bg-primary/5 rounded p-4 mt-4">
          <div className="font-bold mb-2">Generated Content</div>
          <div>{preview}</div>
        </div>
      )}
    </div>
  );
}
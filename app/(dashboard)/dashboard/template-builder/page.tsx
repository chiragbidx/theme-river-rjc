"use client";

import { useEffect, useState } from "react";
import {
  createTemplate,
  getTemplates,
  deleteTemplate,
} from "./actions";

type Template = {
  id: string;
  name: string;
  structure: any;
  createdAt: string;
};

export default function TemplateBuilderPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState("");
  const [structure, setStructure] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshTemplates() {
    setLoading(true);
    const data = await getTemplates();
    setTemplates((Array.isArray(data) ? data : []) as Template[]);
    setLoading(false);
  }

  useEffect(() => {
    refreshTemplates();
  }, []);

  const handleSave = async () => {
    setError(null);
    if (!name.trim() || !structure.trim()) return;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("structure", structure);
    const result = await createTemplate(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setName("");
      setStructure("");
      setEditingId(null);
      await refreshTemplates();
    }
  };

  const handleEdit = (tpl: Template) => {
    setEditingId(tpl.id);
    setName(tpl.name);
    setStructure(JSON.stringify(tpl.structure, null, 2));
  };

  const handleDelete = async (id: string) => {
    await deleteTemplate(id);
    if (editingId === id) {
      setName("");
      setStructure("");
      setEditingId(null);
    }
    await refreshTemplates();
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Template Builder</h1>
      <p className="text-muted-foreground">
        Create and manage SEO page templates for programmatic page generation.
      </p>
      <div className="border rounded-lg bg-muted p-6 space-y-3">
        <label className="block font-semibold mb-1">Template Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2 mb-3 text-base"
          placeholder="e.g. City Guide Template"
        />
        <label className="block font-semibold mb-1">Page Structure (JSON or Text)</label>
        <textarea
          value={structure}
          onChange={(e) => setStructure(e.target.value)}
          className="w-full rounded border px-3 py-2 resize-y mb-3 text-base"
          rows={4}
          placeholder='e.g. { "title": "{city} Guide", "heading": "...", "cta": "Sign up"}'
        />
        <button
          className="rounded bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-50"
          disabled={!name.trim() || !structure.trim()}
          onClick={handleSave}
        >
          {editingId !== null ? "Update Template" : "Save Template"}
        </button>
        {editingId !== null && (
          <button
            className="ml-4 text-sm underline text-muted-foreground"
            onClick={() => {
              setEditingId(null);
              setName("");
              setStructure("");
            }}
          >
            Cancel
          </button>
        )}
        {error && (
          <div className="text-red-600 mt-2">{error}</div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Saved Templates</h2>
        {loading ? (
          <div>Loading templates...</div>
        ) : templates.length === 0 ? (
          <div className="text-muted-foreground">No templates yet.</div>
        ) : (
          <ul className="space-y-3">
            {templates.map((tpl) => (
              <li
                key={tpl.id}
                className="border bg-white rounded p-4 flex flex-col gap-1"
              >
                <div className="flex flex-row justify-between items-center">
                  <span className="font-bold">{tpl.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tpl)}
                      className="text-primary font-semibold underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tpl.id)}
                      className="text-red-500 font-semibold underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <pre className="mt-2 bg-muted text-sm p-2 rounded overflow-x-auto">
                  {JSON.stringify(tpl.structure, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
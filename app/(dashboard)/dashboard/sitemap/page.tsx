"use client";

import { useState } from "react";

const mockPages = [
  "/city-guide/new-york",
  "/city-guide/san-francisco",
  "/city-guide/berlin",
  "/product-comparison/best-payment-gateways",
  "/product-comparison/best-marketing-tools",
];

export default function SitemapPage() {
  const [pages] = useState<string[]>(mockPages);

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Sitemap</h1>
      <p className="text-muted-foreground">
        Preview all programmatically generated page URLs. This sitemap will auto-update as you generate more pages.
      </p>
      <div className="border rounded-lg bg-muted p-6">
        <ul className="list-decimal ml-6 space-y-1 text-primary text-sm">
          {pages.map((url) => (
            <li key={url}>
              <code>{url}</code>
            </li>
          ))}
        </ul>
        <div className="text-muted-foreground text-xs mt-4">
          <span className="font-medium">Note:</span> This is a simulated preview. Direct XML download or /sitemap.xml endpoint will come with backend connection.
        </div>
      </div>
    </div>
  );
}
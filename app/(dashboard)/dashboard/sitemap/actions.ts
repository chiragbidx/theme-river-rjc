"use server";

import { db } from "@/lib/db/drizzle";
import { getSession } from "@/lib/auth/session";

export async function getSitemapUrls() {
  const user = await getSession();
  if (!user) throw new Error("Unauthorized");

  const pages = await db.page.findMany({
    where: { userId: user.id },
    select: { url: true, createdAt: true, publishedAt: true },
    orderBy: { createdAt: "desc" },
  });
  return pages;
}
"use server";

import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";

export async function getSitemapUrls() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");

  const pages = await db.page.findMany({
    where: { userId: user.id },
    select: { url: true, createdAt: true, publishedAt: true },
    orderBy: { createdAt: "desc" },
  });
  return pages;
}
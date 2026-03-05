"use server";

import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const keywordsSchema = z.object({
  keywords: z.array(z.string().min(1)),
});

export async function importKeywords(formData: FormData) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  const rawKeywords = (formData.getAll("keywords") as string[]).filter(Boolean);
  const parsed = keywordsSchema.safeParse({ keywords: rawKeywords });
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  try {
    await db.keyword.createMany({
      data: parsed.data.keywords.map(value => ({
        value,
        userId: user.id,
      })),
      skipDuplicates: true,
    });
    revalidatePath("/dashboard/keyword-importer");
    return { success: true };
  } catch (e: any) {
    return { error: e.message || "Import failed" };
  }
}

export async function getKeywords() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");

  const keywords = await db.keyword.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return keywords;
}

export async function deleteKeyword(id: string) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  await db.keyword.deleteMany({
    where: { id, userId: user.id },
  });
  revalidatePath("/dashboard/keyword-importer");
  return { success: true };
}
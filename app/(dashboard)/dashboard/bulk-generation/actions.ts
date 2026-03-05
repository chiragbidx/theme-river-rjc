"use server";

import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const bulkSchema = z.object({
  templateId: z.string(),
  keywords: z.array(z.string().min(1)),
});

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

async function generateAIContent(keyword: string, templateStructure: any) {
  // Placeholder for actual AI API integration
  return `SEO optimized content for "${keyword}" using PageForge's template.`;
}

export async function bulkGeneratePages(formData: FormData) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");

  const templateId = formData.get("templateId") as string;
  const rawKeywords = formData.getAll("keywords") as string[];
  const parsed = bulkSchema.safeParse({
    templateId: templateId,
    keywords: rawKeywords,
  });
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const template = await db.template.findUnique({
    where: { id: templateId, userId: user.id },
  });
  if (!template) return { error: "Template not found." };

  let createdCount = 0;
  for (const keyword of parsed.data.keywords) {
    const url = `/${slugify(template.name)}/${slugify(keyword)}`;
    const aiContent = await generateAIContent(keyword, template.structure);

    await db.page.upsert({
      where: { url },
      update: {},
      create: {
        url,
        templateId: template.id,
        userId: user.id,
        keyword: {
          connectOrCreate: {
            where: { value_userId: { value: keyword, userId: user.id } },
            create: { value: keyword, userId: user.id },
          },
        },
        aiContent,
        publishedAt: new Date(),
      },
    });
    createdCount++;
  }
  revalidatePath("/dashboard/sitemap");
  revalidatePath("/dashboard/bulk-generation");
  return { success: true, count: createdCount };
}

export async function getPages() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  const pages = await db.page.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { keyword: true, template: true },
  });
  return pages;
}
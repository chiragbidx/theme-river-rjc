"use server";

import { db } from "@/lib/db/drizzle";
import { getSessionUser } from "@/lib/auth/session";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const templateSchema = z.object({
  name: z.string().min(2, "Name required."),
  structure: z.string().min(1, "Structure required."),
});

export async function createTemplate(formData: FormData) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");

  const data = {
    name: formData.get("name") as string,
    structure: formData.get("structure") as string,
  };
  const parsed = templateSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  try {
    await db.template.create({
      data: {
        name: parsed.data.name,
        structure: JSON.parse(parsed.data.structure),
        userId: user.id,
      },
    });
    revalidatePath("/dashboard/template-builder");
    return { success: true };
  } catch (e: any) {
    return { error: e.message || "Failed to create template" };
  }
}

export async function getTemplates() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");

  const templates = await db.template.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return templates;
}

export async function deleteTemplate(id: string) {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  await db.template.deleteMany({
    where: { id, userId: user.id },
  });
  revalidatePath("/dashboard/template-builder");
  return { success: true };
}
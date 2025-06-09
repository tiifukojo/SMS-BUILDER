"use server"

import { executeQuery, executeInsert } from "@/lib/database"
import type { SMSTemplate } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function getTemplates(): Promise<SMSTemplate[]> {
  const query = "SELECT * FROM sms_templates ORDER BY created_at DESC"
  return await executeQuery<SMSTemplate>(query)
}

export async function getTemplateById(id: number): Promise<SMSTemplate | null> {
  const query = "SELECT * FROM sms_templates WHERE id = ?"
  const results = await executeQuery<SMSTemplate>(query, [id])
  return results[0] || null
}

export async function createTemplate(data: {
  name: string
  message_template: string
  description?: string
  category: string
}): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    const query = `
      INSERT INTO sms_templates (name, message_template, description, category)
      VALUES (?, ?, ?, ?)
    `
    const id = await executeInsert(query, [data.name, data.message_template, data.description || null, data.category])

    revalidatePath("/templates")
    return { success: true, id }
  } catch (error) {
    console.error("Error creating template:", error)
    return { success: false, error: "Failed to create template" }
  }
}

export async function updateTemplate(
  id: number,
  data: {
    name: string
    message_template: string
    description?: string
    category: string
    is_active: boolean
  },
): Promise<{ success: boolean; error?: string }> {
  try {
    const query = `
      UPDATE sms_templates 
      SET name = ?, message_template = ?, description = ?, category = ?, is_active = ?
      WHERE id = ?
    `
    await executeQuery(query, [
      data.name,
      data.message_template,
      data.description || null,
      data.category,
      data.is_active,
      id,
    ])

    revalidatePath("/templates")
    return { success: true }
  } catch (error) {
    console.error("Error updating template:", error)
    return { success: false, error: "Failed to update template" }
  }
}

export async function deleteTemplate(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const query = "DELETE FROM sms_templates WHERE id = ?"
    await executeQuery(query, [id])

    revalidatePath("/templates")
    return { success: true }
  } catch (error) {
    console.error("Error deleting template:", error)
    return { success: false, error: "Failed to delete template" }
  }
}

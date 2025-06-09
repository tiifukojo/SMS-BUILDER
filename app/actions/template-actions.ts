"use server"

import { MockDataStore } from "@/lib/mock-data"
import type { SMSTemplate } from "@/lib/types"
import { revalidatePath } from "next/cache"

const dataStore = MockDataStore.getInstance()

export async function getTemplates(): Promise<SMSTemplate[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return dataStore.getTemplates()
}

export async function getTemplateById(id: number): Promise<SMSTemplate | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return dataStore.getTemplateById(id)
}

export async function createTemplate(data: {
  name: string
  message_template: string
  description?: string
  category: string
}): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const template = dataStore.createTemplate({
      name: data.name,
      message_template: data.message_template,
      description: data.description,
      category: data.category as SMSTemplate["category"],
      is_active: true,
    })

    revalidatePath("/templates")
    return { success: true, id: template.id }
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
    await new Promise((resolve) => setTimeout(resolve, 200))

    const success = dataStore.updateTemplate(id, {
      name: data.name,
      message_template: data.message_template,
      description: data.description,
      category: data.category as SMSTemplate["category"],
      is_active: data.is_active,
    })

    if (!success) {
      return { success: false, error: "Template not found" }
    }

    revalidatePath("/templates")
    return { success: true }
  } catch (error) {
    console.error("Error updating template:", error)
    return { success: false, error: "Failed to update template" }
  }
}

export async function deleteTemplate(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 150))

    const success = dataStore.deleteTemplate(id)

    if (!success) {
      return { success: false, error: "Template not found" }
    }

    revalidatePath("/templates")
    return { success: true }
  } catch (error) {
    console.error("Error deleting template:", error)
    return { success: false, error: "Failed to delete template" }
  }
}

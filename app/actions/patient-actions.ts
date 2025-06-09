"use server"

import { executeQuery } from "@/lib/database"
import type { Patient, Billing, Accession } from "@/lib/types"

export async function getPatients(): Promise<Patient[]> {
  const query = "SELECT * FROM patients ORDER BY name"
  return await executeQuery<Patient>(query)
}

export async function getPatientById(id: number): Promise<Patient | null> {
  const query = "SELECT * FROM patients WHERE id = ?"
  const results = await executeQuery<Patient>(query, [id])
  return results[0] || null
}

export async function getBillingByPatientId(patientId: number): Promise<Billing[]> {
  const query = "SELECT * FROM billing WHERE patient_id = ? ORDER BY created_at DESC"
  return await executeQuery<Billing>(query, [patientId])
}

export async function getAccessionsByPatientId(patientId: number): Promise<Accession[]> {
  const query = "SELECT * FROM accessions WHERE patient_id = ? ORDER BY created_at DESC"
  return await executeQuery<Accession>(query, [patientId])
}

export async function getPatientWithRelatedData(patientId: number) {
  const patient = await getPatientById(patientId)
  if (!patient) return null

  const billing = await getBillingByPatientId(patientId)
  const accessions = await getAccessionsByPatientId(patientId)

  return {
    patient,
    billing,
    accessions,
  }
}

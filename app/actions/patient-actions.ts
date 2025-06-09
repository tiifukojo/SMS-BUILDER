"use server"

import { MockDataStore } from "@/lib/mock-data"
import type { Patient, Billing, Accession } from "@/lib/types"

const dataStore = MockDataStore.getInstance()

export async function getPatients(): Promise<Patient[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return dataStore.getPatients()
}

export async function getPatientById(id: number): Promise<Patient | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return dataStore.getPatientById(id)
}

export async function getBillingByPatientId(patientId: number): Promise<Billing[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return dataStore.getBillingByPatientId(patientId)
}

export async function getAccessionsByPatientId(patientId: number): Promise<Accession[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return dataStore.getAccessionsByPatientId(patientId)
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

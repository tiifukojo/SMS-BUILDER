import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lab_sms_platform",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    return connection
  } catch (error) {
    console.error("Database connection failed:", error)
    throw new Error("Failed to connect to database")
  }
}

export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(query, params)
    return rows as T[]
  } finally {
    await connection.end()
  }
}

export async function executeInsert(query: string, params: any[] = []): Promise<number> {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(query, params)
    return (result as any).insertId
  } finally {
    await connection.end()
  }
}

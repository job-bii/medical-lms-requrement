import { neon } from "@neondatabase/serverless"

// Check if we're in a server environment and have the DATABASE_URL
const getDatabaseUrl = () => {
  if (typeof window !== "undefined") {
    return null
  }
  return process.env.DATABASE_URL || null
}

const databaseUrl = getDatabaseUrl()
export const sql = databaseUrl ? neon(databaseUrl) : null

// Mock data for demo purposes when database is not available
// Password for all demo accounts: "Demo123!"
// This is the actual bcrypt hash for "Demo123!" with salt rounds 12
const DEMO_PASSWORD_HASH = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9PS"

const mockUsers = [
  {
    id: "1",
    email: "admin@university.edu",
    password_hash: DEMO_PASSWORD_HASH,
    first_name: "System",
    last_name: "Administrator",
    role: "admin" as const,
    phone_number: "+1-555-0001",
    profile_picture_url: null,
    department: "Administration",
    student_id: null,
    staff_id: "ADMIN001",
    academic_year: null,
    semester: null,
    is_approved: true,
    is_active: true,
    two_factor_enabled: false,
    two_factor_secret: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login: null,
    login_attempts: 0,
    locked_until: null,
  },
  {
    id: "2",
    email: "student@university.edu",
    password_hash: DEMO_PASSWORD_HASH,
    first_name: "John",
    last_name: "Student",
    role: "student" as const,
    phone_number: "+1-555-0002",
    profile_picture_url: null,
    department: "Clinical Medicine",
    student_id: "MED2024001",
    staff_id: null,
    academic_year: "2024-2025",
    semester: "fall",
    is_approved: true,
    is_active: true,
    two_factor_enabled: false,
    two_factor_secret: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login: null,
    login_attempts: 0,
    locked_until: null,
  },
  {
    id: "3",
    email: "instructor@university.edu",
    password_hash: DEMO_PASSWORD_HASH,
    first_name: "Jane",
    last_name: "Instructor",
    role: "instructor" as const,
    phone_number: "+1-555-0003",
    profile_picture_url: null,
    department: "Anatomy",
    student_id: null,
    staff_id: "INST001",
    academic_year: null,
    semester: null,
    is_approved: true,
    is_active: true,
    two_factor_enabled: false,
    two_factor_secret: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login: null,
    login_attempts: 0,
    locked_until: null,
  },
]

// Types for our database
export interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  role: "student" | "instructor" | "admin"
  phone_number?: string | null
  profile_picture_url?: string | null
  department?: string | null
  student_id?: string | null
  staff_id?: string | null
  academic_year?: string | null
  semester?: string | null
  is_approved: boolean
  is_active: boolean
  two_factor_enabled: boolean
  two_factor_secret?: string | null
  created_at: string
  updated_at: string
  last_login?: string | null
  login_attempts: number
  locked_until?: string | null
}

export interface LoginAttempt {
  id: string
  user_id?: string | null
  email: string
  ip_address?: string | null
  user_agent?: string | null
  success: boolean
  failure_reason?: string | null
  attempted_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  expires_at: string
  created_at: string
  last_accessed: string
  ip_address?: string | null
  user_agent?: string | null
}

// Database helper functions with fallback to mock data
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    if (sql) {
      const result = await sql`
        SELECT * FROM users 
        WHERE email = ${email.toLowerCase()}
        LIMIT 1
      `
      return result[0] || null
    } else {
      // Fallback to mock data
      const user = mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())
      return user || null
    }
  } catch (error) {
    console.error("Error finding user by email:", error)
    // Fallback to mock data on error
    const user = mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())
    return user || null
  }
}

export async function findUserById(id: string): Promise<User | null> {
  try {
    if (sql) {
      const result = await sql`
        SELECT * FROM users 
        WHERE id = ${id}
        LIMIT 1
      `
      return result[0] || null
    } else {
      // Fallback to mock data
      return mockUsers.find((user) => user.id === id) || null
    }
  } catch (error) {
    console.error("Error finding user by ID:", error)
    // Fallback to mock data on error
    return mockUsers.find((user) => user.id === id) || null
  }
}

export async function createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User | null> {
  try {
    if (sql) {
      const result = await sql`
        INSERT INTO users (
          email, password_hash, first_name, last_name, role,
          phone_number, profile_picture_url, department, student_id, staff_id,
          academic_year, semester, is_approved, is_active, two_factor_enabled,
          login_attempts
        ) VALUES (
          ${userData.email}, ${userData.password_hash}, ${userData.first_name}, 
          ${userData.last_name}, ${userData.role}, ${userData.phone_number || null},
          ${userData.profile_picture_url || null}, ${userData.department || null},
          ${userData.student_id || null}, ${userData.staff_id || null},
          ${userData.academic_year || null}, ${userData.semester || null},
          ${userData.is_approved}, ${userData.is_active}, ${userData.two_factor_enabled},
          ${userData.login_attempts}
        )
        RETURNING *
      `
      return result[0] || null
    } else {
      // Mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...userData,
      }
      mockUsers.push(newUser)
      return newUser
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  try {
    if (sql) {
      // Build dynamic update query
      const updateFields = Object.keys(updates).filter((key) => key !== "id" && key !== "created_at")
      if (updateFields.length === 0) return null

      const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(", ")
      const values = [id, ...updateFields.map((field) => updates[field as keyof User])]

      const result = await sql`
        UPDATE users 
        SET ${sql.unsafe(setClause)}, updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `.apply(null, values)

      return result[0] || null
    } else {
      // Mock user update
      const userIndex = mockUsers.findIndex((user) => user.id === id)
      if (userIndex !== -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockUsers[userIndex]
      }
      return null
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return null
  }
}

export async function logLoginAttempt(attempt: Omit<LoginAttempt, "id" | "attempted_at">): Promise<void> {
  try {
    if (sql) {
      await sql`
        INSERT INTO login_attempts (
          user_id, email, ip_address, user_agent, success, failure_reason
        ) VALUES (
          ${attempt.user_id || null}, ${attempt.email}, ${attempt.ip_address || null},
          ${attempt.user_agent || null}, ${attempt.success}, ${attempt.failure_reason || null}
        )
      `
    } else {
      // Mock login attempt logging
      console.log("Login attempt logged (mock):", {
        ...attempt,
        attempted_at: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Error logging login attempt:", error)
  }
}

// Mock sessions storage for demo
const mockSessions: (UserSession & { user: User })[] = []

export async function createSession(
  sessionData: Omit<UserSession, "id" | "created_at" | "last_accessed">,
): Promise<UserSession | null> {
  try {
    if (sql) {
      const result = await sql`
        INSERT INTO user_sessions (
          user_id, session_token, expires_at, ip_address, user_agent
        ) VALUES (
          ${sessionData.user_id}, ${sessionData.session_token}, ${sessionData.expires_at},
          ${sessionData.ip_address || null}, ${sessionData.user_agent || null}
        )
        RETURNING *
      `
      return result[0] || null
    } else {
      // Mock session creation
      const user = mockUsers.find((u) => u.id === sessionData.user_id)
      if (!user) return null

      const newSession: UserSession & { user: User } = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        last_accessed: new Date().toISOString(),
        ...sessionData,
        user,
      }
      mockSessions.push(newSession)
      return newSession
    }
  } catch (error) {
    console.error("Error creating session:", error)
    return null
  }
}

export async function findSessionByToken(token: string): Promise<(UserSession & { user: User }) | null> {
  try {
    if (sql) {
      const result = await sql`
        SELECT 
          s.*,
          u.id as user_id,
          u.email as user_email,
          u.first_name as user_first_name,
          u.last_name as user_last_name,
          u.role as user_role,
          u.phone_number as user_phone_number,
          u.profile_picture_url as user_profile_picture_url,
          u.department as user_department,
          u.student_id as user_student_id,
          u.staff_id as user_staff_id,
          u.academic_year as user_academic_year,
          u.semester as user_semester,
          u.is_approved as user_is_approved,
          u.is_active as user_is_active,
          u.two_factor_enabled as user_two_factor_enabled,
          u.created_at as user_created_at,
          u.updated_at as user_updated_at,
          u.last_login as user_last_login,
          u.login_attempts as user_login_attempts,
          u.locked_until as user_locked_until
        FROM user_sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = ${token}
          AND s.expires_at > NOW()
        LIMIT 1
      `

      if (!result[0]) return null

      const row = result[0]
      return {
        id: row.id,
        user_id: row.user_id,
        session_token: row.session_token,
        expires_at: row.expires_at,
        created_at: row.created_at,
        last_accessed: row.last_accessed,
        ip_address: row.ip_address,
        user_agent: row.user_agent,
        user: {
          id: row.user_id,
          email: row.user_email,
          password_hash: "", // Don't return password hash
          first_name: row.user_first_name,
          last_name: row.user_last_name,
          role: row.user_role,
          phone_number: row.user_phone_number,
          profile_picture_url: row.user_profile_picture_url,
          department: row.user_department,
          student_id: row.user_student_id,
          staff_id: row.user_staff_id,
          academic_year: row.user_academic_year,
          semester: row.user_semester,
          is_approved: row.user_is_approved,
          is_active: row.user_is_active,
          two_factor_enabled: row.user_two_factor_enabled,
          two_factor_secret: undefined,
          created_at: row.user_created_at,
          updated_at: row.user_updated_at,
          last_login: row.user_last_login,
          login_attempts: row.user_login_attempts,
          locked_until: row.user_locked_until,
        },
      }
    } else {
      // Mock session lookup
      const session = mockSessions.find((s) => s.session_token === token)
      if (!session) return null

      // Check if session is expired
      if (new Date(session.expires_at) <= new Date()) {
        const index = mockSessions.findIndex((s) => s.session_token === token)
        if (index !== -1) mockSessions.splice(index, 1)
        return null
      }

      return session
    }
  } catch (error) {
    console.error("Error finding session by token:", error)
    return null
  }
}

export async function updateSessionLastAccessed(token: string): Promise<void> {
  try {
    if (sql) {
      await sql`
        UPDATE user_sessions 
        SET last_accessed = NOW()
        WHERE session_token = ${token}
      `
    } else {
      // Mock session update
      const session = mockSessions.find((s) => s.session_token === token)
      if (session) {
        session.last_accessed = new Date().toISOString()
      }
    }
  } catch (error) {
    console.error("Error updating session last accessed:", error)
  }
}

export async function deleteSession(token: string): Promise<void> {
  try {
    if (sql) {
      await sql`
        DELETE FROM user_sessions 
        WHERE session_token = ${token}
      `
    } else {
      // Mock session deletion
      const index = mockSessions.findIndex((s) => s.session_token === token)
      if (index !== -1) mockSessions.splice(index, 1)
    }
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}

export async function deleteExpiredSessions(): Promise<void> {
  try {
    if (sql) {
      await sql`
        DELETE FROM user_sessions 
        WHERE expires_at < NOW()
      `
    } else {
      // Mock expired session cleanup
      const now = new Date()
      for (let i = mockSessions.length - 1; i >= 0; i--) {
        if (new Date(mockSessions[i].expires_at) <= now) {
          mockSessions.splice(i, 1)
        }
      }
    }
  } catch (error) {
    console.error("Error deleting expired sessions:", error)
  }
}

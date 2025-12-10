import bcrypt from "bcryptjs"
import { findUserByEmail, createUser, logLoginAttempt, type User } from "./database"

// Types
export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: "student" | "instructor" | "admin"
  phoneNumber: string
  department: string
  studentId?: string
  staffId?: string
  academicYear?: string
  semester?: string
  profilePictureUrl?: string
}

export interface LoginData {
  email: string
  password: string
  rememberMe: boolean
}

export interface PasswordValidation {
  isValid: boolean
  errors: string[]
}

export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "AuthError"
  }
}

// Constants
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const REMEMBER_ME_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

// In-memory session storage for demo
const activeSessions = new Map<string, { userId: string; expiresAt: number }>()

// Validation functions
export function validateInstitutionalEmail(email: string): boolean {
  const validDomains = ["university.edu", "medschool.edu", "hospital.org"]
  const domain = email.split("@")[1]?.toLowerCase()
  return validDomains.some((validDomain) => domain === validDomain)
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("at least 8 characters")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error("Password verification error:", error)
    return false
  }
}

// Generate session token
export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Check if user is locked out
function isUserLockedOut(user: User): boolean {
  if (!user.locked_until) return false
  return new Date(user.locked_until) > new Date()
}

// Register user
export async function registerUser(data: RegisterData): Promise<{ user: User; requiresApproval: boolean }> {
  try {
    // Validate email domain
    if (!validateInstitutionalEmail(data.email)) {
      throw new AuthError("Please use your institutional email address")
    }

    // Validate password
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      throw new AuthError(`Password must contain: ${passwordValidation.errors.join(", ")}`)
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(data.email)
    if (existingUser) {
      throw new AuthError("An account with this email already exists")
    }

    // Hash password
    const passwordHash = await hashPassword(data.password)

    // Determine if approval is required (instructors need approval)
    const requiresApproval = data.role === "instructor"

    // Create user
    const userData = {
      email: data.email.toLowerCase(),
      password_hash: passwordHash,
      first_name: data.firstName,
      last_name: data.lastName,
      role: data.role,
      phone_number: data.phoneNumber,
      profile_picture_url: data.profilePictureUrl || null,
      department: data.department,
      student_id: data.studentId || null,
      staff_id: data.staffId || null,
      academic_year: data.academicYear || null,
      semester: data.semester || null,
      is_approved: !requiresApproval, // Auto-approve students and admins
      is_active: true,
      two_factor_enabled: false,
      login_attempts: 0,
    }

    const user = await createUser(userData)
    if (!user) {
      throw new AuthError("Failed to create user account")
    }

    // Log successful registration
    await logLoginAttempt({
      user_id: user.id,
      email: user.email,
      success: true,
      failure_reason: null,
    })

    return { user, requiresApproval }
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

// Login user
export async function loginUser(
  data: LoginData,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ user: User; sessionToken: string }> {
  console.log("Login attempt:", data.email, data.password)

  // Find user by email
  const user = await findUserByEmail(data.email)

  if (!user) {
    console.log("User not found")
    throw new Error("Invalid email or password")
  }

  // Simple password check for demo
  if (data.password !== "Demo123!") {
    console.log("Invalid password")
    throw new Error("Invalid email or password")
  }

  // Generate session token
  const sessionToken = generateSessionToken()

  // Store session
  const expiresAt = Date.now() + (data.rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION)
  activeSessions.set(sessionToken, {
    userId: user.email,
    expiresAt,
  })

  console.log("Login successful for:", user.email)
  return { user, sessionToken }
}

// Verify session
export async function verifySession(sessionToken: string): Promise<User | null> {
  try {
    const session = activeSessions.get(sessionToken)

    if (!session) {
      return null
    }

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      activeSessions.delete(sessionToken)
      return null
    }

    // Get user data
    const user = await findUserByEmail(session.userId)
    return user
  } catch (error) {
    console.error("Session verification error:", error)
    return null
  }
}

// Logout user
export async function logoutUser(sessionToken: string): Promise<void> {
  try {
    // Remove session from memory
    activeSessions.delete(sessionToken)
    console.log("User logged out successfully")
  } catch (error) {
    console.error("Logout error:", error)
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const user = await findUserByEmail(userId)
    return user
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}

// Export User type for use in other files
export type { User }

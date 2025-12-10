import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: "student" | "instructor" | "admin"
  phone_number?: string
  profile_picture_url?: string
  department?: string
  student_id?: string
  staff_id?: string
  academic_year?: string
  semester?: string
  is_approved: boolean
  is_active: boolean
  two_factor_enabled: boolean
  created_at: string
  updated_at: string
  last_login?: string
  login_attempts: number
  locked_until?: string
}

export interface LoginAttempt {
  id: string
  user_id?: string
  email: string
  ip_address?: string
  user_agent?: string
  success: boolean
  failure_reason?: string
  attempted_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  expires_at: string
  created_at: string
  last_accessed: string
  ip_address?: string
  user_agent?: string
}

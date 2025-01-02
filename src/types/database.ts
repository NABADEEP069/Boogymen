export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          role: string
          rating: number | null
          total_ratings: number | null
          created_at: string
          whatsapp_number: string | null
          is_outside_campus: boolean | null
          last_status_update: string | null
          email: string
        }
        Insert: {
          id: string
          username: string
          role: string
          rating?: number | null
          total_ratings?: number | null
          created_at?: string
          whatsapp_number?: string | null
          is_outside_campus?: boolean | null
          last_status_update?: string | null
          email: string
        }
        Update: {
          id?: string
          username?: string
          role?: string
          rating?: number | null
          total_ratings?: number | null
          created_at?: string
          whatsapp_number?: string | null
          is_outside_campus?: boolean | null
          last_status_update?: string | null
          email?: string
        }
      }
      delivery_requests: {
        Row: {
          id: string
          student_id: string
          title: string
          details: string
          location: string
          deadline: string
          status: string
          created_at: string
          assigned_to: string | null
          payment_amount: number | null
        }
        Insert: {
          id?: string
          student_id: string
          title: string
          details: string
          location: string
          deadline: string
          status?: string
          created_at?: string
          assigned_to?: string | null
          payment_amount?: number | null
        }
        Update: {
          id?: string
          student_id?: string
          title?: string
          details?: string
          location?: string
          deadline?: string
          status?: string
          created_at?: string
          assigned_to?: string | null
          payment_amount?: number | null
        }
      }
    }
  }
}
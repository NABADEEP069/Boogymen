/*
  # Add email column and fix relationships

  1. Changes
    - Add email column to profiles table
    - Add foreign key constraints for better query clarity
    - Update indexes for performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add email column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email text;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Update foreign key constraints with explicit names
ALTER TABLE delivery_requests 
DROP CONSTRAINT IF EXISTS delivery_requests_student_id_fkey,
ADD CONSTRAINT delivery_requests_student_id_fkey 
  FOREIGN KEY (student_id) 
  REFERENCES profiles(id);

ALTER TABLE delivery_requests 
DROP CONSTRAINT IF EXISTS delivery_requests_assigned_to_fkey,
ADD CONSTRAINT delivery_requests_assigned_to_fkey 
  FOREIGN KEY (assigned_to) 
  REFERENCES profiles(id);
/*
  # Add profile fields for campus delivery system

  1. Changes
    - Add WhatsApp number field to profiles
    - Add outside campus status field
    - Add last status update timestamp
    - Add assigned_to field to delivery requests

  2. Security
    - Update RLS policies to allow profile updates
*/

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS whatsapp_number text,
ADD COLUMN IF NOT EXISTS is_outside_campus boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS last_status_update timestamptz;

-- Add assigned_to column to delivery_requests table
ALTER TABLE delivery_requests
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES profiles(id);

-- Update RLS policies for profiles
CREATE POLICY "Users can update their own profile fields"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_delivery_requests_assigned_to ON delivery_requests(assigned_to);
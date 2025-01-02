/*
  # Fix Profile Policies

  1. Changes
    - Add policy for profile creation during signup
    - Fix profile selection policies
    - Ensure proper error handling for profile queries

  2. Security
    - Maintain RLS while allowing necessary operations
    - Protect user data while enabling required functionality
*/

-- Drop existing policies on profiles table
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new, more specific policies
CREATE POLICY "Anyone can create their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
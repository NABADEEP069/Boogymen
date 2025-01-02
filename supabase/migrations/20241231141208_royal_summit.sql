/*
  # Initial Schema for Campus Delivery System

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - Links to auth.users
      - `username` (text)
      - `role` (text) - Either 'student' or 'volunteer'
      - `rating` (numeric) - Average rating for volunteers
      - `total_ratings` (integer) - Number of ratings received
      - `created_at` (timestamp)
    
    - `delivery_requests`
      - `id` (uuid, primary key)
      - `student_id` (uuid) - References profiles
      - `title` (text) - Brief description
      - `details` (text) - Full details of the request
      - `location` (text) - Delivery location
      - `deadline` (timestamp)
      - `status` (text) - 'open', 'assigned', 'completed'
      - `created_at` (timestamp)
    
    - `bids`
      - `id` (uuid, primary key)
      - `request_id` (uuid) - References delivery_requests
      - `volunteer_id` (uuid) - References profiles
      - `amount` (numeric) - Bid amount
      - `notes` (text)
      - `status` (text) - 'pending', 'accepted', 'rejected'
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'volunteer')),
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_ratings integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE delivery_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  details text NOT NULL,
  location text NOT NULL,
  deadline timestamptz NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'completed')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES delivery_requests(id) NOT NULL,
  volunteer_id uuid REFERENCES profiles(id) NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  notes text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Delivery requests policies
CREATE POLICY "Delivery requests are viewable by everyone"
  ON delivery_requests FOR SELECT
  USING (true);

CREATE POLICY "Students can create requests"
  ON delivery_requests FOR INSERT
  WITH CHECK (
    auth.uid() = student_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'student'
    )
  );

CREATE POLICY "Students can update own requests"
  ON delivery_requests FOR UPDATE
  USING (auth.uid() = student_id);

-- Bids policies
CREATE POLICY "Bids are viewable by everyone"
  ON bids FOR SELECT
  USING (true);

CREATE POLICY "Volunteers can create bids"
  ON bids FOR INSERT
  WITH CHECK (
    auth.uid() = volunteer_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'volunteer'
    )
  );

CREATE POLICY "Volunteers can update own bids"
  ON bids FOR UPDATE
  USING (auth.uid() = volunteer_id);
/*
  # Add payment amount to delivery requests

  1. Changes
    - Add payment_amount column to delivery_requests table
    - Add index for better query performance
    - Update RLS policies to allow access to payment_amount
*/

-- Add payment amount column
ALTER TABLE delivery_requests
ADD COLUMN IF NOT EXISTS payment_amount integer;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_delivery_requests_payment_amount 
ON delivery_requests(payment_amount);

-- Update RLS policies to ensure payment_amount is accessible
DROP POLICY IF EXISTS "Delivery requests are viewable by everyone" ON delivery_requests;
CREATE POLICY "Delivery requests are viewable by everyone"
  ON delivery_requests FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Students can create requests" ON delivery_requests;
CREATE POLICY "Students can create requests"
  ON delivery_requests FOR INSERT
  WITH CHECK (
    auth.uid() = student_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
    )
  );
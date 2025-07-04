/*
  # Create landing page entries table

  1. New Tables
    - `landing_page_entries`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the user
      - `email` (text, required, unique) - Email address
      - `phone` (text, required) - Phone number
      - `created_at` (timestamptz, default now()) - When the entry was created
      - `formatted_date` (text, generated) - Human-readable date format

  2. Security
    - Enable RLS on `landing_page_entries` table
    - Add policy for service role to manage all data
    - Add policy for authenticated users to read their own data

  3. Indexes
    - Index on email for faster lookups
    - Index on created_at for date-based queries
*/

-- Create the landing page entries table
CREATE TABLE IF NOT EXISTS landing_page_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  formatted_date text GENERATED ALWAYS AS (
    to_char(created_at AT TIME ZONE 'UTC', 'Mon DD, YYYY at HH12:MI AM')
  ) STORED
);

-- Enable Row Level Security
ALTER TABLE landing_page_entries ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access for backend operations)
CREATE POLICY "Service role can manage all entries"
  ON landing_page_entries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read their own data
CREATE POLICY "Users can read their own entries"
  ON landing_page_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_landing_page_entries_email 
  ON landing_page_entries(email);

CREATE INDEX IF NOT EXISTS idx_landing_page_entries_created_at 
  ON landing_page_entries(created_at DESC);

-- Create index on formatted_date for sorting
CREATE INDEX IF NOT EXISTS idx_landing_page_entries_formatted_date 
  ON landing_page_entries(formatted_date);
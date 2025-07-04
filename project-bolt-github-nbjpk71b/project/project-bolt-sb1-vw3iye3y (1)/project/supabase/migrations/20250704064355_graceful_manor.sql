/*
  # Create landing page entries table

  1. New Tables
    - `landing_page_entries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `phone` (text, required)
      - `created_at` (timestamp with timezone)
      - `formatted_date` (text, computed via function)

  2. Security
    - Enable RLS on `landing_page_entries` table
    - Add policy for service role to manage all entries
    - Add policy for authenticated users to read their own data

  3. Performance
    - Add indexes on email, created_at, and formatted_date for fast queries

  4. Functions
    - Create function to format dates consistently
*/

-- Create function to format dates consistently
CREATE OR REPLACE FUNCTION format_landing_page_date(input_date timestamptz)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT to_char(input_date, 'Mon DD, YYYY at HH12:MI AM');
$$;

-- Create the landing page entries table
CREATE TABLE IF NOT EXISTS landing_page_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  formatted_date text
);

-- Create trigger function to automatically set formatted_date
CREATE OR REPLACE FUNCTION set_formatted_date()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.formatted_date := format_landing_page_date(NEW.created_at);
  RETURN NEW;
END;
$$;

-- Create trigger to automatically update formatted_date on insert/update
CREATE TRIGGER trigger_set_formatted_date
  BEFORE INSERT OR UPDATE ON landing_page_entries
  FOR EACH ROW
  EXECUTE FUNCTION set_formatted_date();

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

-- Create policy for anonymous users to insert entries (for the landing page form)
CREATE POLICY "Anonymous users can insert entries"
  ON landing_page_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_landing_page_entries_email 
  ON landing_page_entries(email);

CREATE INDEX IF NOT EXISTS idx_landing_page_entries_created_at 
  ON landing_page_entries(created_at DESC);

-- Create index on formatted_date for sorting
CREATE INDEX IF NOT EXISTS idx_landing_page_entries_formatted_date 
  ON landing_page_entries(formatted_date);
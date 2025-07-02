-- Fix course_modules table by adding missing order_index column
-- This script should be executed in the Supabase SQL Editor

-- First, check if the column already exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'course_modules' 
  AND table_schema = 'public' 
  AND column_name = 'order_index';

-- Add the order_index column if it doesn't exist
ALTER TABLE public.course_modules 
ADD COLUMN IF NOT EXISTS order_index INTEGER;

-- Set a default value for existing records (if any)
UPDATE public.course_modules 
SET order_index = 1 
WHERE order_index IS NULL;

-- Make the column NOT NULL after setting default values
ALTER TABLE public.course_modules 
ALTER COLUMN order_index SET NOT NULL;

-- Add a unique constraint for course_id + order_index
-- First drop the constraint if it exists, then add it
ALTER TABLE public.course_modules 
DROP CONSTRAINT IF EXISTS course_modules_course_id_order_index_unique;

ALTER TABLE public.course_modules 
ADD CONSTRAINT course_modules_course_id_order_index_unique 
UNIQUE (course_id, order_index);

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'course_modules' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test insertion with order_index
SELECT 'Column order_index added successfully to course_modules table' as result;
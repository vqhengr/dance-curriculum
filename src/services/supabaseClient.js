// src/services/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oscybfitcsgrnoqmtysz.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
console.log("supabaseKey",supabaseKey)
if (!supabaseKey) {
    console.log('Environment Variables:', process.env);
    throw new Error('supabaseKey is not found in src/services/supabaseClient.js.');
  }
  
const supabase = createClient(supabaseUrl, supabaseKey)
// const supabase = "test text"
export default supabase;

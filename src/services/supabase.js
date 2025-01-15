import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yvjekvedgcmoapadfngw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2amVrdmVkZ2Ntb2FwYWRmbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjI0OTEsImV4cCI6MjA1MDQ5ODQ5MX0.iVjD2T4eGO08W69zLo8FO_BQfcA6HdNfKbD5x5y1LZQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

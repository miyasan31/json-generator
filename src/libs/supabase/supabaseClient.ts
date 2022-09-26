import { createClient } from "@supabase/supabase-js";

import { supabaseAnonKey, supabaseDatabaseUrl } from "~/constants/env";

export const supabaseClient = createClient(supabaseDatabaseUrl, supabaseAnonKey);

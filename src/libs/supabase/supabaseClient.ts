import { createClient } from "@supabase/supabase-js";

import { SUPABASE_ANON_KEY, SUPABASE_DATABASE_URL } from "~/constants/env";

export const supabaseClient = createClient(SUPABASE_DATABASE_URL, SUPABASE_ANON_KEY);

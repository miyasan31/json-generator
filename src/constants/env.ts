// eslint-disable-next-line no-undef
// export const apiBaseUrl = __VITE_API_URL__;

// Vercelデプロイ用
const isProductionMode = process.env.NODE_ENV === "production";

export const apiBaseUrl = `${isProductionMode ? process.env.VITE_API_URL : import.meta.env.VITE_API_URL}`;

export const supabaseDatabaseUrl = `${
  isProductionMode ? process.env.VITE_SUPABASE_DATABASE_URL : import.meta.env.VITE_SUPABASE_DATABASE_URL
}`;

export const supabaseAnonKey = `${
  isProductionMode ? process.env.VITE_SUPABASE_ANON_KEY : import.meta.env.VITE_SUPABASE_ANON_KEY
}`;

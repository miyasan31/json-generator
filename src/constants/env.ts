// eslint-disable-next-line no-undef
// export const apiBaseUrl = __VITE_API_URL__;

// Vercelデプロイ用
const IS_PRODUCTION_MODE = process.env.NODE_ENV === "production";

export const API_BASE_URL = `${IS_PRODUCTION_MODE ? process.env.VITE_API_URL : import.meta.env.VITE_API_URL}`;

export const SUPABASE_DATABASE_URL = `${
  IS_PRODUCTION_MODE ? process.env.VITE_SUPABASE_DATABASE_URL : import.meta.env.VITE_SUPABASE_DATABASE_URL
}`;

export const SUPABASE_ANON_KEY = `${
  IS_PRODUCTION_MODE ? process.env.VITE_SUPABASE_ANON_KEY : import.meta.env.VITE_SUPABASE_ANON_KEY
}`;

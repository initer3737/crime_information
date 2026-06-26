declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  // tambahkan env lain di sini jika ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
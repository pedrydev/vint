/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_HELP_LINK: string;
  readonly VITE_APP_SUPPORTED_LANGUAGES: string;
  readonly VITE_APP_DEFAULT_LANGUAGE: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

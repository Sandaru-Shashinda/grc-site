/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of gem_tracker_api, including the /api suffix. */
  readonly VITE_API_BASE_URL?: string;
  /** Origin of gem-tracker-app, which serves the full report view at /reports/:id. */
  readonly VITE_REPORT_VIEW_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Vite's helper validates this configuration and improves editor autocomplete.
import { defineConfig } from 'vite'

// The React plugin understands JSX and enables React Fast Refresh in development.
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

// This adapter lets Vite/Rolldown pass JavaScript through Babel presets.
import babel from '@rolldown/plugin-babel'

// Export the configuration object that Vite reads for `npm run dev` and `npm run build`.
export default defineConfig({
  // Plugins run in array order. These affect imported modules; the current HTML pages
  // use classic scripts from public/assets, so they do not currently use this React pipeline.
  plugins: [
    // Adds React/JSX transformation and the development-time Fast Refresh runtime.
    react(),

    // Runs the React Compiler Babel preset to optimize compatible React components.
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
})

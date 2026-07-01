import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@vercel/nft': path.resolve(rootDir, 'scripts/vercel-nft-shim.mjs'),
    },
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(),
    nitro({ preset: 'vercel' }),
    viteReact(),
  ],
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { existsSync } from 'node:fs'
import path from 'node:path'

const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use('/api', async (req, res, next) => {
      const name = new URL(req.url, 'http://localhost').pathname.replace(/^\/|\/$/g, '')
      if (!name || name.includes('..') || name.startsWith('_')) return next()
      const file = path.join(server.config.root, 'api', `${name}.js`)
      if (!existsSync(file)) return next()
      const { default: handler } = await server.ssrLoadModule(`/api/${name}.js`)
      await handler(req, res)
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
  server: { port: Number(process.env.PORT) || 5173 },
})

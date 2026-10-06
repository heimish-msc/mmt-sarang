import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use('/api/medium', async (req, res) => {
      const { default: handler } = await server.ssrLoadModule('/api/medium.js')
      await handler(req, res)
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
  server: { port: Number(process.env.PORT) || 5173 },
})

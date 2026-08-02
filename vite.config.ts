import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devServerPort = Number(env.VITE_DEV_SERVER_PORT || 8080)
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8080'

  return {
    plugins: [react()],
    server: {
      port: devServerPort,
      proxy: {
        '/auth': { target: proxyTarget, changeOrigin: true },
        '/api': { target: proxyTarget, changeOrigin: true },
        '/com': { target: proxyTarget, changeOrigin: true },
        '/common': { target: proxyTarget, changeOrigin: true },
        '/front': { target: proxyTarget, changeOrigin: true },
        '/ptl': { target: proxyTarget, changeOrigin: true },
        '/kss': { target: proxyTarget, changeOrigin: true },
        '/template': { target: proxyTarget, changeOrigin: true },
      },
    },
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)), },
    },
    optimizeDeps: {
      include: ['sweetalert2', 'sweetalert2-react-content', 'react-dom/client', '@toast-ui/react-grid'],
    },
    build: {
      commonjsOptions: {
        include: [/@toast-ui\/react-grid/, /node_moudules/],
      }
    }
  }
})

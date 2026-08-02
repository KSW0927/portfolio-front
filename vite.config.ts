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
    // sockjs-client(realtime-gateway-service WebSocket 연결용)가 Node의 global을 참조하는데
    // Vite는 이걸 자동으로 polyfill 안 해줘서 브라우저에서 "global is not defined" 에러가 남 - 수동 매핑.
    define: {
      global: 'globalThis',
    },
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

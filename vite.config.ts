import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Custom plugin to inject React Router future flags into the app
 * This addresses deprecation warnings without requiring code changes
 */
const reactRouterFuturePlugin = () => {
  return {
    name: 'react-router-future-flags',
    transformIndexHtml(html: string) {
      return html.replace(
        /<head>/,
        `<head>
        <script>
          // Silence React Router deprecation warnings by enabling future flags
          window.__reactRouterFutureFlags = {
            v7_startTransition: true,
            v7_relativeSplatPath: true
          };
        </script>`
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRouterFuturePlugin()],
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (_proxyReq, req) => {
            // Log outgoing requests to backend
            console.log(`[Proxy] ${req.method} ${req.url}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            // Log responses from backend
            console.log(`[Proxy] ${req.method} ${req.url} => ${proxyRes.statusCode}`);
          });
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

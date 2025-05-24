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
        ws: true,
        xfwd: true,
        rewrite: (path) => {
          // Remove the /api prefix before sending to backend
          // The backend expects paths without the /api prefix
          const rewrittenPath = path.replace(/^\/api/, '');
          console.log(`[Proxy Rewrite] ${path} => ${rewrittenPath}`);
          return rewrittenPath;
        },
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            // Set appropriate headers for the outgoing request
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Accept', 'application/json');
            // Log outgoing requests to backend
            console.log(`[Proxy Req] ${req.method} ${req.url}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            // Log responses from backend
            console.log(`[Proxy Res] ${req.method} ${req.url} => ${proxyRes.statusCode}`);
            let responseBody = '';
            proxyRes.on('data', (chunk) => {
              responseBody += chunk;
            });
            proxyRes.on('end', () => {
              if (responseBody) {
                try {
                  const bodyStr = responseBody.toString().substring(0, 300); // Truncate for log
                  console.log(`[Proxy Response Body] ${bodyStr}${responseBody.length > 300 ? '...' : ''}`);
                } catch (error: unknown) {
                  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                  console.log('[Proxy] Could not parse response body:', errorMessage);
                }
              }
            });
          });
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

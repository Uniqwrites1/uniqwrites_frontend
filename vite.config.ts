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
    port: 3000,
    cors: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: 'chunks/[name]-[hash].js',
            entryFileNames: '[name]-[hash].js',
            manualChunks: {
              gsap: ['gsap', '@gsap/react'],
              lucide: ['lucide-react'],
              react: ['react', 'react-dom'],
            }
          }
        },
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_getters: true,
            reduce_vars: true,
            conditionals: true,
            dead_code: true,
          },
          mangle: {
            toplevel: true,
          },
          format: {
            comments: false,
          }
        },
        target: 'ES2020',
        cssCodeSplit: true,
        sourcemap: false,
        // Aggressive optimization
        reportCompressedSize: false,
        chunkSizeWarningLimit: 500,
        // Enable automatic CSS tree-shaking
        cssMinify: 'lightningcss',
      },
      optimize: {
        // Optimize dependencies bundling
        esbuild: {
          legalComments: 'none',
        }
      }
    };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/spacestars/",
  server: {
    proxy: {
      // Пример настройки прокси для API запросов к вашему Express серверу
      '/api': {
        target: 'http://38.180.23.221:3000', // URL вашего Express сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', // Папка для сборки проекта
    minify: true, // Минимизация выходных файлов
    sourcemap: true, // Генерация source maps для отладки
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Пример алиаса для пути src/
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "favicon.svg",
        "apple-touch-icon.png",
        "nayan_islam.png",
        "tasbih.png",
        "click.wav",
        "cool-interface-click-tone-2568.wav",
        "counter-added.mp3",
      ],
      manifest: {
        name: "Tasbih Pro - Md. Nayan Islam",
        short_name: "Tasbih Pro",
        description: "Advanced Tasbih Counter with Theme and Volume Control",
        theme_color: "#0E1820",
        background_color: "#0E1820",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,wav,mp3}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});

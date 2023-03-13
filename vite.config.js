import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import manifest from "./manifest";

export default defineConfig({
	server: {
		port: 8080,
	},
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		VitePWA({
			registerType: "autoUpdate",
			manifest: manifest,
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
				runtimeCaching: [
					{
						urlPattern: new RegExp("^https://world.openfoodfacts.org/api/"),
						handler: "CacheFirst",
						options: {
							cacheName: "open-food-facts-api-cache",
							expiration: {
								maxAgeSeconds: 60 * 60 * 24, // cache for 1 day
							},
						},
					},
				],
			},
		}),
		quasar({
			sassVariables: "src/quasar-variables.sass",
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});

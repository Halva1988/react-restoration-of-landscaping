import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/react-restoration-of-landscaping/",
	plugins: [
		react(),
		copy({
			targets: [
				{ src: "node_modules/leaflet/dist/images/*", dest: "dist/images" },
			],
			hook: "writeBundle",
		}),
	],
});

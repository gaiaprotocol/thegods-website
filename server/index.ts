/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { pages } from "./pages/pages.js";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		const page = pages(url.pathname, env.ENVIRONMENT === "development");
		if (page) {
			return new Response(page, { headers: { "Content-Type": "text/html" } });
		}

		/*if (url.pathname.startsWith("/api/")) {
			return new Response(JSON.stringify({ name: "Cloudflare" }), {
				headers: { "Content-Type": "application/json" },
			});
		}*/

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;

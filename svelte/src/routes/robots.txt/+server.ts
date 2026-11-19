import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	// The route is prerendered at `<base>/robots.txt`, so stripping the
	// filename from the pathname gives the configured base path.
	const base = url.pathname.slice(0, -'/robots.txt'.length);
	const sitemap = `${url.origin}${base}/sitemap.xml`;
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};

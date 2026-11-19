import data from '#lib/data/data.json';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	// The route is prerendered at `<base>/sitemap.xml`, so stripping the
	// filename from the pathname gives the configured base path.
	const base = url.pathname.slice(0, -'/sitemap.xml'.length);
	const root = `${url.origin}${base}`;
	const paths = [
		'/',
		...data.surahs.map((surah) => `/surah/${surah.id}/`)
	];

	const urls = paths
		.map((path) => `  <url><loc>${escapeXml(`${root}${path}`)}</loc></url>`)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{
			headers: {
				'Content-Type': 'application/xml; charset=utf-8'
			}
		}
	);
};

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function normalizeBase(raw: string | undefined): '' | `/${string}` {
	const trimmed = (raw ?? '').replace(/^\/+|\/+$/g, '');
	return trimmed ? (`/${trimmed}` as `/${string}`) : '';
}

const base = normalizeBase(process.env.BASE_PATH);
const origin = (process.env.SITE_URL ?? 'http://localhost:4173').replace(
	/\/$/,
	''
);

export default defineConfig({
	plugins: [
		sveltekit({
			paths: { base, origin },
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({ fallback: '404.html' })
		})
	]
});

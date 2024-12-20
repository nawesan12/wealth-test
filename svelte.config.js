import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		 adapter: adapter({
      runtime: 'nodejs20.x' // Specify the runtime here
    }),
		alias: {
			'@/*': './src/lib'
		}
	},
	preprocess: vitePreprocess()
};
export default config;

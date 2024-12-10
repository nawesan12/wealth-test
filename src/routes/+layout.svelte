<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import '../animations.css';
	import '$lib/styles/app.css';

	/** @type {import('@sveltejs/adapter-vercel').Config} */
	export const config = {
		runtime: 'nodejs20.x'
	};
</script>

<svelte:head>
	<title>DEP | Emperador Financiero</title>
</svelte:head>

<Toaster richColors />
<slot />

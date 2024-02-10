<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import '../animations.css';
	import '$lib/styles/app.css';
</script>

<svelte:head>
	<title>DEP | Emperador Financiero</title>
</svelte:head>

<Toaster richColors />
<slot />

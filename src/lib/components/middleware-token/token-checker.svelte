<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const token = localStorage.getItem('dep-token');

		if (!token || token.length === 0) {
			goto('/test');
		}
	});
</script>

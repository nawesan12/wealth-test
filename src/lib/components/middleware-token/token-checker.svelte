<script lang="ts">
	import { goto } from '$app/navigation';
	import { checkIfTokenIsUsed } from '@/utils';
	import { onMount } from 'svelte';

	onMount(() => {
		const token = localStorage.getItem('dep-token');

		if (!token || token.length === 0) {
			goto('/test');
		}

		if (token) {
			checkIfTokenIsUsed(token).then((isUsed: boolean) => {
				if (isUsed) {
					goto('/test');
					return;
				}
				return;
			});
		}
	});
</script>

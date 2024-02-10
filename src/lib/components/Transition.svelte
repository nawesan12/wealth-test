<script>
	import { fade, fly } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<section in:fly={{ y: 200, duration: 2000 }} out:fade></section>
{/if}

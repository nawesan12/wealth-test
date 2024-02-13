<script lang="ts">
	import { onMount } from 'svelte';

	export let tip: string;

	let isShown = true;

	const hideTip = () => {
		isShown = false;
	};

	onMount(() => {
		setTimeout(hideTip, 20000);
	});
</script>

<article
	class={`fixed -left-80 top-1/2 z-40 grid max-w-96 -translate-y-1/2 transform grid-cols-8 rounded-r-2xl bg-white p-4 shadow-md transition-all duration-200 hover:left-0`}
	on:mouseenter={() => (isShown = true)}
	on:mouseleave={() => (isShown = false)}
>
	<p class="text-verde col-span-6 font-semibold">{tip}</p>

	<span class="col-span-2 flex items-center justify-end">
		<svg
			width="34"
			height="34"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="#0e362d"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 9h.01" />
			<path d="M11 12h1v4h1" />
			<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
		</svg>
	</span>
</article>

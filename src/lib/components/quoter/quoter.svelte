<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	import quotes from '$lib/utils/frases_empresariales.json';
	import facts from '$lib/utils/estadisticas_negocios.json';

	let text: any = getRandomQuote();

	function getRandomQuote() {
		const randomIndex = Math.floor(Math.random() * quotes.citas.length);
		return quotes.citas[randomIndex];
	}

	function getRandomFact() {
		const randomIndex = Math.floor(Math.random() * facts.estadisticas_negocios.length);
		return facts.estadisticas_negocios[randomIndex];
	}

	let factInterval: any;
	let quoteInterval: any;

	onMount(() => {
		quoteInterval = setInterval(() => {
			text = getRandomQuote();
		}, 40000);

		factInterval = setInterval(() => {
			const fact = getRandomFact();
			toast.info(`Sabias que: ${fact.texto}`, {
				duration: 25000
			});
		}, 40000);
	});

	onDestroy(() => {
		clearInterval(factInterval);
		clearInterval(quoteInterval);
	});
</script>

{#if text}
	<div transition:fade={{ duration: 300 }}>
		<blockquote
			class="text-dorado mb-12 max-w-2xl text-pretty p-4 text-center text-2xl font-normal italic opacity-80"
		>
			❝ {text.frase} ❞ <br /> <br /> <span>- {text.autor}</span>
		</blockquote>
	</div>
{/if}

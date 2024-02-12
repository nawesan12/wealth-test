<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import quotes from '$lib/utils/frases_empresariales.json';
	import facts from '$lib/utils/estadisticas_negocios.json';

	function getRandomQuote() {
		const randomIndex = Math.floor(Math.random() * quotes.citas.length);
		return quotes.citas[randomIndex];
	}

	function getRandomFact() {
		const randomIndex = Math.floor(Math.random() * facts.estadisticas_negocios.length);
		return facts.estadisticas_negocios[randomIndex];
	}

	$: text = getRandomQuote() as any;

	let factInterval: any;
	let quoteInterval: any;

	onMount(() => {
		quoteInterval = setInterval(() => {
			text = getRandomQuote() as any;
		}, 60000);

		factInterval = setInterval(() => {
			const fact = getRandomFact();
			toast.info(`Sabias que: ${fact.texto}`, {
				duration: 10000
			});
		}, 40000);
	});

	onDestroy(() => {
		clearInterval(factInterval);
		clearInterval(quoteInterval);
	});
</script>

<blockquote class="text-dorado max-w-2xl text-pretty p-4 text-center text-2xl font-normal italic">
	❝ {text.frase} ❞ <br /> <br /> <span>- {text.autor}</span>
</blockquote>

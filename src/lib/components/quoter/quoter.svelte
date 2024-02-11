<script lang="ts">
	import { onMount } from 'svelte';
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

	onMount(() => {
		setInterval(() => {
			const quote = getRandomQuote();
			toast('"' + quote.frase + '"' + ' - ' + quote.autor, {
				duration: 10000
			});
		}, 60000);

		setInterval(() => {
			const fact = getRandomFact();
			toast(fact.texto, {
				duration: 8000
			});
		}, 30000);
	});
</script>

hay que hacer que las frases vayan apareciendo con el formato deseado

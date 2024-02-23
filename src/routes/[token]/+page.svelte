<script>
	//@ts-nocheck
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import survey from '$lib/utils/survey.json';

	export let data;

	const datos = data.body?.informe;

	const dbDictionary = {
		datos_iniciales: 'User',
		conociendo_el_negocio: 'businessInfo',
		analisis_subjetivo: 'subjectiveAnalysis',
		analisis_financiero: 'financialAnalysis',
		feedback: 'feedback'
	};

	const titlesDictionary = {
		datos_iniciales: 'Información del Usuario',
		conociendo_el_negocio: 'Conociendo El Negocio',
		analisis_subjetivo: 'Analisis Subjetivo',
		analisis_financiero: 'Analisis Financiero',
		feedback: 'Feedback'
	};

	const sectionsToMapForDisplay = Object.keys(survey);

	onMount(() => {
		if (!datos) {
			goto('/');
		}
	});
</script>

<main class="m-4 mx-auto max-w-4xl rounded-lg bg-white/10 p-8 text-white">
	{#each sectionsToMapForDisplay as section}
		<section class="mb-8">
			<h2 class="mb-2 text-2xl font-semibold">{titlesDictionary[section]}</h2>
			<article class="space-y-2">
				{#each survey[section] as question, indice (indice)}
					<p>
						<b class="font-semibold">{question.texto}</b>
						{Object.values(datos[dbDictionary[section]])[indice]}
					</p>
				{/each}
			</article>
		</section>
	{/each}
</main>

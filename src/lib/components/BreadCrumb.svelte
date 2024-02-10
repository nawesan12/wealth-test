<script lang="ts">
	export let actualSection: string;

	const sections = [
		{
			id: 0,
			name: 'Conociendo el negocio',
			slug: 'conociendo-el-negocio'
		},
		{
			id: 1,
			name: 'Analisis Subjetivo',
			slug: 'analisis-subjetivo'
		},
		{
			id: 2,
			name: 'Analisis Objetivo',
			slug: 'analisis-objetivo'
		},
		{
			id: 3,
			name: 'Preguntas extras',
			slug: 'preguntas-extras'
		},
		{
			id: 4,
			name: 'Feedback',
			slug: 'feedback'
		}
	];

	const actualSectionIndex = sections.findIndex((e) => e.slug === actualSection);
</script>

<section class="breadcrumb mt-12 flex max-w-3xl items-center justify-center text-white">
	{#each sections as section}
		<article class="relative">
			<div
				class={`text-verde max-w-min rounded-full bg-white p-2 px-4 text-xl font-bold ${actualSectionIndex < section.id ? 'opacity-70' : 'opacity-100'}`}
			>
				<p>{section.id + 1}</p>
			</div>
			<span class="max-w-4">{section.name}</span>
		</article>
	{/each}
</section>

<script lang="ts">
	import { onMount } from 'svelte';

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
			name: 'Analisis Financiero',
			slug: 'analisis-financiero'
		},
		{
			id: 3,
			name: 'Feedback',
			slug: 'feedback'
		}
	];

	let actualSectionIndex = -1; // Default value

	// Extract the slug from the URL when component is mounted
	onMount(() => {
		const urlSlug = window.location.pathname.split('/').pop();
		actualSectionIndex = sections.findIndex((e) => e.slug === urlSlug);
	});
</script>

<section class="mt-12 w-full scale-75 p-4 lg:mb-24 lg:max-w-4xl lg:scale-100">
	<ul class="text-verde relative flex w-full items-center justify-between">
		<span class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-white"></span>

		<span
			class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 border border-dashed border-green-900 bg-white transition-all duration-500"
		></span>

		{#each sections as section, index}
			<li
				class={`relative z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-2xl font-bold transition-all duration-300 ${index > actualSectionIndex ? 'bg-zinc-400' : 'shadow shadow-[#f8bc88]'}`}
			>
				<span class={index > actualSectionIndex ? 'opacity-80' : ''}>{section.id + 1}</span>
				<div class="absolute -bottom-[4.5rem] w-max text-center">
					<h6
						class="hidden font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased lg:block"
					>
						{section.name}
					</h6>
				</div>
			</li>
		{/each}
	</ul>
</section>

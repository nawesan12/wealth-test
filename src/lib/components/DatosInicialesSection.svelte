<script lang="ts">
	import DatosInicialesSurvey from './DatosInicialesSurvey.svelte';
	import SectionIntroduction from './section-introduction/section-introduction.svelte';

	export let section: string;
	export let next: string;
	export let backend: string;
</script>

<main class="flex w-screen flex-col items-center">
	<DatosInicialesSurvey {section} {next} {backend} />
	<SectionIntroduction {section} introduction="" />
</main>

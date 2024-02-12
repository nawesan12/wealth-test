<script lang="ts">
	import BreadCrumb from './BreadCrumb.svelte';
	import DatosInicialesSurvey from './DatosInicialesSurvey.svelte';
	import Quoter from './quoter/quoter.svelte';
	import SectionIntroduction from './section-introduction/section-introduction.svelte';

	export let section: string;
	export let next: string;
	export let backend: string;
</script>

<main class="flex w-screen flex-col items-center">
	<DatosInicialesSurvey {section} {next} {backend} />
	<SectionIntroduction {section} introduction="" />
	<Quoter />
</main>

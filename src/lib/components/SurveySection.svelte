<script lang="ts">
	import survey from '$lib/utils/survey.json';
	import BreadCrumb from './BreadCrumb.svelte';
	import Survey from './Survey.svelte';
	import Quoter from './quoter/quoter.svelte';
	import SectionIntroduction from './section-introduction/section-introduction.svelte';

	export let section: string;
	export let next: string;
	export let backend: string;

	//@ts-ignore
	const actualQuestions: any = survey[section];
</script>

<main class="flex w-screen flex-col items-center">
	<BreadCrumb />
	<Survey {backend} {section} preguntas={actualQuestions} {next} />
	<SectionIntroduction {section} />
	<Quoter />
</main>

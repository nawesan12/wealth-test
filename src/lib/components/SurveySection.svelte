<script lang="ts">
	import survey from '$lib/utils/survey.json';
	import BreadCrumb from './BreadCrumb.svelte';
	import Survey from './Survey.svelte';

	export let section: string;
	export let next: string;
	export let backend: string;

	//@ts-ignore
	const actualQuestions: any = survey[section];
</script>

<main class="flex h-screen w-screen flex-col items-center gap-16">
	<BreadCrumb actualSection={section} />
	<Survey {backend} {section} preguntas={actualQuestions} {next} />
</main>

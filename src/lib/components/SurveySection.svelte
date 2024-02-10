<script lang="ts">
	import survey from '$lib/utils/survey.json';
	import Survey from './Survey.svelte';

	export let section: string;
	export let next: string;
	export let backend: string;

	//@ts-ignore
	const actualQuestions: any = survey[section];
</script>

<Survey {backend} {section} preguntas={actualQuestions} {next} />

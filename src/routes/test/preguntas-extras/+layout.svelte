<script>
	import Progress from '@/components/ui/progress/progress.svelte';
</script>

<h1
	class="m-10 mx-auto block max-w-4xl border border-dashed border-green-700 bg-white p-4 text-center text-3xl font-bold text-black"
>
	Preguntas Extras
</h1>

<slot />

<section class="progress-container mx-auto block max-w-lg pb-10">
	<Progress value={66} />
</section>

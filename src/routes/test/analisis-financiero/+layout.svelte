<script>
	import Progress from '@/components/ui/progress/progress.svelte';
</script>

<slot />

<section class="progress-container mx-auto block max-w-lg pb-10">
	<Progress value={62} />
</section>

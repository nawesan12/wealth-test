<script>
	import SurveySection from '@/components/SurveySection.svelte';
	import Logo from '@/components/logo/logo.svelte';
	import ImportantTip from '$lib/components/important-tip/important-tip.svelte';
</script>

<Logo />

<SurveySection
	next="/test/feedback"
	backend="/api/save-answers/analisis-financiero"
	section="analisis_financiero"
/>

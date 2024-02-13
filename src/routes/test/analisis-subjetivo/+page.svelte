<script>
	import SurveySection from '@/components/SurveySection.svelte';
	import Logo from '@/components/logo/logo.svelte';
</script>

<Logo />

<SurveySection
	next="/test/analisis-financiero"
	backend="/api/save-answers/analisis-subjetivo"
	section="analisis_subjetivo"
/>

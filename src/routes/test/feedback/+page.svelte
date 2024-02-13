<script>
	import SurveySection from '@/components/SurveySection.svelte';
	import Logo from '@/components/logo/logo.svelte';
</script>

<Logo />

<SurveySection next="/test/fulfilled" backend="/api/save-answers/feedback" section="feedback" />

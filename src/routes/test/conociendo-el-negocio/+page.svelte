<script>
	import SurveySection from '@/components/SurveySection.svelte';
	import Logo from '@/components/logo/logo.svelte';
	import ImportantTip from '$lib/components/important-tip/important-tip.svelte';
</script>

<Logo />

<SurveySection
	next="/test/analisis-subjetivo"
	backend="/api/save-answers/conociendo-el-negocio"
	section="conociendo_el_negocio"
/>
<ImportantTip />

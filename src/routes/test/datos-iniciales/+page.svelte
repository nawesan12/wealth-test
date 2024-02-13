<script>
	import DatosInicialesSection from '@/components/DatosInicialesSection.svelte';
	import Logo from '$lib/components/logo/logo.svelte';
</script>

<Logo />

<DatosInicialesSection
	next="/test/conociendo-el-negocio"
	backend="/api/save-answers/datos-iniciales"
	section="datos_iniciales"
/>

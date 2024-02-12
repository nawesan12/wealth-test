<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	export let section: string;
	export let introduction: string;

	const sections = {
		datos_iniciales: 'Datos Iniciales',
		analisis_subjetivo: 'Analisis Subjetivo',
		conociendo_el_negocio: 'Conociendo el Negocio',
		analisis_financiero: 'Analisis Financiero',
		feedback: 'Feedback'
	};

	//@ts-ignore
	$: sectionToShow = sections[section as string];
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>Open</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{sectionToShow}</AlertDialog.Title>
			<AlertDialog.Description>
				{introduction}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action>Entendido</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

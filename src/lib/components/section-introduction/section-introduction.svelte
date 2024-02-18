<script lang="ts">
	export let section: string;

	const sections = {
		datos_iniciales: {
			name: 'Empecemos con lo esencial!',
			introduction: 'Te pediremos algunos datos básicos.'
		},
		conociendo_el_negocio: {
			name: 'Ahora vamos a hablar sobre tu negocio',
			introduction:
				'Decidimos iniciar el diagnóstico analizando la visión integral del negocio, explorando su historia, modelo de negocio, productos/servicios, ventaja competitiva, y otros aspectos claves. Este análisis profundo establece una base sólida para el resto del diagnóstico financiero.'
		},
		analisis_subjetivo: {
			name: 'Análisis Subjetivo',
			introduction:
				'La sección de análisis subjetivo busca explorar la percepción del emprendedor sobre su negocio, así como su conexión emocional y creencias relacionadas con el dinero. Su objetivo es comprender más profundamente la mentalidad y la motivación del emprendedor.'
		},
		analisis_financiero: {
			name: 'Análisis Financiero',
			introduction:
				'Este segmento está diseñado para evaluar en profundidad la situación financiera del negocio. Nos vamos a centrar en analizar los sistemas y estrategias que se estén utilizando para administrar y escalar el negocio.'
		},
		feedback: {
			name: 'Feedback',
			introduction:
				'Esta última sección tiene como objetivo recopilar la experiencia del cliente durante el diagnóstico, así como obtener comentarios sobre la utilidad de la información proporcionada y el formato del proceso. Esto nos ayuda a evaluar la efectividad del servicio e identificar áreas de mejora.'
		}
	};

	//@ts-ignore
	$: sectionToShow = sections[section as string];

	let introductionIsOpen = true;
</script>

{#if introductionIsOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 p-4 backdrop-blur-lg"
	>
		<div
			class="tilt-in-fwd-tl rounded-lg border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:max-w-lg lg:p-8"
			role="alert"
		>
			<div class="flex items-center gap-4">
				<span class="bg-verde shrink-0 rounded-full p-2 text-white">
					<svg class="h-4 w-4" fill="#f8bc88">
						<path
							clip-rule="evenodd"
							d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
							fill-rule="evenodd"
						/>
					</svg>
				</span>

				<p class="font-medium sm:text-lg">{sectionToShow.name}</p>
			</div>

			<p class="mt-4 text-gray-500">
				{sectionToShow.introduction}
			</p>

			<div class="mt-6 justify-end sm:flex sm:gap-4">
				<button
					on:click={() => (introductionIsOpen = false)}
					class="bg-verde text-dorado mt-2 inline-block w-full rounded-lg bg-black px-5 py-3 text-center text-sm font-semibold sm:mt-0 sm:w-auto"
				>
					Entendido
				</button>
			</div>
		</div>
	</div>
{/if}

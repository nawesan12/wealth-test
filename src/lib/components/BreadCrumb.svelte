<script lang="ts">
	export let actualSection: string;

	const sections = [
		{
			id: 0,
			name: 'Conociendo el negocio',
			slug: 'conociendo-el-negocio'
		},
		{
			id: 1,
			name: 'Analisis Subjetivo',
			slug: 'analisis-subjetivo'
		},
		{
			id: 2,
			name: 'Analisis Objetivo',
			slug: 'analisis-objetivo'
		},
		{
			id: 3,
			name: 'Preguntas extras',
			slug: 'preguntas-extras'
		},
		{
			id: 4,
			name: 'Feedback',
			slug: 'feedback'
		}
	];

	const actualSectionIndex = sections.findIndex((e) => e.slug === actualSection);
</script>

<div class="mb-24 mt-12 w-full px-4 py-4 lg:max-w-4xl">
	<div class="text-verde relative flex w-full items-center justify-between">
		<div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-white"></div>
		<div
			class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 border border-dashed border-green-900 bg-white transition-all duration-500"
		></div>
		<div
			class="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white font-bold transition-all duration-300"
		>
			1
			<div class="absolute -bottom-[4.5rem] w-max text-center">
				<h6
					class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased"
				>
					Conociendo el negocio
				</h6>
			</div>
		</div>
		<div
			class="text-verde relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white font-bold transition-all duration-300"
		>
			2
			<div class="absolute -bottom-[4.5rem] w-max text-center text-white">
				<h6
					class="text-blue-white block font-sans text-base font-semibold leading-relaxed tracking-normal antialiased"
				>
					Analisis Subjetivo
				</h6>
			</div>
		</div>
		<div
			class="text-verde relative z-10 grid h-10 w-10 place-items-center rounded-full bg-gray-300 font-bold transition-all duration-300"
		>
			3
			<div class="absolute -bottom-[4.5rem] w-max text-center">
				<h6
					class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased"
				>
					Analisis Financiero
				</h6>
			</div>
		</div>
		<div
			class="text-verde relative z-10 grid h-10 w-10 place-items-center rounded-full bg-gray-300 font-bold transition-all duration-300"
		>
			4
			<div class="absolute -bottom-[4.5rem] w-max text-center">
				<h6
					class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased"
				>
					Feedback
				</h6>
			</div>
		</div>
	</div>
</div>

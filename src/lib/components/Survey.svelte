<script lang="ts">
	//@ts-nocheck
	import type { Question } from '$lib/types/types';
	import { surveyAnswers } from '$lib/stores/survey';
	import Input from './ui/input/input.svelte';
	import Textarea from './ui/textarea/textarea.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { sendDataToBackendAndSave } from '@/utils';
	import CountrySelect from '$lib/components/country-select/country-select.svelte';

	export let preguntas: Question[];
	export let section: string;
	export let next: string;
	export let backend: string;

	let currentStep = 0; // Keep track of the current step
	let respuestas: string[] = Array(preguntas.length).fill('');

	function handleAnswers() {
		if (respuestas[currentStep] === '') {
			toast.error('Debes llenar el campo');
			return;
		}

		// Additional validation: Check input length
		if (respuestas[currentStep].length > 1000) {
			toast.error('El campo es demasiado largo');
			return;
		}

		if (currentStep === preguntas.length - 1) {
			surveyAnswers.update((value) => {
				return {
					...value,
					[section]: respuestas
				};
			});

			// Additional validation: Check if all required fields are filled
			if (respuestas.some((answer) => answer === '')) {
				toast.error('Por favor, completa todas las respuestas');
				return;
			}

			sendDataToBackendAndSave(backend, {
				data: $surveyAnswers[section],
				token: $surveyAnswers.token
			})
				.then((data) => {
					if (data.error) {
						toast.error('Error al guardar las respuestas');
						console.error(data.error);
					} else {
						console.log(data);
						toast.success('Respuestas guardadas!', {
							type: 'success'
						});
						goto(next);
					}
				})
				.catch((error) => {
					toast.error('Error al conectar con el servidor');
					console.error(error);
				});
		} else {
			currentStep++;
		}
	}
</script>

<!-- Estructura del componente -->
<main class="mx-auto my-10 flex w-screen max-w-2xl flex-col items-center gap-20 p-4">
	<article>
		<h2
			class="text-verde my-4 mb-16 rounded-lg border-2 border-green-800 bg-white p-12 py-8 text-center text-3xl font-bold"
		>
			{preguntas[currentStep].texto}
		</h2>
		{#if preguntas[currentStep].tipo === 'opcion_multiple'}
			<form class="grid max-w-2xl list-none grid-cols-2 gap-6 space-y-1">
				{#each preguntas[currentStep].opciones as opcion, index}
					<li>
						{#if opcion === 'Otro:'}
							<Input
								class="w-full"
								placeholder="Otro (especificar)"
								name="opcion_multiple"
								bind:value={respuestas[currentStep]}
							/>
						{:else}
							<div
								class={`text-verde w-full rounded-lg border-4 border-transparent bg-white p-4 focus-within:border-[#f8bc88] focus-within:shadow-sm focus-within:shadow-[#f8bc88] ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}`}
							>
								<input
									type="radio"
									id={opcion}
									name={opcion}
									bind:group={respuestas[currentStep]}
									value={opcion}
									class="absolute opacity-0"
								/>
								<label class="text-md cursor-pointer p-4 font-semibold" for={opcion}>{opcion}</label
								>
							</div>
						{/if}
					</li>
				{/each}
			</form>
		{/if}
		{#if preguntas[currentStep].tipo === 'texto'}
			<Input
				class=""
				type="text"
				placeholder="Ingresa tu respuesta"
				bind:value={respuestas[currentStep]}
			/>
		{/if}
		{#if preguntas[currentStep].tipo === 'number'}
			<Input
				type="number"
				inputmode="numeric"
				max="10"
				min="1"
				placeholder="Ingresa tu respuesta"
				bind:value={respuestas[currentStep]}
			/>
		{/if}
		{#if preguntas[currentStep].tipo === 'area'}
			<Textarea placeholder="Desarrolla tu respuesta" bind:value={respuestas[currentStep]} />
		{/if}
		{#if preguntas[currentStep].tipo === 'country'}
			<select
				placeholder="Selecciona un país"
				class="text-verde w-full rounded-lg p-4 py-3"
				bind:value={respuestas[currentStep]}
			>
				<CountrySelect />
			</select>
		{/if}
	</article>

	<button
		on:click={handleAnswers}
		type="button"
		class="bg-dorado text-verde inline-block rounded-lg bg-black px-6 py-2 text-xl font-semibold text-white transition-colors duration-200 hover:bg-green-800"
	>
		{currentStep === preguntas.length - 1 ? 'Finalizar' : 'Siguiente'}
	</button>
</main>

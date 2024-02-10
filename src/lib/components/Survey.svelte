<script lang="ts">
	//@ts-nocheck
	import type { Question } from '$lib/types/types';
	import { surveyAnswers } from '$lib/stores/survey';
	import Input from './ui/input/input.svelte';
	import Textarea from './ui/textarea/textarea.svelte';
	import { goto } from '$app/navigation';
	import Button from './ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { sendDataToBackendAndSave } from '@/utils';

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

		if (currentStep === preguntas.length - 1) {
			surveyAnswers.update((value) => {
				return {
					...value,
					[section]: respuestas
				};
			});

			sendDataToBackendAndSave(backend, {
				data: $surveyAnswers[section],
				token: $surveyAnswers.token
			}).then((data) => {
				console.log(data);
				toast.success('Respuestas guardadas!', {
					type: 'success'
				});
				goto(next);
			});
		} else {
			currentStep++;
		}
	}
</script>

<!-- Estructura del componente -->
<form class="mx-auto my-10 flex w-screen max-w-2xl flex-col items-center gap-12">
	<article>
		<h2
			class="text-verde my-2 mb-8 rounded-lg border-2 border-green-800 bg-white p-12 py-8 text-center text-2xl font-bold"
		>
			{preguntas[currentStep].texto}
		</h2>
		{#if preguntas[currentStep].tipo === 'opcion_multiple'}
			<form class="list-none space-y-1">
				{#each preguntas[currentStep].opciones as opcion (opcion)}
					<li>
						{#if opcion === 'Otro:'}
							<label class="px-8 font-normal" for="opcion_multiple">{opcion}</label>
							<Input
								placeholder="Otro..."
								name="opcion_multiple"
								bind:value={respuestas[currentStep]}
							/>
						{:else}
							<input
								type="radio"
								name="opcion_multiple"
								bind:group={respuestas[currentStep]}
								value={opcion}
							/>
							<label class="p-4 font-normal" for="opcion_multiple">{opcion}</label>
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
	</article>

	<button
		on:click={handleAnswers}
		type="button"
		class="bg-dorado text-verde inline-block rounded-lg bg-black px-6 py-2 text-xl font-semibold text-white transition-colors duration-200 hover:bg-green-800"
	>
		{currentStep === preguntas.length - 1 ? 'Finalizar' : 'Siguiente'}
	</button>
</form>

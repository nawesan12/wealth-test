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

	let respuestas: string[] = Array(preguntas.length).fill('');

	function handleAnswers() {
		if (!$surveyAnswers[section].includes('')) {
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
		}

		toast.error('Debes llenar todos los campos');
		return;
	}
</script>

<!-- Estructura del componente -->
<form
	class="mx-auto my-10 flex w-screen max-w-4xl flex-col gap-8 rounded-md border-2 border-green-800 bg-white p-12"
>
	{#each preguntas as pregunta (pregunta.id)}
		<article>
			<h2 class="my-2 mb-4 text-xl font-semibold">{pregunta.texto}</h2>
			{#if pregunta.tipo === 'opcion_multiple'}
				<form class="list-none space-y-1">
					{#each pregunta.opciones as opcion (opcion)}
						<li>
							{#if opcion === 'Otro:'}
								<label class="px-8 font-normal" for="opcion_multiple">{opcion}</label>
								<Input
									placeholder="Otro..."
									name="opcion_multiple"
									bind:value={respuestas[pregunta.id - 1]}
								/>
							{:else}
								<input
									type="radio"
									name="opcion_multiple"
									bind:group={respuestas[pregunta.id - 1]}
									value={opcion}
								/>
								<label class="p-4 font-normal" for="opcion_multiple">{opcion}</label>
							{/if}
						</li>
					{/each}
				</form>
			{/if}
			{#if pregunta.tipo === 'texto'}
				<Input
					class=""
					type="text"
					placeholder="Ingresa tu respuesta"
					bind:value={respuestas[pregunta.id - 1]}
				/>
			{/if}
			{#if pregunta.tipo === 'number'}
				<Input
					type="number"
					inputmode="numeric"
					max="10"
					min="1"
					placeholder="Ingresa tu respuesta"
					bind:value={respuestas[pregunta.id - 1]}
				/>
			{/if}

			{#if pregunta.tipo === 'area'}
				<Textarea placeholder="Desarrolla tu respuesta" bind:value={respuestas[pregunta.id - 1]} />
			{/if}
		</article>
	{/each}

	<Button
		on:click={handleAnswers}
		type="submit"
		class="inline-block self-end rounded-md bg-black px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-green-800"
		>Siguiente</Button
	>
</form>

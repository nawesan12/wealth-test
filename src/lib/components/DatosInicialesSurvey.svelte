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

	import questions from '$lib/utils/survey.json';
	const preguntas: Question[] = questions['datos_iniciales'];

	export let section: string;
	export let next: string;
	export let backend: string;

	let currentStep = 0; // Keep track of the current step
	let respuestas: string[] = Array(preguntas.length).fill('');
	const questionsPerPage = 4;

	function handleAnswers() {
		// Check if any of the answers are empty
		for (
			let i = currentStep * questionsPerPage;
			i < Math.min((currentStep + 1) * questionsPerPage, preguntas.length);
			i++
		) {
			if (respuestas[i] === '') {
				toast.error('Debes llenar todos los campos');
				return;
			}
		}

		// If it's the last step, save answers and navigate
		if ((currentStep + 1) * questionsPerPage >= preguntas.length) {
			surveyAnswers.update((value) => {
				const updatedAnswers = { ...value };
				for (let i = currentStep * questionsPerPage; i < preguntas.length; i++) {
					updatedAnswers[section][i] = respuestas[i];
				}
				return updatedAnswers;
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
			window.scrollTo({
				behavior: 'smooth',
				top: 0
			});
		}
	}
</script>

<main class="mx-auto my-10 flex w-screen max-w-2xl flex-col items-center gap-20 p-4">
	{#each Array(Math.ceil(preguntas.length / questionsPerPage)) as _, step}
		{#if step === currentStep}
			<article>
				<h2 class="text-dorado my-4 mb-16 rounded-lg p-12 py-8 text-center text-6xl font-bold">
					Datos Iniciales
				</h2>
				<form class="flex max-w-2xl list-none flex-col gap-6 space-y-1">
					{#each preguntas.slice(step * questionsPerPage, Math.min((step + 1) * questionsPerPage, preguntas.length)) as pregunta, index}
						<li>
							<h3 class="mb-4 text-xl font-semibold text-white">{pregunta.texto}</h3>
							{#if pregunta.tipo === 'opcion_multiple'}
								{#each pregunta.opciones as opcion}
									<div
										class={`text-verde w-full rounded-lg border-4 border-transparent bg-white p-4 focus-within:border-[#f8bc88] focus-within:shadow-sm focus-within:shadow-[#f8bc88] ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}`}
									>
										<input
											type="radio"
											id={opcion}
											name={opcion}
											bind:group={respuestas[step * questionsPerPage + index]}
											value={opcion}
											class="absolute opacity-0"
										/>
										<label class="text-md cursor-pointer p-4 font-semibold" for={opcion}
											>{opcion}</label
										>
									</div>
									<br />
								{/each}
							{:else if pregunta.tipo === 'texto'}
								<Input
									type="text"
									placeholder="Ingresa tu respuesta"
									bind:value={respuestas[step * questionsPerPage + index]}
								/>
							{:else if pregunta.tipo === 'number'}
								<Input
									type="number"
									inputmode="numeric"
									max="10"
									min="1"
									placeholder="Ingresa tu respuesta"
									bind:value={respuestas[step * questionsPerPage + index]}
								/>
							{:else if pregunta.tipo === 'area'}
								<Textarea
									placeholder="Desarrolla tu respuesta"
									bind:value={respuestas[step * questionsPerPage + index]}
								/>
							{:else if pregunta.tipo === 'country'}
								<select
									class="text-verde w-full rounded-lg p-4 py-3"
									bind:value={respuestas[step * questionsPerPage + index]}
								>
									<CountrySelect />
								</select>
							{/if}
						</li>
					{/each}
				</form>
			</article>
		{/if}
	{/each}

	<button
		on:click={handleAnswers}
		type="button"
		class="bg-dorado text-verde inline-block rounded-lg bg-black px-6 py-2 text-xl font-semibold text-white transition-colors duration-200 hover:bg-green-800"
	>
		{currentStep * questionsPerPage >= preguntas.length ? 'Finalizar' : 'Siguiente'}
	</button>
</main>

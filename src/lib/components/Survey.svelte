<script lang="ts">
	//@ts-nocheck
	import type { Question } from '$lib/types/types';
	import { surveyAnswers } from '$lib/stores/survey';
	import Input from './ui/input/input.svelte';
	import Textarea from './ui/textarea/textarea.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { sendDataToBackendAndSave } from '@/utils';
	import QuestionTip from './question-tip/question-tip.svelte';

	export let preguntas: Question[];
	export let section: string;
	export let next: string;
	export let backend: string;

	let currentStep = 0; // Keep track of the current step
	let respuestas: string[] = Array(preguntas.length).fill('');

	function goToPreviousQuestion() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	function goToNextQuestion() {
		currentStep++;
	}

	function skipOptionalQuestion() {
		currentStep += 2;
	}

	function fillOptionalQuestionWithEmptyString() {
		if (!respuestas[currentStep]) {
			respuestas[currentStep] = '';
		}
	}

	function saveAnswersAndSendToBackend() {
		surveyAnswers.update((value) => {
			return {
				...value,
				[section]: respuestas
			};
		});

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
	}

	function scrollToTop() {
		window.scrollTo({
			behavior: 'smooth',
			top: 0
		});
		return;
	}

	function handleAnswers() {
		const currentQuestion = preguntas[currentStep];
		const nextQuestion = preguntas[currentStep + 1];

		if (currentQuestion.opcional) {
			fillOptionalQuestionWithEmptyString();
		}

		if (
			['opcion_multiple', 'opcion_multiple_largas'].includes(currentQuestion.tipo) &&
			!currentQuestion.opcional &&
			respuestas[currentStep] === ''
		) {
			toast.error('Debes elegir una opción');
			return;
		}

		if (respuestas[currentStep] === '' && !currentQuestion.opcional) {
			toast.error('Debes llenar el campo');
			return;
		}

		// Additional validation: Check input length
		if (respuestas[currentStep].length > 1000) {
			toast.error('El campo es demasiado largo');
			return;
		}

		const isTheLastQuestion = currentStep === preguntas.length - 1;

		if (isTheLastQuestion) {
			saveAnswersAndSendToBackend();
			scrollToTop();
			return;
		} else {
			if (nextQuestion.condicional) {
				const actualAnswer = respuestas[currentStep];
				const conditionalQuestionIndex = currentStep + 1;

				if (actualAnswer.includes('Sí') || actualAnswer.includes('Estoy')) {
					goToNextQuestion();
					scrollToTop();
					return;
				}

				respuestas[conditionalQuestionIndex] = ' ';
				skipOptionalQuestion();
				scrollToTop();
				return;
			}

			goToNextQuestion();
			scrollToTop();
			return;
		}
	}
</script>

<!-- Estructura del componente -->
{#if preguntas[currentStep].tip != undefined}
	<QuestionTip tip={preguntas[currentStep].tip} />
{/if}
<main class="mx-auto my-10 flex w-screen max-w-2xl flex-col items-center gap-20 p-4">
	<article class="relative">
		{#if currentStep > 0}
			<button
				class="absolute bottom-full rounded-lg border-green-800 bg-white px-2 lg:right-full lg:mr-2"
				title="Ir a pregunta anterior"
				on:click={goToPreviousQuestion}
			>
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#0e362d"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M5 12l14 0" />
					<path d="M5 12l4 4" />
					<path d="M5 12l4 -4" />
				</svg>
			</button>
		{/if}

		<h2
			class="text-verde relative my-4 mb-16 rounded-lg border-2 border-green-800 bg-white p-12 py-8 text-center text-3xl font-bold"
		>
			<span class="text-verde absolute right-2 top-2 text-sm font-semibold"
				>{`${String(preguntas[currentStep].id)} / ${String(preguntas.length)}`}</span
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
							<label
								class={`text-md text-verde block w-full cursor-pointer rounded-lg border-4 border-transparent bg-white p-4 font-semibold focus-within:border-[#f8bc88] focus-within:shadow-sm focus-within:shadow-[#f8bc88] ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}`}
								for={opcion}
							>
								<input
									type="radio"
									id={opcion}
									name={opcion}
									bind:group={respuestas[currentStep]}
									value={opcion}
									class="absolute opacity-0"
								/>
								{opcion}
							</label>
						{/if}
					</li>
				{/each}
			</form>
		{/if}
		{#if preguntas[currentStep].tipo === 'opcion_multiple_largas'}
			<form class="flex max-w-2xl list-none flex-col gap-6 space-y-1">
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
							<label
								class={`text-md text-md text-verde block w-full cursor-pointer rounded-lg border-4 border-transparent bg-white p-4 font-semibold focus-within:border-[#f8bc88] focus-within:shadow-sm focus-within:shadow-[#f8bc88] ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}`}
								for={opcion}
							>
								<input
									type="radio"
									id={opcion}
									name={opcion}
									bind:group={respuestas[currentStep]}
									value={opcion}
									class="absolute opacity-0"
								/>{opcion}
							</label>
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
</main>

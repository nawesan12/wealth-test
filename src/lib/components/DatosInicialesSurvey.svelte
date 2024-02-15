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
	import CountryPhone from '$lib/components/country-phone/country-phone.svelte';
	import questions from '$lib/utils/survey.json';

	const preguntas: Question[] = questions['datos_iniciales'];

	export let section: string;
	export let next: string;
	export let backend: string;

	$: selectedRadios = [];

	let currentStep = 0; // Keep track of the current step
	let respuestas: Record<string, string> = {}; // Use a dictionary to store answers with question IDs
	const questionsPerPage = 4;

	let countryCode;
	let phoneNumber;

	function handleAnswers() {
		// Check if any of the answers are empty
		const questionsOnCurrentPage = preguntas.slice(
			currentStep * questionsPerPage,
			Math.min((currentStep + 1) * questionsPerPage, preguntas.length)
		);
		for (const pregunta of questionsOnCurrentPage) {
			const respuesta = respuestas[pregunta.id];
			if (pregunta.tipo === 'url' || pregunta.tipo === 'phone') {
				break;
			} else {
				if (!respuesta) {
					toast.error('Debes llenar todos los campos');
					return;
				}

				if (respuesta.length > 1000) {
					toast.error('El campo es demasiado largo');
					return;
				}
			}
		}
		// indice 4
		// Save answers and navigate if it's the last step
		if ((currentStep + 1) * questionsPerPage >= preguntas.length) {
			surveyAnswers.update((value) => {
				const updatedAnswers = { ...value };
				for (const pregunta of preguntas) {
					updatedAnswers[section][pregunta.id] = respuestas[pregunta.id];
				}
				return updatedAnswers;
			});

			$surveyAnswers[section][5] = countryCode + phoneNumber;

			console.log($surveyAnswers);

			sendDataToBackendAndSave(backend, {
				data: $surveyAnswers[section].slice(1),
				token: $surveyAnswers.token
			})
				.then((data) => {
					console.log(data);
					toast.success('Respuestas guardadas!', {
						type: 'success'
					});
					goto(next);
				})
				.catch((error) => {
					toast.error('Error al conectar con el servidor');
					console.error(error);
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
				<article class="flex max-w-2xl list-none flex-col gap-6 space-y-1">
					{#each preguntas.slice(step * questionsPerPage, Math.min((step + 1) * questionsPerPage, preguntas.length)) as pregunta, index}
						<li>
							<h3 class="mb-4 text-xl font-semibold text-white">{pregunta.texto}</h3>
							{#if pregunta.tipo === 'opcion_multiple'}
								<form>
									{#each pregunta.opciones as opcion}
										<!-- svelte-ignore a11y -->
										<label
											on:click={() => {
												selectedRadios[pregunta.id] = opcion;
											}}
											class={`text-md text-md text-verde block w-full cursor-pointer rounded-lg border-4 border-transparent bg-white p-4 font-semibold  ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'} ${selectedRadios.includes(opcion) ? 'border-dorado shadow-sm shadow-[#f8bc88]' : ''}`}
											for={opcion}
										>
											<input
												type="radio"
												id={opcion}
												name={`opcion_${pregunta.id}`}
												bind:group={respuestas[pregunta.id]}
												value={opcion}
												class="absolute opacity-0"
											/>
											{opcion}
										</label>
										<br />
									{/each}
								</form>
							{:else if pregunta.tipo === 'texto'}
								<Input
									type="text"
									placeholder="Ingresa tu respuesta"
									bind:value={respuestas[pregunta.id]}
								/>
							{:else if pregunta.tipo === 'number'}
								<Input
									type="number"
									inputmode="numeric"
									max="10"
									min="1"
									placeholder="Ingresa tu respuesta"
									bind:value={respuestas[pregunta.id]}
								/>
							{:else if pregunta.tipo === 'area'}
								<Textarea
									placeholder="Desarrolla tu respuesta"
									bind:value={respuestas[pregunta.id]}
								/>
							{:else if pregunta.tipo === 'country'}
								<select
									class="text-verde w-full rounded-lg p-4 py-3"
									bind:value={respuestas[pregunta.id]}
								>
									<CountrySelect />
								</select>
							{:else if pregunta.tipo === 'email'}
								<Input
									type="email"
									placeholder="Ingresa tu email"
									bind:value={respuestas[pregunta.id]}
								/>
							{:else if pregunta.tipo === 'url'}
								<Input type="url" placeholder="Ingresar URL" bind:value={respuestas[pregunta.id]} />
							{:else if pregunta.tipo === 'phone'}
								<div class="grid grid-cols-4 gap-6">
									<select class="col-span-1 rounded-md px-4" bind:value={countryCode} name="" id="">
										<CountryPhone />
									</select>
									<Input
										class="col-span-3"
										placeholder="Ingresa tu numero"
										bind:value={phoneNumber}
									/>
								</div>
							{/if}
						</li>
					{/each}
				</article>
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

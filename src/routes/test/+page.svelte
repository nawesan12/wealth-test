<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { surveyAnswers } from '@/stores/survey';
	import type { SurveyAnswers } from '@/types/types';
	import { toast } from 'svelte-sonner';

	let token: string;

	async function handleAccessToken() {
		try {
			if (!token) {
				toast.error('Debes ingresar el codigo de acceso!');
				return;
			}

			localStorage.setItem('dep-token', token);
			surveyAnswers.update((value: SurveyAnswers) => {
				return {
					...value,
					token: token
				};
			});

			console.log('TOKEN GUARDADO: ', $surveyAnswers);

			const res = await fetch('/api/verify-access', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: token
			});
			const data = await res.json();

			if (data.token !== token) {
				toast.error('Token invalido!');
				return;
			}

			toast.success('Token valido! Accediendo...');
			goto('/test/reglas');
		} catch (error) {
			toast.error('Token invalido');
		}
	}
</script>

<section class="mx-auto flex flex-col lg:grid lg:max-h-screen lg:max-w-7xl lg:grid-cols-3">
	<header
		class="mx-auto my-6 flex flex-col items-center lg:col-span-2 lg:col-start-2 lg:row-span-1 lg:row-start-1"
	>
		<h1 class="text-dorado col-span-1 flex text-7xl font-bold">DEP</h1>
		<h2 class="text-center text-2xl text-white">
			La fórmula para transformar las finanzas de tu negocio
		</h2>
	</header>

	<img
		src="https://media.licdn.com/dms/image/C5603AQEsic89jJNboA/profile-displayphoto-shrink_800_800/0/1643241705131?e=1712188800&v=beta&t=9j0sA9EYOt46cJQFhy_SLChIJ8rA02OVsHOGMUbw2ME"
		alt=""
		class="mx-auto aspect-square size-72 rounded-xl md:size-96 lg:col-span-1 lg:col-start-1 lg:row-span-1 lg:row-start-2"
	/>

	<main class="lg:col-span-2 lg:col-start-2 lg:row-span-1 lg:row-start-2">
		<section class="texto my-8 mb-4 p-4 text-white lg:my-0">
			<p class="mb-6 text-xl">
				<span class="font-bold">
					¿Te has preguntado alguna vez cómo podrías llevar tu negocio al siguiente nivel? <br />
				</span>
				Seguro que sí y estoy convencido de poder ayudarte en ese proceso.
				<br />
				<br />
				Me presento, soy Angelo Nisi, instructor de finanzas personales y creador de la marca
				<a target="_blank" class="font-semibold" href="https://instagram.com/emperador.financiero">
					@emperador.financiero
				</a>, mediante la cual logré ayudar a cientos de emprendedores digitales a potenciar y
				automatizar sus finanzas.
				<br />
				<br />
				Hace unos meses tuve la posibilidad de diseñar un sistema financiero para una gran empresa que
				al implementarlo se logró administrar correctamente una facturación de más de 6 cifras en dólares.
				<br />
				<br />
				Por último, soy <b>idóneo del mercado de capitales</b>, regulado por la Comisión Nacional de
				Valores de Argentina.
				<br />
				<br />
				Trabajo exclusivamente con emprendedores comprometidos y listos para dar lo mejor de sí para
				que su negocio prospere.
				<br />
				<br />
				La visión de la marca es lograr ser la
				<b>solución financiera real para más de un millón de emprendedores</b>, transformando su
				relación con el dinero y ayudándolos a maximizar las ganancias de sus negocios.
			</p>
		</section>

		<div
			class="my-4 mb-12 flex flex-col gap-4 px-8 lg:col-span-2 lg:col-start-2 lg:row-span-1 lg:row-start-4 lg:mx-auto lg:grid lg:max-w-lg lg:grid-cols-2"
		>
			<Input type="text" bind:value={token} placeholder="Codigo de acceso" />
			<Button
				class="bg-dorado flex items-center justify-center gap-1 rounded-xl p-4  font-medium text-black hover:bg-rose-700"
				on:click={handleAccessToken}
			>
				Comenzar diagnostico
			</Button>
		</div>
	</main>
</section>

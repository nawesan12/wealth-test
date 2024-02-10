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
			surveyAnswers.update((value: SurveyAnswers) => {
				return {
					...value,
					token: token
				};
			});

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
			goto('/test/datos-iniciales');
		} catch (error) {
			toast.error('Token invalido');
		}
	}
</script>

<div class="mx-auto flex h-screen w-screen max-w-7xl items-center justify-center bg-white p-5">
	<div class="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:px-10">
		<div>
			<h1 class="mb-8 text-3xl font-bold text-black">
				<span class="text-green-700">Hola,</span> mi nombre es Angelo Nisi <br />
			</h1>
			<p class="mb-6 text-black">
				¿Te has preguntado alguna vez cómo podrías llevar tu negocio al siguiente nivel? Seguro que
				sí y estoy convencido de poder ayudarte en ese proceso.
				<br />
				<br />
				Me presento, soy Angelo Nisi, instructor de finanzas personales y creador de la marca
				<a
					target="_blank"
					class="font-semibold text-blue-900"
					href="https://instagram.com/emperador.financiero"
				>
					@emperador.financiero
				</a>, mediante la cual logré ayudar a cientos de emprendedores digitales a potenciar y
				automatizar sus finanzas.
				<br />
				<br />
				Hace unos meses tuve la posibilidad de diseñar un sistema financiero para una gran empresa que
				al implementarlo se logró administrar correctamente una facturación de más de 6 cifras en dólares.
				<br />
				<br />
				Por último, soy idóneo del mercado de capitales, regulado por la Comisión Nacional de Valores
				de Argentina.
				<br />
				<br />
				Trabajo exclusivamente con individuos comprometidos y listos para dar lo mejor de sí para que
				su negocio prospere.
				<br />
				<br />
				Mi visión es ser la solución financiera real para más de un millón de emprendedores, transformando
				su relación con el dinero y ayudándolos a maximizar las ganancias de sus negocios.
			</p>
			<div class="grid grid-cols-2 gap-4">
				<Input type="text" bind:value={token} placeholder="Codigo de acceso" />
				<Button
					class="flex items-center justify-center gap-1 rounded-xl bg-green-700 p-2 py-2 font-semibold text-white hover:bg-rose-700"
					on:click={handleAccessToken}
				>
					Comenzar diagnostico
				</Button>
			</div>
		</div>
		<img
			src="https://media.licdn.com/dms/image/C5603AQEsic89jJNboA/profile-displayphoto-shrink_800_800/0/1643241705131?e=1712188800&v=beta&t=9j0sA9EYOt46cJQFhy_SLChIJ8rA02OVsHOGMUbw2ME"
			alt=""
			class="mx-auto size-72 rounded-xl md:size-96"
		/>
	</div>
</div>

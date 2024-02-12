<script>
	import { onMount } from 'svelte';
	import Confetti from 'svelte-confetti';
	import emailjs from '@emailjs/browser';

	import { surveyAnswers } from '@/stores/survey';

	$: userEmail = $surveyAnswers.datos_iniciales[3];
	$: token = $surveyAnswers.token;
	$: userName = $surveyAnswers.datos_iniciales[0];

	onMount(() => {
		emailjs.send(
			'service_ztpqaee',
			'template_3wmncfg',
			{
				userEmail,
				token: `https://dep.emperadorfinanciero.com/${token}`,
				userName
			},
			'LzX3tW8GW9p6o7CRP'
		);
	});
</script>

<Confetti
	x={[-4, 11]}
	y={[0, 0.1]}
	delay={[500, 2000]}
	infinite
	duration={10000}
	amount={700}
	fallDistance="98vh"
/>

<section class="text-white">
	<div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
		<div class="mx-auto max-w-xl text-center">
			<h1 class="text-3xl font-extrabold sm:text-5xl">
				Felicidades!
				<strong class="min-w-max text-2xl font-extrabold sm:block">
					Completaste tu diagnostico
				</strong>
			</h1>

			<p class="mt-4 sm:text-xl/relaxed">
				En breve te enviaremos el informe del diagnostico a tu email
			</p>
			<span>Tambien puedes acceder con este link</span>

			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a
					class="bg-dorado text-verde block w-full rounded px-12 py-3 text-sm font-medium text-white shadow transition duration-200 hover:bg-blue-400 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
					href={`/${$surveyAnswers.token}`}
				>
					Ver Informe
				</a>
			</div>
		</div>
	</div>
</section>

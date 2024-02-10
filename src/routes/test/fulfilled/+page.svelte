<script>
	import { onMount } from 'svelte';
	import Confetti from 'svelte-confetti';
	import emailjs from '@emailjs/browser';

	onMount(() => {
		// emailjs.send('service_ztpqaee', 'template_3wmncfg', {}, 'LzX3tW8GW9p6o7CRP');
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

<section class="bg-zinc-50">
	<div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
		<div class="mx-auto max-w-xl text-center">
			<h1 class="text-3xl font-extrabold sm:text-5xl">
				Felicidades!
				<strong class="min-w-max text-2xl font-extrabold sm:block">
					Completaste tu diagnostico
				</strong>
			</h1>

			<p class="mt-4 sm:text-xl/relaxed">Te enviamos un informe por email</p>
			<span>Tambien podes acceder con este link</span>

			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a
					class="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow transition duration-200 hover:bg-blue-400 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
					href="/get-started"
				>
					Ver Informe
				</a>
			</div>
		</div>
	</div>
</section>

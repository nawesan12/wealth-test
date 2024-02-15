<script lang="ts">
	let tipIsOpen = true;
</script>

{#if tipIsOpen}
	<div
		class="fixed inset-0 z-40 flex items-center justify-center bg-transparent bg-opacity-50 p-4 backdrop-blur-lg"
	>
		<div
			class="tilt-in-fwd-tl rounded-lg border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:max-w-lg lg:p-8"
			role="alert"
		>
			<div class="flex items-center gap-4">
				<span class="bg-verde shrink-0 rounded-full p-2 text-white">
					<svg class="h-4 w-4" fill="#f8bc88">
						<path
							clip-rule="evenodd"
							d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
							fill-rule="evenodd"
						/>
					</svg>
				</span>

				<p class="font-medium sm:text-lg">Tip importante!</p>
			</div>

			<p class="mt-4 text-gray-500">
				Durante el diagnóstico, te encontrarás con este símbolo
				<svg
					width="20"
					height="20"
					class="inline"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#000000"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 9h.01" />
					<path d="M11 12h1v4h1" />
					<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
				</svg>
				a la izquierda de la pantalla.

				<br />
				Si pasas el mouse por encima, recibirás ayuda o información importante para contestar la pregunta
				en la que te encuentres.
			</p>

			<div class="mt-6 justify-end sm:flex sm:gap-4">
				<button
					on:click={() => (tipIsOpen = false)}
					class="bg-verde text-dorado mt-2 inline-block w-full rounded-lg bg-black px-5 py-3 text-center text-sm font-semibold sm:mt-0 sm:w-auto"
				>
					Entendido
				</button>
			</div>
		</div>
	</div>
{/if}

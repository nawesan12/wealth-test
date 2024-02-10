import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		conocimientoFinanciero: data[0] ?? '',
		formacionConstante: data[1] ?? '',
		conocimientoExcel: data[2] ?? '',
		tiempoNegocioSatisfaccion: data[3] ?? '',
		tipoNegocio: data[4] ?? '',
		productoServicioPrincipal: data[5] ?? '',
		aspectosMejorar: data[6] ?? '',
		desafioAdministracion: data[7] ?? '',
		infoEmpleados: data[8] ?? '',
		conocimientoIndicadores: data[9] ?? '',
		ventajaCompetitiva: data[10] ?? '',
		estudioMercado: data[11] ?? '',
		planMarketing: data[12] ?? '',
		contadorFiscal: data[13] ?? ''
	};

	const uploadedBussinessInfo = await prisma.businessInfo.create({
		data: initialDataToUpload
	});

	await prisma.surveyAnswer.update({
		where: {
			token: token
		},
		data: {
			bussinessInfoId: uploadedBussinessInfo.id
		}
	});

	return json(uploadedBussinessInfo);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

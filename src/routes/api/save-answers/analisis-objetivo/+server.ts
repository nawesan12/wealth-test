import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		resultadoNeto: data[0] ?? '',
		resultadoMoneda: data[1] ?? '',
		estrategiasInflacion: data[2] ?? '',
		cuentasNegocio: data[3] ?? '',
		separacionFinanzas: data[4] ?? '',
		dineroCobrado: data[5] ?? '',
		presupuestoClaro: data[6] ?? '',
		estructuraCostos: data[7] ?? '',
		fondoTranquilidad: data[8] ?? '',
		planDeudas: data[9] ?? '',
		herramientasGestion: data[10] ?? '',
		calculoRatios: data[11] ?? '',
		medicionLiquidez: data[12] ?? '',
		estadosFinancieros: data[13] ?? '',
		planFinancieroSalto: data[14] ?? ''
	};

	const uploadedObjectiveAnalysis = await prisma.objectiveAnalysis.create({
		data: initialDataToUpload
	});

	await prisma.surveyAnswer.update({
		where: {
			token: token
		},
		data: {
			objectiveAnalysisId: uploadedObjectiveAnalysis.id
		}
	});

	return json(uploadedObjectiveAnalysis);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

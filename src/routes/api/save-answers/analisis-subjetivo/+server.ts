import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		socioOEmprendedor: data[0] ?? '',
		relacionDinero: data[1] ?? '',
		emocionesNegativas: data[2] ?? '',
		perdidaOportunidades: data[3] ?? '',
		crecimientoEconomico: data[4] ?? ''
	};

	const uploadedSubjectiveAnalysis = await prisma.subjectiveAnalysis.create({
		data: initialDataToUpload
	});

	await prisma.surveyAnswer.update({
		where: {
			token: token
		},
		data: {
			subjectiveAnalysisId: uploadedSubjectiveAnalysis.id
		}
	});

	return json(uploadedSubjectiveAnalysis);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

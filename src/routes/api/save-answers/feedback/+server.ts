import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		sentimientoSesion: data[0] ?? '',
		diagnosticoCompleto: data[1] ?? '',
		seccionFavorita: data[2] ?? '',
		aprendizaje: data[3] ?? '',
		mejorasDinamica: data[4] ?? '',
		recomendacionSesion: data[5] ?? ''
	};

	const uploadedFeedback = await prisma.feedback.create({
		data: initialDataToUpload
	});

	await prisma.surveyAnswer.update({
		where: {
			token: token
		},
		data: {
			feedbackId: uploadedFeedback.id
		}
	});

	return json(uploadedFeedback);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

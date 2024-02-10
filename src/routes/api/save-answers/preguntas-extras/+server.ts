import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		crecimientoFuturo: data[0] ?? '',
		listoSiguientePaso: data[1] ?? '',
		comentarioExtra: data[2] ?? ''
	};

	const uploadedExtraQuestions = await prisma.extraQuestions.create({
		data: initialDataToUpload
	});

	await prisma.surveyAnswer.update({
		where: {
			token: token
		},
		data: {
			extraQuestionsId: uploadedExtraQuestions.id
		}
	});

	return json(uploadedExtraQuestions);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

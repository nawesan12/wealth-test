import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		comprehensiveDiagnosis: data[0] ?? '',
		feelings: data[1] ?? '',
		surprisingAspects: data[2] ?? '',
		newLearnings: data[3] ?? '',
		highlights: data[4] ?? '',
		suggestions: data[5] ?? '',
		recommendSession: data[6] ?? ''
	};

	const uploadedFeedback = await prisma.feedback.create({
		data: initialDataToUpload
	});

	const validToken = await prisma.accessInfoToken.findUnique({
		where: {
			token: token
		}
	});

	if (validToken) {
		await prisma.business.update({
			where: {
				accessInfoTokenId: validToken.id
			},
			data: {
				feedbackId: uploadedFeedback.id
			}
		});
	}

	return json(uploadedFeedback);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

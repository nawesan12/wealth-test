import { prisma } from '@/database/client.js';
import { error, json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { data, token } = await request.json();

		// Additional validation: Check if data and token are provided
		if (!data || !token) {
			throw new Error('Data and token are required!');
		}

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
	} catch (err: unknown) {
		// Handle errors
		return error(500, 'Internal Server Error');
	}
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	// Additional validation: Handle unsupported methods
	return text(`Unsupported method: ${request.method}`);
}

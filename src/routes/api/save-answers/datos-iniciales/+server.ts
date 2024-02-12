import { prisma } from '@/database/client.js';
import { error, json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { data, token } = await request.json();

		// Additional validation: Check if all required data is provided
		if (!data || !token) {
			throw new Error('Data and token are required!');
		}

		const initialDataToUpload = {
			name: data[0],
			instagram: data[1],
			web: data[2],
			email: data[3],
			whatsapp: data[4],
			age: data[5],
			country: data[6],
			referredBy: data[7],
			businessAgeAndSatisfaction: data[8]
		};

		const uploadedUser = await prisma.user.create({
			data: initialDataToUpload
		});

		const createdToken = await prisma.accessInfoToken.update({
			where: {
				token: token as string
			},
			data: {
				userId: uploadedUser.id
			}
		});

		await prisma.business.create({
			data: {
				userId: uploadedUser.id as string,
				businessInfoId: 0 as number,
				subjectiveAnalysisId: 0 as number,
				financialAnalysisId: 0 as number,
				feedbackId: 0 as number,
				accessInfoTokenId: createdToken.id as number
			}
		});

		return json({ uploadedUser, token, success: true });
	} catch (err: unknown) {
		// Handle errors
		console.error(error);
		return error(500, 'Internal Server Error');
	}
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	// Additional validation: Handle unsupported methods
	return text(`Unsupported method: ${request.method}`);
}

import { prisma } from '@/database/client.js';
import { error, json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { data, token } = await request.json();

		console.log(data, token);

		const initialDataToUpload = {
			name: data[0] ?? '',
			instagram: data[1].startsWith('@') ? data[1] : '@' + data[1],
			web: data[2] ?? 'Sin Pagina Web',
			email: data[3] ?? '',
			whatsapp: data[4] ?? '',
			age: data[5] ?? '',
			country: data[6] ?? '',
			referredBy: data[7] ?? '',
			businessAgeAndSatisfaction: data[8] ?? ''
		};

		// worksss
		const uploadedUser = await prisma.user.create({
			data: initialDataToUpload
		});

		console.log(uploadedUser);

		const tokenForId = await prisma.accessInfoToken.update({
			where: {
				token: token as string
			},
			data: {
				userId: uploadedUser.id
			}
		});

		console.log(tokenForId);

		const createdBusiness = await prisma.business.create({
			data: {
				userId: uploadedUser.id as string,
				businessInfoId: null,
				subjectiveAnalysisId: null,
				financialAnalysisId: null,
				feedbackId: null,
				accessInfoTokenId: tokenForId?.id as number
			}
		});

		console.log(createdBusiness);

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

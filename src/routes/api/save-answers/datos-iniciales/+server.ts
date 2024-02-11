import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

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
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

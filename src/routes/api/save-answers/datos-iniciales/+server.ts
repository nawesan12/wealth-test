import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		fullname: data[0],
		social: data[1],
		phone: data[2],
		ageRange: data[3],
		country: data[4],
		email: data[5]
	};

	const uploadedUser = await prisma.user.create({
		data: initialDataToUpload
	});

	await prisma.accessInfoToken.update({
		where: {
			token: token as string
		},
		data: {
			userId: uploadedUser.id
		}
	});

	await prisma.surveyAnswer.create({
		data: {
			userId: uploadedUser.id as string,
			bussinessInfoId: 0 as number,
			subjectiveAnalysisId: 0 as number,
			objectiveAnalysisId: 0 as number,
			extraQuestionsId: 0 as number,
			feedbackId: 0 as number,
			moneyInversionId: 0 as number,
			token: token as string
		}
	});

	return json({ uploadedUser, token, success: true });
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

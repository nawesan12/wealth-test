import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		historyAndVision: data[0] ?? '',
		businessType: data[1] ?? '',
		businessModel: data[2] ?? '',
		businessOffering: data[3] ?? '',
		mainProduct: data[4] ?? '',
		competitiveAdvantage: data[5] ?? '',
		marketResearch: data[6] ?? '',
		marketingPlan: data[7] ?? '',
		accountant: data[8] ?? '',
		financialSeparation: data[9] ?? '',
		technologySoftware: data[10] ?? '',
		financialConsultant: data[11] ?? '',
		objectives: data[12] ?? '',
		challenges: data[13] ?? '',
		mainAspectsToImprove: data[14] ?? '',
		administrationChallenge: data[15] ?? '',
		employees: data[16] ?? '',
		audits: data[17] ?? '',
		advertising: data[18] ?? '',
		salesProjections: data[19] ?? ''
	};

	const uploadedBussinessInfo = await prisma.businessInfo.create({
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
				businessInfoId: uploadedBussinessInfo.id as number
			}
		});
	}

	return json(uploadedBussinessInfo);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

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

		const uploadedBusinessInfo = await prisma.businessInfo.create({
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
					businessInfoId: uploadedBusinessInfo.id as number
				}
			});
		}

		return json(uploadedBusinessInfo);
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

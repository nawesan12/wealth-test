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
			mainProduct: data[3] ?? '',
			competitiveAdvantage: data[4] ?? '',
			marketResearch: data[5] ?? '',
			marketingPlan: data[6] ?? '',
			accountant: data[7] ?? '',
			financialSeparation: data[8] ?? '',
			technologySoftware: data[9] ?? '',
			financialConsultant: data[10] ?? '',
			objectives: data[11] ?? '',
			challenges: data[12] ?? '',
			mainAspectsToImprove: data[13] ?? '',
			administrationChallenge: data[14] ?? '',
			employees: data[15] ?? '',
			audits: data[16] ?? '',
			advertising: data[17] ?? '',
			salesProjections: data[18] ?? ''
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

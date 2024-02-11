import { prisma } from '@/database/client.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, token } = await request.json();

	const initialDataToUpload = {
		financialPolicy: data[0] ?? '',
		financialIndicators: data[1] ?? '',
		profitabilityMetrics: data[2] ?? '',
		currencyMeasurement: data[3] ?? '',
		inflationMitigation: data[4] ?? '',
		financialAccounts: data[5] ?? '',
		ownerCompensation: data[6] ?? '',
		budgeting: data[7] ?? '',
		costStructure: data[8] ?? '',
		emergencyFund: data[9] ?? '',
		breakevenAnalysis: data[10] ?? '',
		debtManagement: data[11] ?? '',
		liquidityMeasurement: data[12] ?? '',
		financialStatements: data[13] ?? '',
		inventoryTracking: data[14] ?? '',
		externalFinancing: data[15] ?? '',
		growthTransitionPlan: data[16] ?? '',
		financialConsultantPlan: data[17] ?? ''
	};

	const uploadedObjectiveAnalysis = await prisma.financialAnalysis.create({
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
				financialAnalysisId: uploadedObjectiveAnalysis.id
			}
		});
	}

	return json(uploadedObjectiveAnalysis);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}

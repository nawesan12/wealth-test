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
			financialPolicy: data[0] ?? '',
			financialIndicators: data[1] ?? '',
			profitabilityMetrics: data[2] ?? '',
			currencyMeasurement: data[3] ?? '',
			inflationMitigation: data[4] ?? '',
			financialAccounts: data[5] ?? '',
			ownerCompensation: data[6] ?? '',
			separatedWallets: data[7] ?? '',
			budgeting: data[8] ?? '',
			costStructure: data[9] ?? '',
			emergencyFund: data[10] ?? '',
			breakevenAnalysis: data[11] ?? '',
			debtManagement: data[12] ?? '',
			liquidityMeasurement: data[13] ?? '',
			financialStatements: data[14] ?? '',
			inventoryTracking: data[15] ?? '',
			trackingMethod: data[16] ?? '',
			externalFinancing: data[17] ?? '',
			growthTransitionPlan: data[18] ?? '',
			financialConsultantPlan: data[19] ?? '',
			extraCommentAboutCompany: data[20] ?? ''
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

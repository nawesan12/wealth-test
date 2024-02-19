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
			motivation: data[0] ?? '',
			financialKnowledge: data[1] ?? '',
			accountingKnowledge: data[2] ?? '',
			financialTraining: data[3] ?? '',
			partnerStatus: data[4] ?? '',
			delegation: data[5] ?? '',
			delegatedAreas: data[6] ?? '',
			emotionalExperience: data[7] ?? '',
			missedOpportunity: data[8] ?? '',
			suddenGrowth: data[9] ?? '',
			childhoodExperience: data[10] ?? '',
			emotionalEvaluation: data[11] ?? '',
			longTermCommitment: data[12] ?? '',
			financialRiskTolerance: data[13] ?? '',
			financialDecisionMaking: data[14] ?? ''
		};

		const uploadedSubjectiveAnalysis = await prisma.subjectiveAnalysis.create({
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
					subjectiveAnalysisId: uploadedSubjectiveAnalysis.id
				}
			});
		}

		return json(uploadedSubjectiveAnalysis);
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

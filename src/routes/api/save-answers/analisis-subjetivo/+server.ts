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
			financialKnowledge: data[0] ?? '',
			accountingKnowledge: data[1] ?? '',
			financialTraining: data[2] ?? '',
			partnerStatus: data[3] ?? '',
			delegation: data[4] ?? '',
			emotionalExperience: data[5] ?? '',
			missedOpportunity: data[6] ?? '',
			suddenGrowth: data[7] ?? '',
			childhoodBeliefs: data[8] ?? '',
			childhoodExperience: data[9] ?? '',
			lifeIncidents: data[10] ?? '',
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

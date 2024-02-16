import { prisma } from '@/database/client.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { token } = params;

	const validToken = await prisma.accessInfoToken.findUnique({
		where: {
			token: token
		}
	});

	try {
		if (validToken) {
			const informe = await prisma.business.findUnique({
				where: {
					accessInfoTokenId: validToken.id
				},
				include: {
					businessInfo: true,
					feedback: true,
					financialAnalysis: true,
					subjectiveAnalysis: true,
					token: true,
					User: true
				}
			});

			if (informe) {
				return {
					status: 200,
					body: { informe }
				};
			}
		} else {
			return {
				status: 404,
				body: {
					error: 'Informe no encontrado'
				}
			};
		}

		// Si no se encuentra el informe, puedes responder con un mensaje adecuado.
	} catch (error) {
		// Manejo de errores general
		console.error(error);
		return {
			status: 500,
			body: {
				error: 'Error interno del servidor'
			}
		};
	}
}

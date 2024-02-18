import { prisma } from '@/database/client.js';
import { error, json, text } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
	const token = await request.text();

	// Additional validation: Check if token is provided
	if (!token) {
		return error(400, 'Please provide a token!');
	}

	const deprecatedToken = await prisma.accessInfoToken.update({
		where: {
			token: token as string
		},
		data: {
			isUsed: true
		}
	});

	if (!deprecatedToken) {
		return error(400, 'Invalid token!');
	}

	return json({ success: true });
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }: { request: Request }) {
	// Additional validation: Handle unsupported methods
	return text(`Unsupported method: ${request.method}`);
}

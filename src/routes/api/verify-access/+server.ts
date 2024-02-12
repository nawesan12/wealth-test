import { prisma } from '@/database/client.js';
import { error, json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const token = await request.text();

	// Additional validation: Check if token is provided
	if (!token) {
		return error(400, 'Token is required!');
	}

	const verifiedToken = await prisma.accessInfoToken.findUnique({
		where: {
			token: token as string
		}
	});

	if (!verifiedToken) {
		return error(400, 'Invalid token!');
	}

	const tokenForCheck = verifiedToken.token;

	return json({ token: tokenForCheck });
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	// Additional validation: Handle unsupported methods
	return text(`Unsupported method: ${request.method}`);
}

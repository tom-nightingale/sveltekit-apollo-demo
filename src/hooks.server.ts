import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const serializeHeaders: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});
};

export const handle = sequence(sequence(serializeHeaders));

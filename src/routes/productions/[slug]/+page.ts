import productions from '$lib/data/productions.json';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const production = productions.find((p) => p.slug === params.slug);

	if (!production) {
		error(404, 'Not found');
	}

	return {
		production
	};
};

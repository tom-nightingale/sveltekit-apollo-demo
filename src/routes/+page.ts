import { error } from '@sveltejs/kit';
import client from '$lib/gql/apolloClient';
import gql from 'graphql-tag';

export async function load({ fetch }) {
	const apolloClient = client(fetch);

	const data = await apolloClient.query({
		query: gql`
			query GetCharacters {
				characters {
					results {
						name
					}
				}
			}
		`
	});

	if (data?.data?.characters?.results?.length < 1) {
		error(404, 'Not found');
	}

	return {
		characters: data?.data?.characters?.results
	};
}

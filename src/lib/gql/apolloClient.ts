import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
	type DefaultOptions
} from '@apollo/client/core/index.js';
import { onError } from '@apollo/client/link/error';
import { browser } from '$app/environment';

// Set our endpoint here.
const ENDPOINT = `https://rickandmortyapi.com/graphql`;

const httpLink = (fetchFn: typeof fetch) => {
	return createHttpLink({
		uri: ENDPOINT,
		fetch: fetchFn
	});
};

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }: any) =>
			console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	}

	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
	}
});

const ssrOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'ignore'
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all'
	}
};

export default function (fetchFn: typeof fetch) {
	return new ApolloClient({
		ssrMode: !browser,
		link: from([errorLink, httpLink(fetchFn)]),
		cache: new InMemoryCache(),
		defaultOptions: browser ? undefined : ssrOptions
	});
}

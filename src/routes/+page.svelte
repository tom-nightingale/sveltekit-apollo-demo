<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { characters } = data;
</script>

{#each characters as character}
	<p>{character.name}</p>
{/each}

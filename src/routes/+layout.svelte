<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();
	let isProductionPage = $derived(page.route.id?.startsWith('/productions/[slug]'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header />
{@render children()}
{#if !isProductionPage}
	<Footer />
{/if}

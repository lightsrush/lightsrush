<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import productions from '$lib/data/productions.json';
	import { onDestroy } from 'svelte';
	import { animate, createTimeline, splitText } from 'animejs';

	let currentIndex = $state(productions.length - 1);
	let filter = $state('all');

	let filteredProductions = $derived(
		productions.filter((p) => filter === 'all' || p.duration === filter)
	);

	let currentProduction = $derived(productions[currentIndex]);

	// The video that will play right after the current one, so we can start
	// preloading it in the background and avoid a loading cut when it switches in.
	let nextIndex = $derived((currentIndex - 1 + productions.length) % productions.length);
	let nextProduction = $derived(productions[nextIndex]);
	let nextVideoUrl = $derived(asset(`/videos/${nextProduction.slug}.webm`));

	const reversedProductions = $derived([...filteredProductions].reverse());

	function playNextVideo() {
		currentIndex = (currentIndex - 1 + productions.length) % productions.length;
	}

	let videoPlayer: HTMLVideoElement | undefined = $state();
	let preloadPlayer: HTMLVideoElement | undefined = $state();

	// Two stacked text layers: while one shows the current title, the other is
	// prepared with the next title and animated in with a timeline once the
	// current one has animated out.
	let titleElA: HTMLDivElement | undefined = $state();
	let titleElB: HTMLDivElement | undefined = $state();
	let titleAClass = $state('text-5xl');
	let titleBClass = $state('text-5xl');

	let splitA: ReturnType<typeof splitText> | undefined;
	let splitB: ReturnType<typeof splitText> | undefined;
	let activeSplit: 'A' | 'B' = 'A';
	let activeTitle: string | undefined;

	function titleSizeClass(title: string) {
		return title.length > 15 ? 'text-3xl md:text-7xl' : 'text-5xl md:text-7xl';
	}

	$effect(() => {
		if (videoPlayer && currentProduction) {
			videoPlayer.load();
			videoPlayer.play().catch(() => {});
		}
	});

	$effect(() => {
		if (preloadPlayer && nextVideoUrl) {
			preloadPlayer.load();
		}
	});

	$effect(() => {
		if (!titleElA || !titleElB) return;

		if (!splitA) {
			// Initial setup: put the first title in layer A and reveal it.
			titleElA.textContent = currentProduction.title;
			titleAClass = titleSizeClass(currentProduction.title);
			activeTitle = currentProduction.title;
			splitA = splitText(titleElA, { words: true });
			splitB = splitText(titleElB, { words: true });

			animate(splitA.words, {
				opacity: [0, 1],
				y: [16, 0],
				duration: 500,
				ease: 'outQuad'
			});
		} else if (splitA && splitB && currentProduction.title !== activeTitle) {
			const nextTitle = currentProduction.title;

			const outSplit = activeSplit === 'A' ? splitA : splitB;
			const inSplit = activeSplit === 'A' ? splitB : splitA;

			// Prepare the incoming layer with the new title and re-split it, then
			// hide its chars so they can be animated in by the timeline below.
			inSplit.html = nextTitle;
			if (activeSplit === 'A') titleBClass = titleSizeClass(nextTitle);
			else titleAClass = titleSizeClass(nextTitle);
			inSplit.refresh();
			animate(inSplit.words, { opacity: 0, y: 16, duration: 0 });

			createTimeline({
				onComplete: () => {
					activeTitle = nextTitle;
					activeSplit = activeSplit === 'A' ? 'B' : 'A';
				}
			})
				.add(outSplit.words, { opacity: [1, 0], y: [0, -16], duration: 500, ease: 'inQuad' })
				.add(inSplit.words, { opacity: [0, 1], y: [16, 0], duration: 500, ease: 'outQuad' });
		}
	});

	onDestroy(() => {
		splitA?.revert();
		splitB?.revert();
	});
</script>

<svelte:head>
	<title>Productions</title>
	<link rel="preload" as="video" href={nextVideoUrl} type="video/webm" />
</svelte:head>

<div class="bg-base-100 text-base-content overflow-x-hidden m-0 p-0 min-h-screen flex flex-col">
	<div id="video-container" class="relative w-screen h-svh shrink-0">
		<video
			bind:this={videoPlayer}
			id="movie-player"
			class="w-full h-full object-cover"
			autoplay
			muted
			onended={playNextVideo}
		>
			<source src="{asset(`/videos/${currentProduction.slug}.webm`)}" type="video/webm" />
			Your browser does not support the video tag.
		</video>
		<div
			id="movie-title"
			class="absolute bottom-8 left-8 md:left-16 w-full font-medium futura [text-shadow:0_5px_8px_rgba(0,0,0,0.6)]"
		>
			<div bind:this={titleElA} class={titleAClass}></div>
			<div bind:this={titleElB} class="absolute top-0 left-0 {titleBClass}"></div>
		</div>
	</div>

	<!-- Hidden video used only to preload/buffer the next video so it plays without a cut. -->
	<video
		bind:this={preloadPlayer}
		class="hidden"
		muted
		preload="auto"
		aria-hidden="true"
	>
		<source src={nextVideoUrl} type="video/webm" />
	</video>

	<div
		class="flex flex-col gap-4 py-8 bg-base-200"
	>
		<form class="flex justify-center gap-4">
			<input
				class="btn"
				type="radio"
				name="filter"
				aria-label="All"
				value="all"
				bind:group={filter}
			/>
			<input
				class="btn"
				type="radio"
				name="filter"
				aria-label="Shorts"
				value="short"
				bind:group={filter}
			/>
			<input
				class="btn"
				type="radio"
				name="filter"
				aria-label="Features"
				value="feature"
				bind:group={filter}
			/>
		</form>

		<div class="flex flex-wrap gap-8 px-8 md:px-14 pb-8 items-center justify-center">
			{#each reversedProductions as p}
				<a href="{resolve(`/productions/${p.slug}`)}" class="shrink-0">
					<div class="w-40 p-2 border-box flex flex-col gap-2 items-center hover:scale-105 transition-transform">
						<img src="{asset(`/posters/${p.slug}.jpeg`)}" alt={p.title} class="shadow-lg rounded-sm" />
						<div class="text-2xl futura text-center">{p.title}</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

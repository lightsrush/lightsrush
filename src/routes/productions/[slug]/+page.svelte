<script lang="ts">
	import { asset } from '$app/paths';
	import { onDestroy, onMount } from 'svelte';
	import { FastAverageColor } from 'fast-average-color';

	let { data } = $props();
	let production = $derived(data.production);

	let scrollContainer: HTMLDivElement | undefined = $state();
	let overlayOpacity = $state(0);
	let activeIndex = $state(0);
	let scrollPercent = $state(0);

	let videoEl: HTMLVideoElement | undefined = $state();

	// Colors currently rendered in the gradient (smoothly eased towards the targets).
	let gradientFrom = $state('#000000');
	let gradientTo = $state('#000000');

	// Color currently rendered on the overlay (smoothly eased towards the target).
	let overlayColor = $state('#000000');

	// Latest colors sampled from the video, used as the animation targets.
	let currentRgb: [number, number, number] = [0, 0, 0];
	let targetFromRgb: [number, number, number] = [0, 0, 0];
	let currentToRgb: [number, number, number] = [0, 0, 0];
	let targetToRgb: [number, number, number] = [0, 0, 0];
	let currentOverlayRgb: [number, number, number] = [0, 0, 0];
	let targetOverlayRgb: [number, number, number] = [0, 0, 0];

	const fac = new FastAverageColor();
	let colorInterval: ReturnType<typeof setInterval> | undefined;
	let animationFrame: number | undefined;

	// Lower values = smoother/slower transitions, higher values = snappier ones.
	const EASING = 0.004;

	function darken(rgb: number[], factor: number): [number, number, number] {
		const [r, g, b] = rgb;
		return [r * factor, g * factor, b * factor];
	}

	function lerp(from: number, to: number, t: number) {
		return from + (to - from) * t;
	}

	function toRgbString(rgb: number[]) {
		return `rgb(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])})`;
	}

	function updateGradientColors() {
		if (!videoEl || videoEl.readyState < 2) return;

		const width = videoEl.videoWidth;
		const height = videoEl.videoHeight;
		if (!width || !height) return;

		try {
			// Sample the top-left and bottom-right regions of the current frame to
			// match the direction of the diagonal `bg-linear-108` gradient.
			const from = fac.getColor(videoEl, {
				algorithm: 'dominant',
				left: 0,
				top: height / 6,
				width: width / 2,
				height: 2 * height / 6
			});
			const to = fac.getColor(videoEl, {
				algorithm: 'dominant',
				left: width / 2,
				top: height / 2,
				width: width / 2,
				height: 2 * height / 6
			});

			targetFromRgb = darken(from.value, 0.5);
			targetToRgb = darken(to.value, 0.75);

			// Sample the whole video frame for the overlay color.
			const overlay = fac.getColor(videoEl, {
				algorithm: 'dominant',
				left: 0,
				top: 0,
				width,
				height
			});

			targetOverlayRgb = darken(overlay.value, 0.35);
		} catch (e) {
			// Ignore frames that can't be sampled yet (e.g. not enough data).
		}
	}

	// Smoothly eases the rendered gradient colors towards the latest sampled targets
	// on every animation frame, so color changes never pop between samples.
	function animateGradient() {
		currentRgb = [
			lerp(currentRgb[0], targetFromRgb[0], EASING),
			lerp(currentRgb[1], targetFromRgb[1], EASING),
			lerp(currentRgb[2], targetFromRgb[2], EASING)
		];
		currentToRgb = [
			lerp(currentToRgb[0], targetToRgb[0], EASING),
			lerp(currentToRgb[1], targetToRgb[1], EASING),
			lerp(currentToRgb[2], targetToRgb[2], EASING)
		];
		currentOverlayRgb = [
			lerp(currentOverlayRgb[0], targetOverlayRgb[0], EASING),
			lerp(currentOverlayRgb[1], targetOverlayRgb[1], EASING),
			lerp(currentOverlayRgb[2], targetOverlayRgb[2], EASING)
		];

		gradientFrom = toRgbString(currentRgb);
		gradientTo = toRgbString(currentToRgb);
		overlayColor = toRgbString(currentOverlayRgb);

		animationFrame = requestAnimationFrame(animateGradient);
	}

	onMount(() => {
		colorInterval = setInterval(updateGradientColors, 500);
		animationFrame = requestAnimationFrame(animateGradient);
	});

	onDestroy(() => {
		if (colorInterval) clearInterval(colorInterval);
		if (animationFrame) cancelAnimationFrame(animationFrame);
		fac.destroy();
	});

	function handleScroll() {
		if (!scrollContainer) return;
		const scrollTop = scrollContainer.scrollTop;
		const viewportHeight = window.innerHeight;
		
		// Map scroll to 0-1 for the first page fade effects
		scrollPercent = Math.min(scrollTop / viewportHeight, 1);
		overlayOpacity = Math.pow(scrollPercent * 0.8, 2);
		
		// Update active index for indicator
		activeIndex = Math.round(scrollTop / viewportHeight);
	}

	function scrollToPage(index: number) {
		if (!scrollContainer) return;
		scrollContainer.scrollTo({
			top: index * window.innerHeight,
			behavior: 'smooth'
		});
	}
</script>

<svelte:head>
	<title>{production.title}</title>
</svelte:head>

<div class="text-base-content overflow-hidden h-screen w-screen bg-base-100">
	<div
		class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-0 pointer-events-none"
		style="background: linear-gradient(108deg, {gradientFrom}, {gradientTo});"
	>
		<div class="absolute w-full h-full opacity-30 bg-[url('/noise.svg')] z-[-1]"></div>

		<div id="video-container" class="w-full md:w-[75%] h-full md:h-auto md:aspect-video shadow-xl">
			<video
				bind:this={videoEl}
				id="movie-player"
				class="object-cover w-full h-full"
				autoplay
				loop
				muted
				crossorigin="anonymous"
			>
				<source src="{asset(`/videos/${production.slug}.webm`)}" type="video/webm" />
				Your browser does not support the video tag.
			</video>
		</div>

		<div
			id="overlay"
			class="absolute w-full h-full"
			style="background-color: {overlayColor}; opacity: {overlayOpacity}"
		></div>
	</div>

	<div
		bind:this={scrollContainer}
		onscroll={handleScroll}
		class="absolute w-screen h-screen top-0 scrollbar-none overflow-y-scroll overflow-x-hidden snap-mandatory snap-y z-10 scroll-smooth"
	>
		<!-- Teaser -->
		<div class="w-screen h-screen snap-start flex items-center justify-center">
			<div class="relative w-full md:w-[75%] aspect-video h-full md:h-auto">
			</div>
		</div>

		<!-- Description -->
		<div class="w-screen h-screen snap-start flex items-center justify-center px-12 md:px-32">
			<div class="max-w-3xl text-lg md:text-2xl font-normal leading-relaxed text-center">
				{production.description}
			</div>
		</div>

		<!-- Cast & Crew -->
		<div class="w-screen h-screen snap-start flex flex-col items-center justify-center gap-12 px-8">
			<div class="flex flex-col md:flex-row gap-12 md:gap-24 text-center">
				<div class="flex flex-col gap-2 md:gap-3">
					<div class="font-extralight uppercase tracking-widest text-lg md:text-xl opacity-60">Directed By</div>
					{#each production.directedBy as d}
						<div class="text-2xl md:text-4xl font-medium futura leading-tight">{d}</div>
					{/each}
				</div>
				
				{#if production.starring.length > 0}
					<div class="flex flex-col gap-2 md:gap-3">
						<div class="font-extralight uppercase tracking-widest text-lg md:text-xl opacity-60">Starring</div>
						{#each production.starring as p}
							<div class="text-2xl md:text-4xl font-medium futura leading-tight">{p}</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Festivals -->
		{#if production.festivals && production.festivals.length > 0}
			{@const small = production.festivals.length > 6}
			<div class="w-screen h-screen snap-start flex flex-col items-center justify-center px-12">
				<div class="flex flex-col {small ? 'gap-2 md:gap-3 lg:gap-5' : 'gap-6'} max-w-4xl text-center">
					{#each production.festivals as f}
						<div class="flex flex-col">
							{#if f.reward}
								<div class="{small ? 'text-sm' : 'text-base'} md:text-xl uppercase font-medium leading-tight">{f.reward}</div>
								<div class="{small ? 'text-sm' : 'text-base'} md:text-xl leading-tight">{f.name}</div>
							{:else}
								<div class="{small ? 'text-xs' : 'text-base'} md:text-base opacity-75 leading-tight">{f.name}</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Page Indicator -->
	<div class="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
		{#each Array(2 + (production.starring.length > 0 ? 1 : 0) + (production.festivals?.length > 0 ? 1 : 0)) as _, i}
			<button
				onclick={() => scrollToPage(i)}
				class="size-2 md:size-3 rounded-full border border-base-content transition-all duration-300 {activeIndex === i ? 'bg-base-content scale-125' : 'bg-transparent hover:bg-base-content/50'}"
				aria-label="Scroll to page {i + 1}"
			></button>
		{/each}
	</div>

	<div class="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-full">
		<div class="flex flex-col md:flex-row items-center gap-2 md:gap-8 md:justify-center">
			<div class="text-4xl md:text-6xl font-medium futura text-shadow-lg">
				{production.title}
			</div>
			
			<div class="flex flex-row gap-4 items-center">
				{#if production.watch_on && production.watch_on.length > 0}
					<div class="dropdown dropdown-top dropdown-center">
						<div role="button" tabindex="0" class="btn btn-sm md:btn-md btn-primary uppercase tracking-widest">
							Watch Now
						</div>
						<ul class="dropdown-content menu bg-base-200/95 backdrop-blur-md rounded-box z-1 w-52 p-2 shadow-2xl mb-4 border border-base-content/10">
							{#each production.watch_on as item}
								<li>
									<a href={item.link} target="_blank" rel="noopener noreferrer" class="text-base-content hover:bg-base-content hover:text-base-100 uppercase text-xs tracking-[0.2em] py-4 justify-center transition-colors">
										{item.platform}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if production.trailer}
					<a href={production.trailer} target="_blank" rel="noopener noreferrer" class="btn btn-sm md:btn-md btn-outline border-base-content text-base-content hover:bg-base-content hover:text-base-100 backdrop-blur-md bg-base-100/30 uppercase tracking-widest transition-colors">
						See Trailer
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>

<script>
	import { asset, resolve } from '$app/paths';
</script>

<header
	class="navbar fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-8"
>
	<div class="navbar-start hidden md:inline md:w-1/4"></div>

	<div class="navbar-center flex justify-center w-1/2">
		<a href="{resolve('/')}" class="hover:opacity-80 transition-opacity">
			<img src="{asset('/logo.png')}" alt="Lights Rush" class="h-12 md:h-16" />
		</a>
	</div>

	<div class="navbar-end flex justify-center md:justify-end items-center gap-0.5 md:gap-1 lg:gap-2 w-1/2 md:w-1/4">
		<a
			href="https://www.instagram.com/lightsrush/"
			target="_blank"
			rel="noopener noreferrer"
			title="Instagram"
			class="social-link btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-4 md:size-5 fill-current">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.-->
				<path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
			</svg>
		</a>
		<a
			href="https://www.youtube.com/@LightsRush/"
			target="_blank"
			rel="noopener noreferrer"
			title="YouTube"
			class="social-link btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="size-4 md:size-5 fill-current">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.-->
				<path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
			</svg>
		</a>
		<a
			href="https://vimeo.com/user127393828"
			target="_blank"
			rel="noopener noreferrer"
			title="Vimeo"
			class="social-link max-sm:hidden btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-4 md:size-5 fill-current">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.-->
				<path d="M403.2 32H44.8C20.1 32 0 52.1 0 76.8v358.4C0 459.9 20.1 480 44.8 480h358.4c24.7 0 44.8-20.1 44.8-44.8V76.8c0-24.7-20.1-44.8-44.8-44.8zM377 180.8c-1.4 31.5-23.4 74.7-66 129.4-44 57.2-81.3 85.8-111.7 85.8-18.9 0-34.8-17.4-47.9-52.3-25.5-93.3-36.4-148-57.4-148-2.4 0-10.9 5.1-25.4 15.2l-15.2-19.6c37.3-32.8 72.9-69.2 95.2-71.2 25.2-2.4 40.7 14.8 46.5 51.7 20.7 131.2 29.9 151 67.6 91.6 13.5-21.4 20.8-37.7 21.8-48.9 3.5-33.2-25.9-30.9-45.8-22.4 15.9-52.1 46.3-77.4 91.2-76 33.3.9 49 22.5 47.1 64.7z"/>
			</svg>
		</a>
		<a
			href="https://www.linkedin.com/company/lights-rush/"
			target="_blank"
			rel="noopener noreferrer"
			title="LinkedIn"
			class="social-link max-sm:hidden btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-4 md:size-5 fill-current">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.-->
				<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
			</svg>
		</a>
		<a
			href="https://www.facebook.com/Lights-Rush-Productions-108221471115313"
			target="_blank"
			rel="noopener noreferrer"
			title="Facebook"
			class="social-link btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-4 md:size-5 fill-current">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.-->
				<path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
			</svg>
		</a>
		<a
			href="https://www.imdb.com/search/title/?companies=co0829385"
			target="_blank"
			rel="noopener noreferrer"
			title="IMDb"
			class="social-link btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" class="w-7 h-7 md:w-9 md:h-9 fill-current">
				<path d="M197 122.7v255.4h-66.2V122.7zm141.4 0-15.3 119.4-9.4-64.9c-2.8-20.8-5.4-39-8-54.5h-85.9v255.4h58.1l.3-168.6 24.4 168.6H344l23.3-172.3v172.3h58.1V122.7h-86.7Zm109.3 255.4V122.7h49.4c32.1 0 50.6 1.5 61.9 4.5s19.9 7.8 25.7 14.5c6 6.7 9.7 14.2 11.1 22.4 1.4 8.3 2.4 24.5 2.4 48.7v89.6c0 22.9-1.2 38.3-3.5 45.9-2.1 7.7-5.9 13.7-11.3 18.1-5.3 4.5-12 7.4-19.8 9.2-7.9 1.7-19.8 2.6-35.7 2.6h-80.4Zm66.2-211.7V334c9.5 0 15.4-1.9 17.6-5.7s3.4-14.2 3.4-31.3v-98.9c0-11.5-.4-18.9-1.1-22.2s-2.5-5.7-5.1-7.2c-2.6-1.6-7.6-2.3-14.7-2.3Zm170.8-43.7v83.1c5.3-6.1 11.3-10.6 17.7-13.6 6.6-3.1 16.3-4.6 23.9-4.6s16.4 1.4 22.9 4.1c6.4 2.7 11.3 6.6 14.7 11.5 3.3 5 5.4 9.8 6.1 14.5s1 14.7 1 30.2v71.7c0 15.2-1 26.6-3.1 34.2-2 7.4-6.8 14-14.5 19.4-7.6 5.6-16.7 8.3-27.1 8.3s-17.2-1.6-23.8-4.8c-6.6-3.4-12.5-8.2-17.8-14.7l-4.2 16.2h-59.7V122.7zm22.4 128c0-10.8-.7-17.8-2.1-21.2-1.4-3.2-6.8-5-10.9-5s-6.4 1.5-7.7 4.3c-1.1 3-1.7 10.2-1.7 21.8v67.5c0 11.3.7 18.4 2 21.5 1.4 3.2 4 4.7 7.9 4.7s9.4-1.6 10.7-4.8c1.2-3.2 1.9-11.1 1.9-23.4v-65.5Z" style="fill:#f5f5f5"/><path style="fill:none" d="M-.4 1h901.9v500H-.4z"/>
			</svg>
		</a>
		<a
			href="mailto:lightsrushproductions@gmail.com"
			title="Email"
			class="social-link max-sm:hidden btn btn-ghost btn-circle btn-sm md:btn-md text-base-content"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-4 md:size-5 fill-current">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.-->
				<path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
			</svg>
		</a>
	</div>
</header>

<style>
	.social-link:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>

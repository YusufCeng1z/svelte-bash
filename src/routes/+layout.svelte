<script lang="ts">
	import "./layout.css";
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(async () => {
		const { default: Lenis } = await import("lenis");
		const { default: gsap } = await import("gsap");
		const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger.js");

		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			touchMultiplier: 2,
		});

		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis.destroy();
			gsap.ticker.remove(lenis.raf);
		};
	});
</script>

<Header />
<main>
	{@render children()}
</main>

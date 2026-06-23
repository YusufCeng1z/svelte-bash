<script lang="ts">
    import { onMount } from "svelte";

    let headerContent: HTMLElement;
    let logoArea: HTMLElement;
    let menuArea: HTMLElement;
    let buttonArea: HTMLElement;

    let copied = false;
    function copyInstall() {
        navigator.clipboard.writeText("npm install svelte-bash");
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }

    onMount(async () => {
        const { default: gsap } = await import("gsap");

        const fullWidth = headerContent.offsetWidth;
        const initialWidth = window.innerWidth < 768 ? "120px" : "180px";
        const tl = gsap.timeline({ delay: 0.2 });

        gsap.set([menuArea, buttonArea], { opacity: 0, x: -20 });
        gsap.set(headerContent, { width: initialWidth, overflow: "hidden" });

        tl.to(headerContent, {
            width: fullWidth,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => gsap.set(headerContent, { width: "auto" }),
        }).to(
            [menuArea, buttonArea],
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            },
            "-=0.5",
        );
    });
</script>

<header class="w-full h-20 md:h-24 fixed top-0 left-0 z-50 p-4 md:p-5 flex justify-center items-center">
    <div
        bind:this={headerContent}
        class="header-content p-3 md:p-4 flex justify-between gap-4 md:gap-20 items-center text-white rounded-xl backdrop-blur-sm"
    >
        <a
            href="/"
            class="logo-area cursor-pointer group shrink-0"
            bind:this={logoArea}
        >
            <div
                class="font-unbounded text-lg md:text-[20px] flex items-center justify-center tracking-tight"
            >
                <span class="font-light text-white">svelte</span>
                <span
                    class="font-light text-[#BFBFBF] transition-colors duration-300 group-hover:text-white"
                    >bash</span
                >
                <span class="text-[#ff3e00] font-black">.</span>
            </div>
        </a>
        <div class="menu-area shrink-0 hidden md:block" bind:this={menuArea}>
            <ul class="flex items-center gap-6 text-[15px]">
                <li class="hover:text-white/70 transition-colors">
                    <a href="/examples" class="block">Examples</a>
                </li>
                <li class="w-[1px] h-4 bg-white/20 rotate-[15deg]"></li>
                <li class="hover:text-white/70 transition-colors">
                    <a href="https://github.com/YusufCeng1z/svelte-bash" target="_blank" class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        GitHub
                    </a>
                </li>
            </ul>
        </div>
        <div class="button-area shrink-0" bind:this={buttonArea}>
            <button
                on:click={copyInstall}
                class="header-btn group flex items-center gap-2 bg-[#ff3e00] h-full text-sm px-3 md:px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 transition-all duration-300"
            >
                <span class="hidden md:inline font-mono">npm install</span>
                <span class="inline md:hidden font-mono">npm i</span>
                {#if copied}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {/if}
            </button>
        </div>
    </div>
</header>

<style>
    header .header-content {
        height: 100%;
        background: rgba(217, 217, 217, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(10px);
    }

    header .button-area .header-btn {
        border: 1px rgba(255, 255, 255, 0.226) solid;
    }
</style>

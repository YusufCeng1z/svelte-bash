<script lang="ts">
    import { onMount } from "svelte";
    import { Terminal } from "$lib";
    import type { FileStructure } from "$lib/types";

    // --- DEMO DATA ---
    const myFiles: FileStructure = {
        "readme.md":
            "# Svelte Bash\nA configurable, lightweight terminal component.",
        src: {
            "App.svelte": "<script>...</scr" + "ipt>",
            "main.ts": "console.log('Hello Terminal');",
        },
        public: {
            "favicon.ico": "[BINARY CONTENT]",
        },
    };

    const myCommands = {
        star: async () => "⭐ Thank you for the star! You are awesome.",
        socials: async () =>
            "GitHub: github.com/YusufCeng1z\nTwitter: @YusufCeng1z",
    };

    onMount(async () => {
        const { default: gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger.js");

        gsap.registerPlugin(ScrollTrigger);

        const title = document.querySelector(".hero-title");
        const desc = document.querySelector(".hero-desc");
        const actions = document.querySelector(".hero-actions");

        gsap.fromTo(
            [title, desc, actions],
            { opacity: 0, y: 35, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 2.2,
                stagger: 0.2,
                ease: "expo.out",
                delay: 0.4,
            },
        );

        gsap.fromTo(
            ".terminal-container",
            { opacity: 0, scale: 0.95, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.4,
                ease: "power3.out",
                delay: 0.8,
            }
        );

        gsap.utils.toArray(".bento-card").forEach((card: any) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 30 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                }
            );
        });

        // Hero Parallax Effect
        gsap.to(".hero-content", {
            y: 400,
            scale: 0.9,
            opacity: -0.5,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    });
</script>

<svelte:head>
    <title>Svelte Bash - The Terminal Component for Svelte</title>
</svelte:head>

<div class="w-full overflow-hidden text-zinc-300 font-sans">
    
    <!-- HERO SECTION -->
    <div class="hero-section relative container mx-auto flex flex-col justify-center items-center text-center min-h-[90vh] pt-32 pb-32 md:pt-40 md:pb-32 px-6">
        <!-- Ambient Bottom Glow (Svelte Orange) -->
        <div
            class="absolute -bottom-20 md:-bottom-40 left-0 w-full h-[400px] md:h-[600px] pointer-events-none -z-10"
            style="background: radial-gradient(ellipse at bottom, rgba(255, 62, 0, 0.12) 0%, rgba(255, 62, 0, 0.03) 50%, transparent 75%);"
        ></div>

        <div class="hero-content flex flex-col items-center gap-5 z-0">
            <h1 class="hero-title text-white text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.1]">
                <span class="font-medium">The embedded terminal</span><br/>
                <span class="font-light text-[#BFBFBF]">for Svelte</span><span class="text-[#ff3e00] font-medium">.</span>
            </h1>
            
            <p class="hero-desc text-[#8C8C8C] max-w-2xl text-sm md:text-base leading-relaxed px-4 md:px-0 mt-2">
                I engineer premium front-end components. <br class="hidden md:block"/>
                A fully typed, highly customizable, zero-dependency terminal
                for your interactive CLI tutorials or developer portfolios.
            </p>

            <div class="hero-actions flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                <a
                    href="/examples"
                    class="flex items-center justify-center bg-white text-black h-12 px-8 rounded-xl font-medium transition-opacity hover:opacity-90 w-full sm:w-auto"
                >
                    View Examples
                </a>
                <a
                    href="https://github.com/YusufCeng1z/svelte-bash"
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white h-12 px-8 rounded-xl font-medium hover:bg-white/5 transition-all w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    Star on GitHub
                </a>
            </div>
        </div>
    </div>

    <!-- TERMINAL SHOWCASE -->
    <div class="terminal-container max-w-4xl mx-auto px-6 relative z-10 -mt-10 md:-mt-20 mb-32">
        <div class="bg-[#171717] rounded-xl relative overflow-hidden group border border-white/5 transition-colors duration-500 hover:border-white/20 shadow-2xl">
            <div class="absolute top-0 left-0 w-full h-10 bg-[#121212] border-b border-white/5 flex items-center px-4 gap-2 z-20">
                <div class="w-3 h-3 rounded-full border border-white/10 flex items-center justify-center text-[#8C8C8C] hover:bg-[#ff5f56] transition-colors"></div>
                <div class="w-3 h-3 rounded-full border border-white/10 flex items-center justify-center text-[#8C8C8C] hover:bg-[#ffbd2e] transition-colors"></div>
                <div class="w-3 h-3 rounded-full border border-white/10 flex items-center justify-center text-[#8C8C8C] hover:bg-[#27c93f] transition-colors"></div>
                <div class="ml-4 flex-1 text-center text-xs font-mono text-[#8C8C8C] tracking-wide pr-14 select-none">
                    guest@svelte-bash:~
                </div>
            </div>
            <div class="pt-10 bg-[#121212]">
                <Terminal
                    theme="dracula"
                    structure={myFiles}
                    commands={myCommands}
                    ghostCompletion={true}
                    typewriter={15}
                    welcomeMessage={[
                        "Welcome to svelte-bash v1.2.0!",
                        "Type 'help' to see available commands.",
                        "Try: 'nano readme.md' or 'echo Hello > file.txt'",
                    ]}
                    style="height: 450px; width: 100%; border:none; border-radius: 0 0 0.75rem 0.75rem;"
                />
            </div>
        </div>
    </div>

    <section class="bg-[#121212] border-y border-white/5 py-24 md:py-32">
        <div class="container mx-auto px-6 md:px-[8vw]">
            
            <div class="w-full mb-16 text-center md:text-left">
                <h2 class="text-white text-4xl md:text-5xl tracking-tight">
                    <span class="font-medium">Quick</span>
                    <span class="font-light text-[#BFBFBF]">Start</span>
                    <span class="text-[#ff3e00] font-medium">.</span>
                </h2>
                <p class="text-[#8C8C8C] mt-4 max-w-xl mx-auto md:mx-0">
                    Instantly integrate an interactive shell into your Svelte application with minimal configuration.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="bento-card w-full bg-[#171717] rounded-xl relative overflow-hidden group border border-white/5 transition-colors duration-500 hover:border-white/20">
                    <div class="absolute top-0 left-0 w-full h-10 bg-[#121212] border-b border-white/5 flex items-center px-4 gap-2 z-20">
                        <span class="text-xs font-mono text-[#8C8C8C]">App.svelte</span>
                    </div>
                    <div class="w-full p-8 pt-16 h-full font-mono text-sm overflow-x-auto text-zinc-300">
                        <pre><code><span class="text-zinc-500">&lt;script&gt;</span>
  <span class="text-[#ff3e00]">import</span> &#123; Terminal &#125; <span class="text-[#ff3e00]">from</span> <span class="text-green-300">'svelte-bash'</span>;

  <span class="text-[#ff3e00]">const</span> files = &#123;
    <span class="text-green-300">'readme.md'</span>: <span class="text-yellow-300">'# Hello World'</span>
  &#125;;
<span class="text-zinc-500">&lt;/script&gt;</span>

<span class="text-zinc-500">&lt;</span><span class="text-[#ff3e00]">Terminal</span>
    <span class="text-indigo-300">structure</span>=&#123;files&#125;
    <span class="text-indigo-300">theme</span>=<span class="text-green-300">"dark"</span>
    <span class="text-indigo-300">style</span>=<span class="text-green-300">"height: 300px"</span>
<span class="text-zinc-500">/&gt;</span></code></pre>
                    </div>
                </div>

                <!-- Features Details -->
                <div class="flex flex-col gap-6">
                    <div class="bento-card w-full bg-[#171717] p-8 rounded-xl border border-white/5 transition-colors duration-500 hover:border-white/20">
                        <h3 class="text-xl text-white font-medium mb-2">Zero Dependencies</h3>
                        <p class="text-[#8C8C8C] text-sm leading-relaxed">
                            Designed to be as lightweight as possible. It relies solely on Svelte's reactivity, avoiding heavy terminal emulators.
                        </p>
                    </div>
                    <div class="bento-card w-full bg-[#171717] p-8 rounded-xl border border-white/5 transition-colors duration-500 hover:border-white/20">
                        <h3 class="text-xl text-white font-medium mb-2">Highly Extensible</h3>
                        <p class="text-[#8C8C8C] text-sm leading-relaxed">
                            Pass custom async functions, create a virtual file system structure, and listen to programmatic events.
                        </p>
                    </div>
                    <div class="bento-card w-full bg-[#171717] p-8 rounded-xl border border-white/5 transition-colors duration-500 hover:border-white/20">
                        <h3 class="text-xl text-white font-medium mb-2">Type-Safe</h3>
                        <p class="text-[#8C8C8C] text-sm leading-relaxed">
                            Written entirely in TypeScript. Get full autocompletion for props and command structures right in your IDE.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- THEMES SECTION -->
    <section class="bg-[#121212] py-24 md:py-32">
        <div class="container mx-auto px-6 md:px-[8vw]">
            <div class="w-full mb-16 text-center md:text-left">
                <h2 class="text-white text-4xl md:text-5xl tracking-tight">
                    <span class="font-medium">Built-in</span>
                    <span class="font-light text-[#BFBFBF]">Themes</span>
                    <span class="text-[#ff3e00] font-medium">.</span>
                </h2>
                <p class="text-[#8C8C8C] mt-4 max-w-xl mx-auto md:mx-0">
                    Svelte Bash ships with four beautifully crafted themes out of the box. You can also pass a custom CSS string to completely override the styling.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Theme 1: Dracula -->
                <div class="bento-card bg-[#171717] rounded-xl border border-white/5 p-6 hover:border-white/20 transition-all">
                    <h3 class="text-white font-medium mb-4 text-lg">Dracula</h3>
                    <div class="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <Terminal theme="dracula" welcomeMessage={["$ echo 'Dracula'"]} style="height: 150px; border:none;" />
                    </div>
                </div>

                <!-- Theme 2: Matrix -->
                <div class="bento-card bg-[#171717] rounded-xl border border-white/5 p-6 hover:border-white/20 transition-all">
                    <h3 class="text-white font-medium mb-4 text-lg">Matrix</h3>
                    <div class="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <Terminal theme="matrix" welcomeMessage={["$ echo 'Matrix'"]} style="height: 150px; border:none;" />
                    </div>
                </div>

                <!-- Theme 3: Dark -->
                <div class="bento-card bg-[#171717] rounded-xl border border-white/5 p-6 hover:border-white/20 transition-all">
                    <h3 class="text-white font-medium mb-4 text-lg">Dark</h3>
                    <div class="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <Terminal theme="dark" welcomeMessage={["$ echo 'Dark'"]} style="height: 150px; border:none;" />
                    </div>
                </div>

                <!-- Theme 4: Light -->
                <div class="bento-card bg-[#171717] rounded-xl border border-white/5 p-6 hover:border-white/20 transition-all">
                    <h3 class="text-white font-medium mb-4 text-lg">Light</h3>
                    <div class="rounded-lg overflow-hidden border border-zinc-200 shadow-lg">
                        <Terminal theme="light" welcomeMessage={["$ echo 'Light'"]} style="height: 150px; border:none;" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- WEB-SCALE FEATURES -->
    <section class="bg-[#121212] border-y border-white/5 py-24 md:py-32">
        <div class="container mx-auto px-6 md:px-[8vw]">
            
            <div class="w-full mb-16 text-center md:text-left">
                <h2 class="text-white text-4xl md:text-5xl tracking-tight">
                    <span class="font-medium">Web-Scale</span>
                    <span class="font-light text-[#BFBFBF]">Features</span>
                    <span class="text-[#ff3e00] font-medium">.</span>
                </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Card 1 -->
                <div class="bento-card project-card w-full bg-[#171717] rounded-xl relative overflow-hidden group border border-white/5 transition-colors duration-500 hover:border-white/20">
                    <div class="w-full p-8 md:p-10 flex flex-col justify-between h-[450px]">
                        <div>
                            <span class="text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] font-bold mb-3 block">Full Experience</span>
                            <h3 class="text-2xl text-white font-medium mb-4">Nano Editor & Redirection</h3>
                            <p class="text-[#8C8C8C] text-sm md:text-base leading-relaxed">
                                Redirect outputs to files using <code>&gt;</code>. Edit them visually using the beautifully embedded nano clone.
                            </p>
                        </div>
                        <div class="rounded-xl overflow-hidden border border-white/5 bg-[#121212] shadow-lg">
                            <Terminal
                                theme="dark"
                                welcomeMessage={[
                                    "$ echo 'Svelte is awesome' > data.txt",
                                    "$ nano data.txt",
                                ]}
                                style="height: 200px; border:none;"
                            />
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="bento-card project-card w-full bg-[#171717] rounded-xl relative overflow-hidden group border border-white/5 transition-colors duration-500 hover:border-white/20">
                    <div class="w-full p-8 md:p-10 flex flex-col justify-between h-[450px]">
                        <div>
                            <span class="text-[10px] uppercase tracking-[0.2em] text-[#8C8C8C] font-bold mb-3 block">Performance</span>
                            <h3 class="text-2xl text-white font-medium mb-4">Bootplay Engine</h3>
                            <p class="text-[#8C8C8C] text-sm md:text-base leading-relaxed">
                                Simulate rapid boot sequences or server startup logs with the ultra-fast bootplay engine.
                            </p>
                        </div>
                        <div class="rounded-xl overflow-hidden border border-white/5 bg-[#121212] shadow-lg">
                            <Terminal
                                theme="dark"
                                bootplay={[
                                    { output: "Mounting virtual file system..." },
                                    { output: "[ OK ] Reached target Local FS." },
                                    { output: "Starting Network Service..." },
                                    { output: "[ OK ] Network activated." },
                                ]}
                                welcomeMessage=""
                                style="height: 200px; border:none;"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-10 flex flex-col items-center justify-center text-[#8C8C8C] text-sm mt-20 gap-2">
        <p>
            Engineered with <span class="text-[#ff3e00]">♥️</span> for
            the Svelte Community by
            <a href="https://github.com/YusufCeng1z" target="_blank" class="text-white hover:text-[#ff3e00] font-medium transition-colors">YusufCeng1z</a>.
        </p>
        <p class="text-xs">
            Visit <a href="https://yusufcengiz.dev" target="_blank" class="text-[#BFBFBF] hover:text-white underline decoration-white/20 underline-offset-4 transition-colors">yusufcengiz.dev</a> for more.
        </p>
    </footer>
</div>

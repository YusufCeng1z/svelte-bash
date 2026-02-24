<script lang="ts">
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

    // --- UI Logic ---
    let copied = false;
    function copyInstall() {
        navigator.clipboard.writeText("npm install svelte-bash");
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<svelte:head>
    <title>Svelte Bash - The Terminal Component for Svelte</title>
    <style>
        .hero-glow {
            position: absolute;
            top: 20%;
            left: 50%;
            width: 800px;
            height: 800px;
            background: radial-gradient(
                circle,
                rgba(99, 102, 241, 0.15) 0%,
                rgba(168, 85, 247, 0.15) 30%,
                rgba(0, 0, 0, 0) 70%
            );
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }
        .grid-bg {
            background-size: 40px 40px;
            background-image: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0.03) 1px,
                    transparent 1px
                ),
                linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.03) 1px,
                    transparent 1px
                );
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
    </style>
</svelte:head>

<div
    class="min-h-screen bg-[#09090b] text-zinc-300 font-sans relative overflow-x-hidden grid-bg"
>
    <div class="hero-glow"></div>

    <!-- NAVBAR -->
    <nav
        class="border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50"
    >
        <div
            class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        >
            <div class="flex items-center gap-3">
                <div
                    class="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-mono font-bold text-xs ring-1 ring-white/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                    >_
                </div>
                <div class="flex flex-col">
                    <span
                        class="font-bold text-sm tracking-tight text-white leading-none"
                        >svelte-bash</span
                    >
                    <span
                        class="text-[10px] text-zinc-500 font-medium tracking-wide"
                        >v1.2.0</span
                    >
                </div>
            </div>
            <div class="flex items-center gap-4">
                <a
                    href="/examples"
                    class="text-zinc-400 hover:text-white transition-colors text-sm font-medium mr-2"
                >
                    Examples
                </a>
                <a
                    href="https://github.com/YusufCeng1z/svelte-bash"
                    target="_blank"
                    class="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                >
                    GitHub
                </a>
                <button
                    on:click={copyInstall}
                    class="group flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-mono font-bold hover:bg-zinc-200 transition-all shadow-lg hover:shadow-white/20"
                >
                    <span>npm i svelte-bash</span>
                    <span
                        class="opacity-50 group-hover:opacity-100 transition-opacity ml-1"
                        >{copied ? "✓" : "⎘"}</span
                    >
                </button>
            </div>
        </div>
    </nav>

    <!-- HERO -->
    <main class="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div
            class="text-center max-w-3xl mx-auto space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000"
        >
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4"
            >
                <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
                ></span>
                v1.2.0 Released: Nano Editor & Redirection Included!
            </div>
            <h1
                class="text-5xl lg:text-7xl font-extrabold tracking-tight text-white"
            >
                The embedded terminal <br />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                    >for Svelte.</span
                >
            </h1>
            <p class="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                A fully typed, highly customizable, zero-dependency terminal
                component. Build interactive CLI tutorials, devtools, or
                developer portfolios with incredible aesthetics.
            </p>
            <div
                class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
                <a
                    href="https://github.com/YusufCeng1z/svelte-bash"
                    target="_blank"
                    class="group relative flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:bg-white transition-all hover:-translate-y-1 w-full sm:w-auto"
                >
                    <svg
                        class="w-5 h-5 text-zinc-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.39-3.366-1.39-.455-1.178-1.11-1.492-1.11-1.492-.908-.632.069-.619.069-.619 1.003.073 1.531 1.048 1.531 1.048.892 1.56 2.341 1.109 2.91.848.092-.66.35-1.11.636-1.365-2.22-.258-4.555-1.134-4.555-5.046 0-1.116.39-2.029 1.029-2.744-.103-.26-.446-1.298.098-2.705 0 0 .84-.274 2.75 1.05a9.548 9.548 0 0 1 5.008 0c1.908-1.334 2.746-1.05 2.746-1.05.546 1.407.202 2.445.1 2.705.64.715 1.028 1.628 1.028 2.744 0 3.922-2.339 4.782-4.566 5.035.359.316.678.94.678 1.895 0 1.368-.012 2.47-.012 2.805 0 .273.18.595.688.494a10.045 10.045 0 0 0 5.401-4.418 10.478 10.478 0 0 0 1.316-6.955 10.32 10.32 0 0 0-3.393-6.17A9.847 9.847 0 0 0 12.006 2Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Star on GitHub
                </a>
                <a
                    href="/examples"
                    class="group flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-zinc-300 rounded-full font-medium ring-1 ring-white/10 hover:bg-zinc-800 hover:text-white transition-all hover:-translate-y-1 w-full sm:w-auto"
                >
                    View Examples
                    <span
                        class="text-zinc-500 group-hover:translate-x-1 transition-transform"
                        >→</span
                    >
                </a>
            </div>
        </div>

        <!-- HERO TERMINAL -->
        <div
            class="glass-panel rounded-2xl overflow-hidden max-w-4xl mx-auto ring-1 ring-white/10 shadow-2xl relative transition-transform hover:-translate-y-2 duration-500"
        >
            <div
                class="absolute top-0 left-0 w-full h-10 bg-zinc-900/90 border-b border-white/5 flex items-center px-4 gap-2 z-20"
            >
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <div
                    class="ml-4 flex-1 text-center text-xs font-mono text-zinc-500 tracking-wide pr-14 select-none"
                >
                    guest@svelte-bash:~
                </div>
            </div>
            <div class="pt-10 bg-[#0d0d12]">
                <Terminal
                    theme="matrix"
                    structure={myFiles}
                    commands={myCommands}
                    ghostCompletion={true}
                    typewriter={15}
                    welcomeMessage={[
                        "Welcome to svelte-bash v1.2.0!",
                        "Type 'help' to see available commands.",
                        "Try: 'nano readme.md' or 'echo Hello > file.txt'",
                    ]}
                    style="height: 450px; width: 100%; border:none; border-radius: 0 0 1rem 1rem;"
                />
            </div>
        </div>

        <!-- QUICK START -->
        <div class="mt-32 max-w-4xl mx-auto space-y-16">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-white mb-4">
                    Get Started in Seconds
                </h2>
                <p class="text-zinc-400">
                    Zero dependencies. Fully typed. Instant integration.
                </p>
            </div>

            <div class="space-y-12">
                <!-- Installation -->
                <div
                    class="glass-panel p-8 rounded-3xl relative overflow-hidden group"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <div
                        class="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between"
                    >
                        <div class="flex-1">
                            <h3
                                class="text-xl font-bold text-white mb-2 flex items-center gap-3"
                            >
                                <span
                                    class="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm"
                                    >1</span
                                >
                                Installation
                            </h3>
                            <p class="text-zinc-400 text-sm">
                                Install the package via npm. It has zero
                                external dependencies other than Svelte itself.
                            </p>
                        </div>
                        <div
                            class="w-full md:w-auto bg-black rounded-xl p-4 ring-1 ring-white/10 flex items-center gap-4"
                        >
                            <code class="text-green-400 font-mono text-sm"
                                >npm install svelte-bash</code
                            >
                            <button
                                class="text-zinc-500 hover:text-white transition-colors"
                                title="Copy to clipboard"
                                aria-label="Copy to clipboard"
                                on:click={() =>
                                    navigator.clipboard.writeText(
                                        "npm install svelte-bash",
                                    )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    ><path
                                        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                                    /><path
                                        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                                    /></svg
                                >
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Basic Usage -->
                <div
                    class="glass-panel p-8 rounded-3xl relative overflow-hidden group"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <div class="relative z-10">
                        <h3
                            class="text-xl font-bold text-white mb-2 flex items-center gap-3"
                        >
                            <span
                                class="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm"
                                >2</span
                            >
                            Basic Usage
                        </h3>
                        <p class="text-zinc-400 text-sm mb-6">
                            Import the component and pass a structure object to
                            define your virtual file system.
                        </p>

                        <div
                            class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-[#111116] text-sm overflow-x-auto p-5 font-mono text-zinc-300 shadow-inner"
                        >
                            <pre><code
                                    ><span class="text-zinc-500"
                                        >&lt;script&gt;</span
                                    >
  <span class="text-pink-400">import</span> &#123; Terminal &#125; <span
                                        class="text-pink-400">from</span
                                    > <span class="text-green-300"
                                        >'svelte-bash'</span
                                    >;

  <span class="text-pink-400">const</span> files = &#123;
    <span class="text-green-300">'readme.md'</span>: <span
                                        class="text-yellow-300"
                                        >'# Hello World'</span
                                    >,
    <span class="text-green-300">'src'</span>: &#123;
       <span class="text-green-300">'app.js'</span>: <span
                                        class="text-yellow-300"
                                        >'console.log("Hi")'</span
                                    >
    &#125;
  &#125;;
<span class="text-zinc-500">&lt;/script&gt;</span>

<span class="text-zinc-500">&lt;</span><span class="text-indigo-400"
                                        >Terminal</span
                                    >
    <span class="text-sky-300">structure</span>=&#123;files&#125;
    <span class="text-sky-300">user</span>=<span class="text-green-300"
                                        >"alice"</span
                                    >
    <span class="text-sky-300">style</span>=<span class="text-green-300"
                                        >"height: 300px"</span
                                    >
<span class="text-zinc-500">/&gt;</span></code
                                ></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BENTO BOX FEATURES -->
        <div class="mt-40 space-y-16">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-white mb-4">
                    Powerful Web-Scale Features
                </h2>
                <p class="text-zinc-400">
                    Everything you need to deliver a breathtaking CLI experience
                    in the browser.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- BENTO 1: Nano -->
                <div
                    class="glass-panel p-8 rounded-3xl lg:col-span-2 relative overflow-hidden group"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <div
                        class="relative z-10 w-full flex flex-col h-full justify-between gap-6"
                    >
                        <div>
                            <h3 class="text-2xl font-bold text-white mb-3">
                                Nano Editor & Redirection
                            </h3>
                            <p
                                class="text-zinc-400 text-sm leading-relaxed max-w-md"
                            >
                                It's not just a read-only prop. Redirect outputs
                                to files using <code>></code>. Edit them
                                visually using the beautifully embedded
                                <code>nano</code> clone.
                            </p>
                        </div>
                        <div
                            class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-black shadow-lg"
                        >
                            <Terminal
                                theme="dark"
                                welcomeMessage={[
                                    "$ echo 'Svelte is awesome' > data.txt",
                                    "$ nano data.txt",
                                ]}
                                style="height: 250px; border:none;"
                            />
                        </div>
                    </div>
                </div>

                <!-- BENTO 2: Bootplay -->
                <div
                    class="glass-panel p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <div class="relative z-10 mb-6">
                        <h3 class="text-xl font-bold text-white mb-3">
                            Bootplay Engine
                        </h3>
                        <p class="text-zinc-400 text-sm leading-relaxed">
                            Simulate rapid boot sequences or server startup logs
                            with the ultra-fast <code>bootplay</code> engine.
                        </p>
                    </div>
                    <div
                        class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-[#282a36] shadow-lg relative z-10"
                    >
                        <Terminal
                            theme="dracula"
                            bootplay={[
                                { output: "Mounting virtual file system..." },
                                { output: "[ OK ] Reached target Local FS." },
                                { output: "Starting Network Service..." },
                                { output: "[ OK ] Network activated." },
                                { output: "Running svelte-check..." },
                                { output: "Started SvelteKit server on :5173" },
                            ]}
                            welcomeMessage=""
                            style="height: 250px; border:none;"
                        />
                    </div>
                </div>

                <!-- BENTO 3: Persistence -->
                <div
                    class="glass-panel p-8 rounded-3xl relative overflow-hidden group"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <div class="relative z-10">
                        <h3 class="text-xl font-bold text-white mb-3">
                            Zero-Config Persistence
                        </h3>
                        <p class="text-zinc-400 text-sm mb-8 leading-relaxed">
                            Pass a single string to the <code>persist</code>
                            prop and your filesystem state mathematically synchronizes
                            with <code>localStorage</code> securely.
                        </p>
                        <div
                            class="rounded-xl bg-zinc-950/80 border border-white/5 p-5 font-mono text-sm text-pink-400 shadow-inner"
                        >
                            <span class="text-zinc-500">&lt;</span><span
                                class="text-indigo-400">Terminal</span
                            > <br />
                            &nbsp;&nbsp;<span class="text-sky-300">persist</span
                            ><span class="text-white">=</span><span
                                class="text-green-300">"my-app-fs"</span
                            > <br />
                            <span class="text-zinc-500">/&gt;</span>
                        </div>
                    </div>
                </div>

                <!-- BENTO 4: Commands -->
                <div
                    class="glass-panel p-8 rounded-3xl lg:col-span-2 relative overflow-hidden group flex flex-col"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-tl from-sky-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <div class="relative z-10 mb-6 flex-1">
                        <h3 class="text-2xl font-bold text-white mb-3">
                            Programmatic Commands & Aliases
                        </h3>
                        <p class="text-zinc-400 text-sm leading-relaxed">
                            Extend the terminal dynamically. Inject async
                            callbacks. Map complex commands to short snippets
                            using aliases.
                        </p>
                    </div>
                    <div
                        class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-[#1e1e1e] shadow-lg relative z-10"
                    >
                        <Terminal
                            theme="dark"
                            welcomeMessage={[
                                "$ alias deploy='npm run build && firebase deploy'",
                                "$ deploy",
                            ]}
                            autoplay={[
                                {
                                    command:
                                        "alias deploy='npm run build && firebase deploy'",
                                },
                                {
                                    command: "deploy",
                                    output: "Building project...\n[success] Deployed to production.",
                                },
                            ]}
                            style="height: 200px; border:none;"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- API Reference -->
        <div class="mt-40 pt-16 border-t border-white/10">
            <h2 class="text-3xl font-bold text-white mb-8 text-center">
                Engineered for Developers
            </h2>
            <div class="glass-panel rounded-3xl overflow-x-auto shadow-2xl">
                <table class="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr
                            class="border-b border-white/10 bg-white/5 backdrop-blur-md"
                        >
                            <th class="py-5 px-8 font-semibold text-white"
                                >Property</th
                            >
                            <th class="py-5 px-8 font-semibold text-white"
                                >TypeScript Type</th
                            >
                            <th class="py-5 px-8 font-semibold text-white"
                                >Default Value</th
                            >
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-white/5 text-zinc-300 bg-black/20"
                    >
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-5 px-8 font-mono text-purple-400"
                                >structure</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-indigo-300"
                                >FileStructure</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-zinc-500"
                                >{"{"}{"}"}</td
                            >
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-5 px-8 font-mono text-purple-400"
                                >commands</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-indigo-300"
                                >Record&lt;string, CommandHandler&gt;</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-zinc-500"
                                >{"{"}{"}"}</td
                            >
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-5 px-8 font-mono text-purple-400"
                                >theme</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-indigo-300"
                                >'dark' | 'light' | 'matrix' | 'dracula' | Theme</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-zinc-500"
                                >'dark'</td
                            >
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-5 px-8 font-mono text-purple-400"
                                >persist</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-indigo-300"
                                >string</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-zinc-500"
                                >undefined</td
                            >
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-5 px-8 font-mono text-purple-400"
                                >bootplay</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-indigo-300"
                                >string[]</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-zinc-500"
                                >undefined</td
                            >
                        </tr>
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-5 px-8 font-mono text-purple-400"
                                >autoplay</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-indigo-300"
                                >AutoplayItem[]</td
                            >
                            <td
                                class="py-5 px-8 font-mono text-xs text-zinc-500"
                                >undefined</td
                            >
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- FOOTER -->
        <footer
            class="mt-40 pt-10 border-t border-white/10 text-center text-zinc-500 text-sm pb-10"
        >
            Engineered with <span class="text-purple-500 pulse">♥️</span> for
            the Svelte Community by
            <a
                href="https://github.com/YusufCeng1z"
                target="_blank"
                class="text-zinc-300 hover:text-white font-medium transition-colors"
                >YusufCeng1z</a
            >.
        </footer>
    </main>
</div>

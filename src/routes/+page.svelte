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
        socials: async () => "GitHub: github.com/username\nTwitter: @username",
    };

    const codeExample = `<div class="h-[400px]">
  <Terminal 
     structure={myFiles}
     commands={myCommands}
     welcomeMessage="Welcome!"
     user="developer"
  />
</div>`;

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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    />
    <style>
        :root {
            font-family: "Inter", sans-serif;
        }
        .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.05) 1px,
                    transparent 1px
                ),
                linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.05) 1px,
                    transparent 1px
                );
        }
        .perspective-container {
            perspective: 2000px;
        }
        .hero-terminal {
            transition: transform 0.5s ease-out;
            box-shadow:
                0 0 0 1px rgba(0, 0, 0, 0.05),
                0 20px 50px -10px rgba(0, 0, 0, 0.3);
        }
        .hero-terminal:hover {
            transform: translateY(-5px);
            box-shadow:
                0 0 0 1px rgba(0, 0, 0, 0.05),
                0 30px 60px -12px rgba(0, 0, 0, 0.4);
        }
    </style>
</svelte:head>

<div
    class="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 bg-grid-pattern"
>
    <!-- NAVBAR -->
    <nav
        class="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50"
    >
        <div
            class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        >
            <div class="flex items-center gap-2">
                <div
                    class="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white font-mono font-bold text-xs shadow-lg shadow-blue-900/10"
                >
                    >_
                </div>
                <div class="flex flex-col">
                    <span
                        class="font-bold text-sm tracking-tight text-slate-950 leading-none"
                        >svelte-bash</span
                    >
                    <span
                        class="text-[10px] text-slate-500 font-medium tracking-wide"
                        >v1.0.0</span
                    >
                </div>
            </div>
            <div class="flex items-center gap-4">
                <a
                    href="https://github.com/YusufCeng1z/svelte-bash"
                    target="_blank"
                    class="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50"
                >
                    <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        ><path
                            fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clip-rule="evenodd"
                        ></path></svg
                    >
                    <span>Star on GitHub</span>
                </a>

                <button
                    on:click={copyInstall}
                    class="group flex items-center gap-2 bg-slate-950 text-white rounded-lg px-4 py-2 text-xs font-mono font-medium hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10"
                >
                    <span class="text-slate-400">$</span>
                    <span>npm i svelte-bash</span>
                    <span
                        class="opacity-50 group-hover:opacity-100 transition-opacity ml-1"
                    >
                        {copied ? "✓" : "⎘"}
                    </span>
                </button>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center perspective-container"
        >
            <!-- LEFT: Hero Content -->
            <div
                class="space-y-10 animate-in slide-in-from-bottom-5 fade-in duration-700"
            >
                <div class="space-y-8">
                    <a
                        href="https://github.com/YusufCeng1z/svelte-bash/releases"
                        target="_blank"
                        class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer group"
                    >
                        <span class="flex h-2 w-2 relative">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
                            ></span>
                        </span>
                        <span class="tracking-wide">v1.0.0 released</span>
                        <svg
                            class="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            /></svg
                        >
                    </a>

                    <h1
                        class="text-6xl sm:text-7xl font-[800] tracking-tight text-slate-950 leading-[1.05]"
                    >
                        The Terminal <br />
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-700 to-slate-500"
                            >for Svelte.</span
                        >
                    </h1>

                    <p
                        class="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-md font-medium"
                    >
                        A beautifully typed, file-system ready terminal
                        component. Give your app a CLI power-user interface in
                        minutes.
                    </p>

                    <div class="flex flex-wrap items-center gap-4 pt-2">
                        <button
                            on:click={() => copyInstall()}
                            class="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:opacity-50 disabled:pointer-events-none ring-offset-2 bg-slate-950 text-white hover:bg-slate-800 h-12 px-8 shadow-xl shadow-slate-950/10 hover:shadow-2xl hover:-translate-y-0.5"
                        >
                            Get Started
                        </button>
                        <a
                            href="https://github.com/YusufCeng1z/svelte-bash"
                            target="_blank"
                            class="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:opacity-50 disabled:pointer-events-none ring-offset-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 h-12 px-8 shadow-sm"
                        >
                            <svg
                                class="mr-2 w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"
                                ></path></svg
                            >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <!-- RIGHT: 3D Terminal Visual -->
            <div class="relative lg:-mr-16 hero-terminal">
                <!-- Decorative Glows -->
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
                ></div>

                <!-- Terminal Window -->
                <div
                    class="relative rounded-xl overflow-hidden bg-[#1e1e2e] ring-1 ring-white/10 shadow-2xl h-[550px] flex flex-col"
                >
                    <!-- Title Bar -->
                    <div
                        class="h-10 bg-[#181825] border-b border-[#313244] flex items-center px-4 gap-2 shrink-0"
                    >
                        <div class="flex gap-2">
                            <div
                                class="w-3 h-3 rounded-full bg-[#f38ba8]"
                            ></div>
                            <div
                                class="w-3 h-3 rounded-full bg-[#f9e2af]"
                            ></div>
                            <div
                                class="w-3 h-3 rounded-full bg-[#a6e3a1]"
                            ></div>
                        </div>
                        <div
                            class="ml-4 flex items-center gap-2 px-3 py-1 bg-[#1e1e2e] rounded-t-md text-[10px] text-slate-400 font-mono mt-2"
                        >
                            <span>user@svelte-bash</span>
                            <span class="text-slate-600">x</span>
                        </div>
                    </div>
                    <!-- Terminal Component -->
                    <div class="flex-1 overflow-hidden relative">
                        <!-- Overlay gradient for content fade at bottom -->
                        <div
                            class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1e1e2e] to-transparent pointer-events-none z-10"
                        ></div>

                        <Terminal
                            structure={myFiles}
                            commands={myCommands}
                            welcomeMessage={[
                                "Welcome to Svelte Bash v1.0.0",
                                "---------------------------------",
                                "This is currently running in an interactive demo container.",
                                "Type 'help' to see available commands.",
                            ]}
                            user="guest"
                            class="h-full pb-8"
                        />
                    </div>
                </div>

                <!-- Reflection/Grounding Shadow -->
                <div
                    class="absolute -bottom-[40px] left-[10%] right-[10%] h-[30px] bg-black/40 blur-[40px] rounded-full pointer-events-none"
                ></div>
            </div>
        </div>
    </main>

    <!-- DOCUMENTATION & EXAMPLES -->
    <section
        id="docs"
        class="border-t border-slate-200 bg-slate-50 py-24 scroll-mt-20"
    >
        <div class="max-w-5xl mx-auto px-6 space-y-24">
            <!-- 1. Installation -->
            <div class="space-y-6">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg"
                    >
                        1
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900">
                        Installation
                    </h2>
                </div>
                <p class="text-lg text-slate-600 max-w-2xl">
                    Get started by installing the package via npm. It has zero
                    dependencies other than Svelte itself.
                </p>
                <div
                    class="rounded-lg bg-[#09090b] border border-slate-800 shadow-xl overflow-hidden p-6 max-w-2xl"
                >
                    <div
                        class="flex justify-between items-center text-slate-400 font-mono text-sm"
                    >
                        <span>npm install svelte-bash</span>
                        <button
                            class="hover:text-white transition-colors"
                            on:click={copyInstall}
                        >
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 2. Basic Usage -->
            <div class="space-y-6">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-lg"
                    >
                        2
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900">
                        Basic Usage
                    </h2>
                </div>
                <p class="text-lg text-slate-600 max-w-2xl">
                    Import the component and pass a <code>structure</code> object
                    to define your file system.
                </p>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <!-- Code -->
                    <div
                        class="rounded-lg bg-[#09090b] border border-slate-800 shadow-xl overflow-hidden p-6 text-sm"
                    >
                        <pre
                            class="font-mono text-blue-100 leading-relaxed overflow-x-auto"><code
                                >&lt;script&gt;
  import {`{`} Terminal {`}`} from 'svelte-bash';

  const <span class="text-yellow-400">files</span> = {`{`}
    'readme.md': '# Hello World',
    'src': {`{`}
       'app.js': 'console.log("Hi")'
    {`}`}
  {`}`};
&lt;/script&gt;

&lt;Terminal 
    structure={`{`}<span class="text-yellow-400">files</span>{`}`} 
    user="alice" 
/&gt;</code
                            ></pre>
                    </div>
                    <!-- Preview -->
                    <div
                        class="rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-900/10"
                    >
                        <Terminal
                            structure={{
                                "readme.md": "# Hello World",
                                src: { "app.js": 'console.log("Hi")' },
                            }}
                            welcomeMessage="Default setup. Type 'ls' or 'cat readme.md'"
                            user="alice"
                            class="h-[300px]"
                        />
                    </div>
                </div>
            </div>

            <!-- 3. Advanced Features (Tabs) -->
            <div class="space-y-8">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg"
                    >
                        3
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900">
                        Advanced Features
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-16">
                    <!-- Feature A: custom commands -->
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                        <div class="space-y-4 order-2 lg:order-1">
                            <h3 class="text-xl font-bold text-slate-900">
                                Custom Commands
                            </h3>
                            <p class="text-slate-600">
                                Pass a <code>commands</code> object to handle custom
                                logic. You can return a string, an array of lines,
                                or even other Svelte components.
                            </p>
                            <div
                                class="rounded-lg bg-[#09090b] border border-slate-800 shadow-lg p-5 text-xs"
                            >
                                <pre
                                    class="font-mono text-blue-100 overflow-x-auto"><code
                                        >const <span class="text-green-400"
                                            >cmds</span
                                        > = {`{`}
  <span class="text-purple-400">greet</span
                                        >: (args) =&gt; `Hello ${`{`}args[0]{`}`}`,
  <span class="text-purple-400">async</span>: async () =&gt; {`{`}
     await fetch('/api');
     return 'Done!';
  {`}`}
{`}`};

&lt;Terminal commands={`{`}<span class="text-green-400">cmds</span
                                        >{`}`} /&gt;</code
                                    ></pre>
                            </div>
                        </div>
                        <div
                            class="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-900/10"
                        >
                            <Terminal
                                commands={{
                                    greet: (args) =>
                                        `Hello ${args[0] || "Friend"}!`,
                                    time: () => new Date().toLocaleTimeString(),
                                }}
                                welcomeMessage="Type 'greet [name]' or 'time'"
                                class="h-[250px]"
                            />
                        </div>
                    </div>

                    <!-- Feature B: Autoplay -->
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                        <div
                            class="order-1 rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-900/10"
                        >
                            <Terminal
                                theme="dracula"
                                autoplay={[
                                    { command: "git status" },
                                    {
                                        command: "git commit -m 'wip'",
                                        output: "[main 2d3f4a] wip",
                                    },
                                ]}
                                class="h-[250px]"
                            />
                        </div>
                        <div class="space-y-4 order-2">
                            <h3 class="text-xl font-bold text-slate-900">
                                Autoplay / Show Mode
                            </h3>
                            <p class="text-slate-600">
                                Great for tutorials. The terminal will type for
                                you.
                            </p>
                            <div
                                class="rounded-lg bg-[#09090b] border border-slate-800 shadow-lg p-5 text-xs"
                            >
                                <pre
                                    class="font-mono text-blue-100 overflow-x-auto"><code
                                        >&lt;Terminal 
  <span class="text-purple-400">autoplay</span>={`{[`}
    {`{`} command: 'git status' {`}`},
    {`{`} 
      command: 'git commit -m "wip"', 
      output: '...' 
    {`}`}
  {`]}`}
/&gt;</code
                                    ></pre>
                            </div>
                        </div>
                    </div>

                    <!-- Feature C: Theming -->
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                        <div class="space-y-4 order-2 lg:order-1">
                            <h3 class="text-xl font-bold text-slate-900">
                                Deep Theming
                            </h3>
                            <p class="text-slate-600">
                                Override standard colors with the <code
                                    >theme</code
                                > prop.
                            </p>
                            <div
                                class="rounded-lg bg-[#09090b] border border-slate-800 shadow-lg p-5 text-xs"
                            >
                                <pre
                                    class="font-mono text-blue-100 overflow-x-auto"><code
                                        >&lt;Terminal 
  <span class="text-purple-400">theme</span>={`{{`}
    background: '#282a36',
    prompt: '#ff79c6',
    cursor: '#f8f8f2'
  {`}}`}
/&gt;</code
                                    ></pre>
                            </div>
                        </div>
                        <div
                            class="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-900/10"
                        >
                            <Terminal
                                theme={{
                                    background: "#282a36",
                                    prompt: "#ff79c6",
                                    cursor: "#f8f8f2",
                                    foreground: "#f8f8f2",
                                }}
                                welcomeMessage="Custom Dracula Variant"
                                class="h-[250px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. API Reference -->
            <div class="space-y-6 pt-12 border-t border-slate-200">
                <h2 class="text-3xl font-bold text-slate-900">API Reference</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr class="border-b border-slate-200">
                                <th class="py-4 font-semibold text-slate-900"
                                    >Prop</th
                                >
                                <th class="py-4 font-semibold text-slate-900"
                                    >Type</th
                                >
                                <th class="py-4 font-semibold text-slate-900"
                                    >Default</th
                                >
                                <th class="py-4 font-semibold text-slate-900"
                                    >Description</th
                                >
                            </tr>
                        </thead>
                        <tbody class="text-slate-600">
                            <tr class="border-b border-slate-100">
                                <td class="py-4 font-mono text-purple-600"
                                    >structure</td
                                >
                                <td class="py-4 font-mono text-xs"
                                    >FileStructure</td
                                >
                                <td class="py-4 font-mono text-xs"
                                    ><code>{`{}`}</code></td
                                >
                                <td class="py-4"
                                    >Virtual file system object key-value pairs.</td
                                >
                            </tr>
                            <tr class="border-b border-slate-100">
                                <td class="py-4 font-mono text-purple-600"
                                    >commands</td
                                >
                                <td class="py-4 font-mono text-xs"
                                    >Record&lt;string, Handler&gt;</td
                                >
                                <td class="py-4 font-mono text-xs"
                                    ><code>{`{}`}</code></td
                                >
                                <td class="py-4">Custom command handlers.</td>
                            </tr>
                            <tr class="border-b border-slate-100">
                                <td class="py-4 font-mono text-purple-600"
                                    >theme</td
                                >
                                <td class="py-4 font-mono text-xs"
                                    >string | Theme</td
                                >
                                <td class="py-4 font-mono text-xs">'dark'</td>
                                <td class="py-4"
                                    >Preset name ('dark', 'light', 'dracula') or
                                    object.</td
                                >
                            </tr>
                            <tr class="border-b border-slate-100">
                                <td class="py-4 font-mono text-purple-600"
                                    >autoplay</td
                                >
                                <td class="py-4 font-mono text-xs"
                                    >AutoplayItem[]</td
                                >
                                <td class="py-4 font-mono text-xs">undefined</td
                                >
                                <td class="py-4"
                                    >Array of commands to type automatically.</td
                                >
                            </tr>
                            <tr>
                                <td class="py-4 font-mono text-purple-600"
                                    >user</td
                                >
                                <td class="py-4 font-mono text-xs">string</td>
                                <td class="py-4 font-mono text-xs">'user'</td>
                                <td class="py-4">Username shown in prompt.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-slate-200 bg-slate-50 py-12">
        <div
            class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
            <div class="flex items-center gap-2">
                <div
                    class="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-white font-mono font-bold text-[10px]"
                >
                    >_
                </div>
                <span class="font-bold text-sm text-slate-900">svelte-bash</span
                >
            </div>
            <div class="flex items-center gap-6 text-sm text-slate-500">
                <a
                    href="https://github.com/YusufCeng1z/svelte-bash"
                    target="_blank"
                    class="hover:text-slate-900 transition-colors">GitHub</a
                >
                <a
                    href="https://www.npmjs.com/package/svelte-bash"
                    target="_blank"
                    class="hover:text-slate-900 transition-colors">NPM</a
                >
                <span>MIT License</span>
            </div>
        </div>
    </footer>
</div>

<script lang="ts">
	import { Terminal } from "$lib";
	import { onMount } from "svelte";

	onMount(async () => {
		const { default: gsap } = await import("gsap");
		const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger.js");

		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			".hero-animate",
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				stagger: 0.15,
				ease: "expo.out",
				delay: 0.1,
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
	});
</script>

<svelte:head>
	<title>Examples - Svelte Bash</title>
</svelte:head>

<div class="min-h-screen text-zinc-300 font-sans relative pt-24">
	<main class="relative z-10 max-w-7xl mx-auto px-6 py-16 pb-32">
		<div class="text-center md:text-left mb-24 max-w-3xl">
			<h1
				class="hero-animate text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tight"
			>
				Terminal
				<span class="font-light text-[#BFBFBF]">Gallery</span><span class="text-[#ff3e00] font-black">.</span>
			</h1>
			<p class="hero-animate text-[#8C8C8C] leading-relaxed">
				Explore different configurations, themes, and use cases for the
				Svelte Bash component. The code snippets are ready to be
				copy-pasted into your project.
			</p>
		</div>

		<div class="space-y-12">
			
			<!-- Example 1 -->
			<div class="bento-card bg-[#171717] rounded-2xl border border-white/5 p-6 md:p-10 transition-colors hover:border-white/20">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					<!-- Terminal (Left) -->
					<div class="lg:col-span-6 order-2 lg:order-1 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black">
						<Terminal
							theme="matrix"
							user="neo"
							promptStr="neo@matrix:~$ "
							typewriter={true}
							welcomeMessage={[
								"Wake up, Neo...",
								"The Matrix has you...",
								"Follow the white rabbit.",
								"",
								"Knock, knock, Neo.",
							]}
							style="height: 350px; border:none;"
						/>
					</div>
					<!-- Code (Right) -->
					<div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
						<div>
							<h2 class="text-2xl font-medium text-white mb-2">
								1. The Hacker (Matrix)
							</h2>
							<p class="text-[#8C8C8C] text-sm leading-relaxed">
								Perfect for CTF platforms or cybersecurity portfolios. Notice the <code class="text-[#ff3e00]">typewriter</code> effect typing the welcome message out character-by-character!
							</p>
						</div>
						<div class="p-5 bg-[#121212] rounded-xl border border-white/5 overflow-x-auto text-xs font-mono text-zinc-400">
							<pre><code>&lt;<span class="text-[#ff3e00]">Terminal</span>
  <span class="text-indigo-300">theme</span>=<span class="text-green-300">"matrix"</span>
  <span class="text-indigo-300">user</span>=<span class="text-green-300">"neo"</span>
  <span class="text-indigo-300">promptStr</span>=<span class="text-green-300">"neo@matrix:~$ "</span>
  <span class="text-indigo-300">typewriter</span>=&#123;true&#125;
  <span class="text-indigo-300">welcomeMessage</span>=&#123;[
    <span class="text-yellow-300">"Wake up, Neo..."</span>,
    <span class="text-yellow-300">"The Matrix has you..."</span>
  ]&#125;
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</div>

			<!-- Example 2 -->
			<div class="bento-card bg-[#171717] rounded-2xl border border-white/5 p-6 md:p-10 transition-colors hover:border-white/20">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					<!-- Terminal (Left) -->
					<div class="lg:col-span-6 order-2 lg:order-1 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#282a36]">
						<Terminal
							theme="dracula"
							user="dev"
							welcomeMessage={[
								"dracula-theme loaded successfully.",
								"Autoplay activating...",
							]}
							autoplay={[
								{ command: "echo 'Dracula is elegant'" },
								{ command: "ls -la" },
							]}
							style="height: 350px; border:none;"
						/>
					</div>
					<!-- Code (Right) -->
					<div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
						<div>
							<h2 class="text-2xl font-medium text-white mb-2">
								2. The Dracula Dev
							</h2>
							<p class="text-[#8C8C8C] text-sm leading-relaxed">
								A highly legible, high-contrast theme popular among dark-mode lovers. Notice the <code class="text-[#ff3e00]">autoplay</code> writing commands autonomously.
							</p>
						</div>
						<div class="p-5 bg-[#121212] rounded-xl border border-white/5 overflow-x-auto text-xs font-mono text-zinc-400">
							<pre><code>&lt;<span class="text-[#ff3e00]">Terminal</span>
  <span class="text-indigo-300">theme</span>=<span class="text-green-300">"dracula"</span>
  <span class="text-indigo-300">user</span>=<span class="text-green-300">"dev"</span>
  <span class="text-indigo-300">welcomeMessage</span>=&#123;[<span class="text-yellow-300">"dracula-theme loaded..."</span>]&#125;
  <span class="text-indigo-300">autoplay</span>=&#123;[
    &#123; command: <span class="text-yellow-300">"echo 'Dracula is elegant'"</span> &#125;,
    &#123; command: <span class="text-yellow-300">"ls -la"</span> &#125;
  ]&#125;
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</div>

			<!-- Example 3 -->
			<div class="bento-card bg-[#171717] rounded-2xl border border-white/5 p-6 md:p-10 transition-colors hover:border-white/20">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					<!-- Terminal (Left) -->
					<div class="lg:col-span-6 order-2 lg:order-1 rounded-xl overflow-hidden border border-zinc-200 shadow-xl bg-white">
						<Terminal
							theme="light"
							user="root"
							bootplay={[
								{ output: "[OK] Initiating startup sequence..." },
								{ output: "[OK] Loading kernel modules..." },
								{ output: "[WARN] /dev/sda1 requires fsck" },
								{ output: "[OK] Mounting filesystems..." },
								{ output: "[OK] Starting NetworkManager..." },
								{ output: "[OK] Reached target Graphical Interface." },
							]}
							autoplay={[
								{
									command: "systemctl status network",
									output: "Network is Active and running.",
								},
								{ command: "whoami", output: "root" },
							]}
							bootSpeed={150}
							style="height: 350px; border:none;"
						/>
					</div>
					<!-- Code (Right) -->
					<div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
						<div>
							<h2 class="text-2xl font-medium text-white mb-2">
								3. Boot Logger (Light)
							</h2>
							<p class="text-[#8C8C8C] text-sm leading-relaxed">
								A beautifully clean <code class="text-white">light</code> theme combining both <code class="text-[#ff3e00]">bootplay</code> (for fast pre-computation logs) and <code class="text-[#ff3e00]">autoplay</code>.
							</p>
						</div>
						<div class="p-5 bg-[#121212] rounded-xl border border-white/5 overflow-x-auto text-xs font-mono text-zinc-400">
							<pre><code>&lt;<span class="text-[#ff3e00]">Terminal</span>
  <span class="text-indigo-300">theme</span>=<span class="text-green-300">"light"</span>
  <span class="text-indigo-300">bootSpeed</span>={150}
  <span class="text-indigo-300">bootplay</span>=&#123;[
    &#123; output: <span class="text-yellow-300">"[OK] Loading kernel..."</span> &#125;,
    &#123; output: <span class="text-yellow-300">"[OK] Reached target..."</span> &#125;
  ]&#125;
  <span class="text-indigo-300">autoplay</span>=&#123;[
    &#123; command: <span class="text-yellow-300">"whoami"</span>, output: <span class="text-yellow-300">"root"</span> &#125;
  ]&#125;
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</div>

			<!-- Example 4 -->
			<div class="bento-card bg-[#171717] rounded-2xl border border-white/5 p-6 md:p-10 transition-colors hover:border-white/20">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					<!-- Terminal (Left) -->
					<div class="lg:col-span-6 order-2 lg:order-1 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black">
						<Terminal
							theme="dark"
							user="ninja"
							welcomeMessage={[
								"Advanced Output Redirection",
								"---------------------------",
								"Type: echo 'Svelte Bash is Cool' > output.txt",
								"Then check it: cat output.txt",
							]}
							style="height: 350px; border:none;"
						/>
					</div>
					<!-- Code (Right) -->
					<div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
						<div>
							<h2 class="text-2xl font-medium text-white mb-2">
								4. Output Redirection
							</h2>
							<p class="text-[#8C8C8C] text-sm leading-relaxed">
								Built-in piping behavior. The terminal engine correctly intercepts <code>&gt;</code> and <code>&gt;&gt;</code> to mutate the virtual filesystem.
							</p>
						</div>
						<div class="p-5 bg-[#121212] rounded-xl border border-white/5 overflow-x-auto text-xs font-mono text-zinc-400">
							<pre><code>&lt;<span class="text-[#ff3e00]">Terminal</span>
  <span class="text-indigo-300">theme</span>=<span class="text-green-300">"dark"</span>
  <span class="text-indigo-300">welcomeMessage</span>=&#123;[
    <span class="text-yellow-300">"Type: echo 'hello' &gt; msg.txt"</span>
  ]&#125;
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</div>

			<!-- Example 5 -->
			<div class="bento-card bg-[#171717] rounded-2xl border border-white/5 p-6 md:p-10 transition-colors hover:border-white/20">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					<!-- Terminal (Left) -->
					<div class="lg:col-span-6 order-2 lg:order-1 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#282a36]">
						<Terminal
							theme="dracula"
							user="sys"
							syntaxHighlight={true}
							welcomeMessage={[
								"ZSH-Style Live Syntax Highlighting",
								"----------------------------------",
								"Start typing a valid command (e.g., 'echo', 'ls', 'help').",
								"Notice it turns green. Invalid commands stay red.",
								"Try typing: echo 'Hello World' --flag",
							]}
							style="height: 350px; border:none;"
						/>
					</div>
					<!-- Code (Right) -->
					<div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
						<div>
							<h2 class="text-2xl font-medium text-white mb-2">
								5. ZSH Syntax Highlighting
							</h2>
							<p class="text-[#8C8C8C] text-sm leading-relaxed">
								Just enable <code class="text-white">syntaxHighlight</code> and the terminal will tokenize input on the fly.
							</p>
						</div>
						<div class="p-5 bg-[#121212] rounded-xl border border-white/5 overflow-x-auto text-xs font-mono text-zinc-400">
							<pre><code>&lt;<span class="text-[#ff3e00]">Terminal</span>
  <span class="text-indigo-300">theme</span>=<span class="text-green-300">"dracula"</span>
  <span class="text-indigo-300">syntaxHighlight</span>=&#123;true&#125;
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</div>

		</div>
	</main>
</div>

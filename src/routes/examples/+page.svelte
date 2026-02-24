<script lang="ts">
	import { Terminal } from "$lib";
</script>

<svelte:head>
	<title>Examples - Svelte Bash</title>
</svelte:head>

<div class="min-h-screen bg-[#09090b] text-zinc-300 font-sans relative">
	<div class="grid-bg absolute inset-0 opacity-50 pointer-events-none"></div>

	<!-- NAVBAR -->
	<nav
		class="border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50"
	>
		<div
			class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
		>
			<a href="/" class="flex items-center gap-3 group">
				<div
					class="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-mono font-bold text-xs ring-1 ring-white/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
				>
					<span class="text-zinc-500 mr-[1px]">&lt;</span>_
				</div>
				<div class="flex flex-col">
					<span
						class="font-bold text-sm tracking-tight text-white leading-none"
						>svelte-bash</span
					>
					<span
						class="text-[10px] text-zinc-500 font-medium tracking-wide"
						>home</span
					>
				</div>
			</a>
			<div class="flex items-center gap-4">
				<a
					href="https://github.com/YusufCeng1z/svelte-bash"
					target="_blank"
					class="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
				>
					GitHub
				</a>
			</div>
		</div>
	</nav>

	<main class="relative z-10 max-w-7xl mx-auto px-6 py-16 pb-32">
		<div class="text-center mb-24">
			<h1
				class="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
			>
				Terminal Gallery
			</h1>
			<p class="text-zinc-400 max-w-2xl mx-auto">
				Explore different configurations, themes, and use cases for the
				Svelte Bash component. The code snippets are ready to be
				copy-pasted into your project.
			</p>
		</div>

		<div class="space-y-32">
			<!-- Example 1 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)]"
				>
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
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							1. The Hacker (Matrix Theme)
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							Perfect for CTF platforms or cybersecurity
							portfolios. Notice the <code class="text-green-400"
								>typewriter</code
							> effect typing the welcome message out character-by-character!
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="matrix"
  <span class="text-sky-300">user</span>="neo"
  <span class="text-sky-300">promptStr</span>="neo@matrix:~$ "
  <span class="text-green-400">typewriter</span>=&#123;true&#125;
  <span class="text-sky-300">welcomeMessage</span>=&#123;[
    "Wake up, Neo...",
    "The Matrix has you..."
  ]&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Example 2 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
				>
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
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							2. The Dracula Dev
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							A highly legible, high-contrast theme popular among
							dark-mode lovers. Notice the <code>autoplay</code> writing
							commands autonomously.
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="dracula"
  <span class="text-sky-300">user</span>="dev"
  <span class="text-sky-300">welcomeMessage</span
								>=&#123;["dracula-theme loaded..."]&#125;
  <span class="text-green-400">autoplay</span>=&#123;[
    &#123; command: "echo 'Dracula is elegant'" &#125;,
    &#123; command: "ls -la" &#125;
  ]&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Example 3 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-zinc-200 shadow-2xl bg-white"
				>
					<Terminal
						theme="light"
						user="root"
						bootplay={[
							{ output: "[OK] Initiating startup sequence..." },
							{ output: "[OK] Loading kernel modules..." },
							{ output: "[WARN] /dev/sda1 requires fsck" },
							{ output: "[OK] Mounting filesystems..." },
							{ output: "[OK] Starting NetworkManager..." },
							{
								output: "[OK] Reached target Graphical Interface.",
							},
						]}
						autoplay={[
							{
								command: "systemctl status network",
								output: "Network is Active and running.",
							},
							{ command: "whoami", output: "root" },
						]}
						bootSpeed={150}
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							3. Light-Theme Boot Logger
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							A beautifully clean <code>light</code> theme
							combining both <code>bootplay</code> (for fast
							pre-computation logs) and <code>autoplay</code> (for
							sequential interactive typing).
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="light"
  <span class="text-sky-300">bootSpeed</span>={150}
  <span class="text-green-400">bootplay</span>=&#123;[
    &#123; output: "[OK] Loading kernel..." &#125;,
    &#123; output: "[OK] Reached target..." &#125;
  ]&#125;
  <span class="text-green-400">autoplay</span>=&#123;[
    &#123; command: "whoami", output: "root" &#125;
  ]&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Example 5 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
				>
					<Terminal
						theme="dark"
						user="user"
						persist="gallery-fs"
						welcomeMessage={[
							"Filesystem Persistence Enabled",
							"------------------------------",
							"Try creating a file: 'touch notes.txt'",
							"Try editing it: 'nano notes.txt'",
							"Refresh the page and see it stay!",
						]}
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							4. Nano Editor & Persistence
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							Fully supports editing files securely in the
							browser. Using the <code>persist</code> prop saves
							all your hard work to <code>localStorage</code> automatically.
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="dark"
  <span class="text-sky-300">persist</span>="gallery-fs"
  <span class="text-sky-300">welcomeMessage</span
								>=&#123;["Try: nano notes.txt"]&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Example 6 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
				>
					<Terminal
						theme="dracula"
						user="api"
						commands={{
							joke: async () => {
								const res = await fetch(
									"https://v2.jokeapi.dev/joke/Programming?format=txt",
								);
								return await res.text();
							},
						}}
						welcomeMessage={[
							"Custom Commands Enabled",
							"Type 'joke' to fetch programming humor from an external API.",
						]}
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							5. Async Custom APIs
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							Extend the shell by injecting Javascript closures.
							You can <code>await</code> network fetches, database
							calls, or anything else.
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="dracula"
  <span class="text-sky-300">commands</span>=&#123;&#123;
    joke: <span class="text-pink-400">async</span> () =&gt; &#123;
      <span class="text-pink-400">const</span> res = <span class="text-pink-400"
									>await</span
								> fetch(".../joke");
      <span class="text-pink-400">return</span> <span class="text-pink-400"
									>await</span
								> res.text();
    &#125;
  &#125;&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Example 7 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-orange-500/20 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
				>
					<Terminal
						theme="dark"
						user="ninja"
						welcomeMessage={[
							"Advanced Output Redirection",
							"---------------------------",
							"Type: echo 'Svelte Bash is Cool' > output.txt",
							"Then check it: cat output.txt",
						]}
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							6. Output Redirection
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							Built-in piping behavior. The terminal engine
							correctly intercepts <code>></code> and
							<code>>></code> to mutate the virtual filesystem without
							any custom code.
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="dark"
  <span class="text-sky-300">welcomeMessage</span>=&#123;[
    "Type: echo 'hello' &gt; msg.txt"
  ]&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Example 7 -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<!-- Terminal (Left) -->
				<div
					class="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden ring-1 ring-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.15)]"
				>
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
						style="height: 400px; border:none;"
					/>
				</div>
				<!-- Code (Right) -->
				<div class="lg:col-span-5 order-1 lg:order-2 space-y-6">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">
							7. ZSH Syntax Highlighting
						</h2>
						<p class="text-zinc-400 text-sm leading-relaxed">
							Missing Oh-My-Zsh? Just enable <code
								class="text-green-400">syntaxHighlight</code
							>
							and the terminal will tokenize input on the fly. Built-in
							or custom commands turn
							<span class="text-green-500 font-bold">green</span>,
							strings turn
							<span class="text-yellow-500 font-bold">yellow</span
							>, and flags turn
							<span class="text-sky-500 font-bold">blue</span>.
						</p>
					</div>
					<div
						class="p-5 bg-[#111116] rounded-xl border border-white/10 overflow-x-auto text-xs font-mono text-zinc-400 shadow-inner"
					>
						<pre><code
								>&lt;Terminal
  <span class="text-purple-400">theme</span>="dracula"
  <span class="text-green-400">syntaxHighlight</span>=&#123;true&#125;
/&gt;</code
							></pre>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
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
</style>

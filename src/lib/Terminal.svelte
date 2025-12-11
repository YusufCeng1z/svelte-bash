<script lang="ts">
    import { onMount, tick } from "svelte";
    import { type TerminalProps, type TerminalLine, Themes } from "./types";
    import { Shell } from "./shell";

    // Props
    export let commands: TerminalProps["commands"] = {};
    export let structure: TerminalProps["structure"] = {};
    export let theme: TerminalProps["theme"] = "dark";
    export let welcomeMessage: TerminalProps["welcomeMessage"] = "";
    export let user: TerminalProps["user"] = "user";
    export let promptStr: TerminalProps["promptStr"] = "";
    export let autoplay: TerminalProps["autoplay"] = undefined;
    export let autoplayLoop: boolean = true;
    export let typingSpeed: number = 50;

    // Style Props
    let clazz: string = "";
    export { clazz as class };

    // Internal State
    let history: TerminalLine[] = [];
    let currentInput = "";

    // Input history state
    let inputHistory: string[] = [];
    let historyIndex = -1;
    let tempInput = "";

    // Theme resolution
    const defaultTheme = {
        background: "#1a1b26",
        foreground: "#a9b1d6",
        prompt: "#7aa2f7",
        cursor: "#c0caf5",
    };
    $: activeTheme =
        typeof theme === "string"
            ? Themes[theme] || defaultTheme
            : { ...defaultTheme, ...theme };

    // Shell Logic Instance
    const shell = new Shell(structure, commands, user);

    // Reactivity for props -> Shell
    $: if (structure) shell.setStructure(structure);
    $: if (commands) shell.setCommands(commands);

    // Elements
    let container: HTMLDivElement;
    let inputElement: HTMLInputElement;

    // Initialize
    onMount(() => {
        if (welcomeMessage) {
            addToHistory({ type: "output", content: welcomeMessage });
        }
        if (autoplay && autoplay.length > 0) {
            runAutoplay();
        }
    });

    async function runAutoplay() {
        while (true) {
            for (const item of autoplay!) {
                await typeCommand(item.command);
                await sleep(500);

                addToHistory({ type: "command", content: item.command });
                currentInput = "";

                if (item.output) {
                    await sleep(200);
                    addToHistory({ type: "output", content: item.output });
                }
                await sleep(1000);
            }
            if (!autoplayLoop) break;
            history = [];
            await sleep(500);
        }
    }

    async function typeCommand(cmd: string) {
        currentInput = "";
        for (const char of cmd) {
            currentInput += char;
            await sleep(typingSpeed + Math.random() * 20);
        }
    }

    function sleep(ms: number) {
        return new Promise((r) => setTimeout(r, ms));
    }

    function addToHistory(line: Omit<TerminalLine, "id">) {
        history = [...history, { ...line, id: Date.now() + Math.random() }];
        scrollToBottom();
    }

    async function scrollToBottom() {
        await tick();
        if (container) container.scrollTop = container.scrollHeight;
    }

    async function handleEnter() {
        const raw = currentInput;
        currentInput = "";

        // Reset navigation
        historyIndex = -1;
        tempInput = "";

        // 1. Snapshot Prompt & Add Command
        const currentPath = shell.currentPath.join("/");
        const promptLabel = promptStr || `${user}@host ${currentPath} $`;

        addToHistory({ type: "command", content: raw, promptLabel });

        if (!raw.trim()) return;

        // Save to input history
        inputHistory = [...inputHistory, raw];

        // 2. Execute
        const results = await shell.execute(raw);

        // 3. Handle Results
        for (const line of results) {
            if (
                line.type === ("command" as any) &&
                line.content === "CLEAR_SIGNAL"
            ) {
                history = [];
                return;
            }
            addToHistory(line);
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            handleEnter();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (inputHistory.length === 0) return;

            if (historyIndex === -1) {
                // Save current typing before moving up
                tempInput = currentInput;
                historyIndex = inputHistory.length - 1;
            } else if (historyIndex > 0) {
                historyIndex--;
            }
            currentInput = inputHistory[historyIndex];
            // Move cursor to end? Browsers usually do this automatically on value change.
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === -1) return;

            if (historyIndex < inputHistory.length - 1) {
                historyIndex++;
                currentInput = inputHistory[historyIndex];
            } else {
                // Back to temp
                historyIndex = -1;
                currentInput = tempInput;
            }
        }
    }
</script>

<!-- 
  Uses vanilla CSS classes instead of Tailwind to ensure zero-dependency 
  compatibility across all projects.
-->
<div
    bind:this={container}
    on:click={() => inputElement?.focus()}
    role="button"
    tabindex="0"
    on:keydown={() => {}}
    {...$$restProps}
    class="svelte-bash-terminal custom-scrollbar {clazz}"
    style="
        background-color: {activeTheme.background}; 
        color: {activeTheme.foreground};
        border-color: {activeTheme.prompt}33;
        {$$restProps.style || ''}
    "
>
    <!-- HISTORY rendering -->
    {#each history as line (line.id)}
        <div class="line">
            {#if line.type === "command"}
                <span class="prompt-label" style="color: {activeTheme.prompt};">
                    {line.promptLabel || "$"}
                </span>
                <span>{line.content}</span>
            {:else if line.type === "error"}
                <span class="error">{line.content}</span>
            {:else}
                <!-- Output -->
                {#if typeof line.content === "string"}
                    <div class="output">
                        {line.content}
                    </div>
                {:else if Array.isArray(line.content)}
                    {#each line.content as item}
                        <div class="output">{item}</div>
                    {/each}
                {:else}
                    <svelte:component this={line.content} />
                {/if}
            {/if}
        </div>
    {/each}

    <!-- ACTIVE INPUT LINE -->
    {#if !autoplay}
        <div class="input-line">
            <span
                class="prompt-label shrink-0"
                style="color: {activeTheme.prompt};"
            >
                {promptStr || `${user}@host ${shell.currentPath.join("/")} $`}
            </span>
            <input
                bind:this={inputElement}
                bind:value={currentInput}
                on:keydown={handleKeydown}
                class="terminal-input"
                style="color: {activeTheme.cursor}; caret-color: {activeTheme.cursor};"
                spellcheck="false"
                autocomplete="off"
                autofocus
            />
        </div>
    {:else}
        <div class="input-line">
            <span
                class="prompt-label shrink-0"
                style="color: {activeTheme.prompt};"
            >
                {promptStr || `${user}@host ${shell.currentPath.join("/")} $`}
            </span>
            <span>{currentInput}</span>
            <span
                class="cursor-block"
                style="background-color: {activeTheme.cursor};"
            ></span>
        </div>
    {/if}
</div>

<style>
    /* Container Styles */
    .svelte-bash-terminal {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        font-size: 14px;
        padding: 1rem;
        border-width: 1px;
        border-style: solid;
        border-radius: 0.25rem;
        transition:
            background-color 0.3s,
            color 0.3s;
        cursor: text;
        display: block;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        text-align: left;
    }

    /* Common Line Styles */
    .line {
        margin-bottom: 0.25rem;
        line-height: 1.375;
        word-break: break-all;
    }

    .prompt-label {
        font-weight: bold;
        margin-right: 0.5rem;
        user-select: none;
    }

    .error {
        color: #ef4444; /* red-500 */
    }

    .output {
        white-space: pre-wrap;
        opacity: 0.9;
    }

    /* Input Area */
    .input-line {
        display: flex;
        align-items: center;
        margin-bottom: 0.25rem;
        line-height: 1.375;
        width: 100%;
    }

    .shrink-0 {
        flex-shrink: 0;
    }

    .terminal-input {
        flex: 1;
        background-color: transparent !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
    }

    .terminal-input:focus {
        outline: none !important;
        border: none !important;
    }

    /* Autoplay Cursor */
    .cursor-block {
        display: inline-block;
        width: 0.6em;
        height: 1.2em;
        vertical-align: middle;
        margin-left: 0.25rem;
        animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    /* Scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
</style>

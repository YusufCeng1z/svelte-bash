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

<div
    bind:this={container}
    on:click={() => inputElement?.focus()}
    role="button"
    tabindex="0"
    on:keydown={() => {}}
    {...$$restProps}
    class="w-full h-full rounded overflow-y-auto font-mono text-sm p-4 border transition-colors duration-300 custom-scrollbar block {clazz}"
    style="
        background-color: {activeTheme.background}; 
        color: {activeTheme.foreground};
        border-color: {activeTheme.prompt}33;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        min-height: 300px;
        max-height: 500px;
        cursor: text; 
        {$$restProps.style || ''}
    "
>
    <!-- HISTORY rendering -->
    {#each history as line (line.id)}
        <div class="mb-1 leading-snug break-words">
            {#if line.type === "command"}
                <span
                    style="color: {activeTheme.prompt}; font-weight: bold; margin-right: 8px;"
                >
                    {line.promptLabel || "$"}
                </span>
                <span>{line.content}</span>
            {:else if line.type === "error"}
                <span class="text-red-500">{line.content}</span>
            {:else}
                <!-- Output -->
                {#if typeof line.content === "string"}
                    <div class="whitespace-pre-wrap opacity-90">
                        {line.content}
                    </div>
                {:else if Array.isArray(line.content)}
                    {#each line.content as item}
                        <div class="whitespace-pre-wrap opacity-90">{item}</div>
                    {/each}
                {:else}
                    <svelte:component this={line.content} />
                {/if}
            {/if}
        </div>
    {/each}

    <!-- ACTIVE INPUT LINE -->
    {#if !autoplay}
        <div class="flex items-center mb-1 leading-snug">
            <span
                style="color: {activeTheme.prompt}; font-weight: bold; margin-right: 8px;"
                class="shrink-0"
            >
                {promptStr || `${user}@host ${shell.currentPath.join("/")} $`}
            </span>
            <input
                bind:this={inputElement}
                bind:value={currentInput}
                on:keydown={handleKeydown}
                class="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 m-0 w-full"
                style="color: {activeTheme.cursor}; caret-color: {activeTheme.cursor};"
                spellcheck="false"
                autocomplete="off"
                autofocus
            />
        </div>
    {:else}
        <div class="flex items-center mb-1 leading-snug">
            <span
                style="color: {activeTheme.prompt}; font-weight: bold; margin-right: 8px;"
                class="shrink-0"
            >
                {promptStr || `${user}@host ${shell.currentPath.join("/")} $`}
            </span>
            <span>{currentInput}</span>
            <span
                class="animate-pulse inline-block w-2 h-4 bg-current align-middle ml-1"
            ></span>
        </div>
    {/if}
</div>

<style>
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

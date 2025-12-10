export class Shell {
    structure;
    customCommands;
    cwd;
    history;
    user;
    constructor(structure = {}, commands = {}, user = 'user', history = []) {
        this.structure = structure;
        this.customCommands = commands;
        this.user = user;
        this.history = history;
        this.cwd = ['~'];
    }
    get currentPath() {
        return this.cwd;
    }
    setHistory(h) {
        this.history = h;
    }
    setStructure(s) {
        this.structure = s;
    }
    setCommands(c) {
        this.customCommands = c;
    }
    /**
     * Resolve path parts to a node in the file structure.
     */
    resolveNode(pathParts) {
        let current = this.structure;
        // If path starts at root (not supported in this simple version unless we add '/' handling)
        // We assume structure IS the root.
        // We currently handle paths relative to root for simplification as `~` is implicit root here.
        // Actually, let's just traverse the structure object.
        for (const part of pathParts) {
            if (part === '~')
                continue;
            if (typeof current === 'object' && current[part]) {
                current = current[part];
            }
            else {
                return undefined;
            }
        }
        return current;
    }
    /**
     * Process a command string and return the updated history lines (or void if direct history mutation).
     * Actually, let's return a list of NEW lines provided by the command execution.
     */
    async execute(input) {
        const trimmed = input.trim();
        if (!trimmed)
            return [];
        const [cmd, ...args] = trimmed.split(/\s+/);
        const outputLines = [];
        // 1. Built-in: clear
        if (cmd === 'clear') {
            // Signal to clear history. 
            // We can return a special signal or just handle it in the component?
            // "Types" didn't specify a clear signal. 
            // Let's assume the component checks for 'CLEAR_SIGNAL' or we act on history reference?
            // Cleaner: return a specific line type or handle it. 
            // Let's just return a "system" type? Or rely on component to clear if it sees special property?
            // Actually, we can just return a 'clear' type line if we update types? 
            // Or just return null?
            // "Professional": The shell should control history. 
            // But Svelte reactivity means component owns the 'history' array usually.
            // Let's make this method just return the RESULT of the command.
            // Special handling for clear:
            return [{ type: 'command', content: 'CLEAR_SIGNAL', id: -1 }];
        }
        // 2. Built-in: ls
        if (cmd === 'ls') {
            const ptr = this.resolveNode(this.cwd);
            if (ptr && typeof ptr === 'object') {
                const entries = Object.entries(ptr).map(([name, val]) => {
                    return typeof val === 'object' ? name + '/' : name;
                });
                outputLines.push({ type: 'output', content: entries.length ? entries.join('  ') : '' });
            }
            else {
                outputLines.push({ type: 'error', content: `ls: cannot access '${this.cwd.join('/')}': Not a directory` });
            }
            return outputLines;
        }
        // 3. Built-in: cat
        if (cmd === 'cat') {
            const target = args[0];
            if (!target) {
                return [{ type: 'error', content: 'usage: cat <file>' }];
            }
            // Resolve path relative to CWD
            // Simple 1-level check for now (or improve to full path parser)
            const ptr = this.resolveNode(this.cwd);
            if (ptr && typeof ptr === 'object' && ptr[target]) {
                const file = ptr[target];
                if (typeof file === 'string') {
                    return [{ type: 'output', content: file }];
                }
                return [{ type: 'error', content: `cat: ${target}: Is a directory` }];
            }
            return [{ type: 'error', content: `cat: ${target}: No such file` }];
        }
        // 4. Built-in: cd
        if (cmd === 'cd') {
            const target = args[0];
            if (!target || target === '~') {
                this.cwd = ['~'];
                return [];
            }
            if (target === '..') {
                if (this.cwd.length > 1) {
                    this.cwd.pop();
                }
                return [];
            }
            // Allow relative one-level down
            const ptr = this.resolveNode(this.cwd);
            if (ptr && typeof ptr === 'object' && ptr[target]) {
                if (typeof ptr[target] === 'object') {
                    this.cwd.push(target);
                }
                else {
                    return [{ type: 'error', content: `cd: ${target}: Not a directory` }];
                }
            }
            else {
                return [{ type: 'error', content: `cd: ${target}: No such file or directory` }];
            }
            return [];
        }
        // 5. Built-in: pwd
        if (cmd === 'pwd') {
            return [{ type: 'output', content: '/' + this.cwd.slice(1).join('/') }]; // slice(1) to ignore ~ as explicit root string
        }
        // 6. Built-in: help
        if (cmd === 'help') {
            const custom = Object.keys(this.customCommands);
            const content = `Available commands: clear, ls, cat, cd, pwd, help${custom.length ? ', ' + custom.join(', ') : ''}`;
            return [{ type: 'output', content }];
        }
        // 7. Custom Commands
        if (this.customCommands[cmd]) {
            try {
                const res = await this.customCommands[cmd](args);
                if (res)
                    return [{ type: 'output', content: res }];
                return [];
            }
            catch (err) {
                return [{ type: 'error', content: err.message || String(err) }];
            }
        }
        return [{ type: 'error', content: `Command not found: ${cmd}` }];
    }
}

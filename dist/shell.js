export class Shell {
    structure;
    customCommands;
    cwd;
    history;
    user;
    aliases = {};
    listeners = {};
    constructor(structure = {}, commands = {}, user = 'user', history = []) {
        this.structure = structure;
        this.customCommands = commands;
        this.user = user;
        this.history = history;
        this.cwd = ['~'];
    }
    on(event, callback) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
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
     * Resolve a path string to a node and its logical path.
     * Handles:
     * - Absolute paths ( start with / )
     * - Relative paths ( start with ., .., or name )
     * - Nested paths ( a/b/c )
     */
    resolvePath(pathStr) {
        // 1. Determine start point
        let parts = [];
        let currentPath = [];
        let current = this.structure;
        if (pathStr === '/' || pathStr === '') {
            return { node: this.structure, path: ['~'], parent: undefined, name: '' };
        }
        else if (pathStr === '~') {
            return { node: this.structure, path: ['~'], parent: undefined, name: '' };
        }
        else if (pathStr.startsWith('/')) {
            // Absolute path: start from root (which is ~ in our simple structure)
            currentPath = ['~'];
            parts = pathStr.split('/').filter(p => p !== '');
        }
        else {
            // Relative path: start from CWD
            currentPath = [...this.cwd];
            parts = pathStr.split('/').filter(p => p !== '');
            // Navigate to current CWD in the structure
            let ptr = this.structure;
            for (const p of this.cwd) {
                if (p === '~')
                    continue;
                if (ptr[p])
                    ptr = ptr[p];
            }
            current = ptr;
        }
        let parent = undefined;
        let lastPart = '';
        // 2. Traverse
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            lastPart = part;
            if (part === '.')
                continue;
            if (part === '..') {
                if (currentPath.length > 1) {
                    currentPath.pop();
                    // Re-resolve 'current' node from root based on new path
                    let ptr = this.structure;
                    for (const p of currentPath) {
                        if (p === '~')
                            continue;
                        if (ptr[p])
                            ptr = ptr[p];
                    }
                    current = ptr;
                }
                parent = undefined; // We moved up, parent context is lost/changed logic
                continue;
            }
            // Move down
            if (typeof current === 'object') {
                parent = current;
                if (current[part]) {
                    current = current[part];
                    currentPath.push(part);
                }
                else {
                    // Path doesn't exist from here
                    // Check if this is the last part (we might be willing to return parent and name for creation)
                    if (i === parts.length - 1) {
                        return { node: undefined, path: [...currentPath, part], parent, name: part };
                    }
                    return { node: undefined, path: currentPath, parent: undefined, name: part };
                }
            }
            else {
                return { node: undefined, path: currentPath, parent: undefined, name: part };
            }
        }
        return { node: current, path: currentPath, parent: parts.length > 0 ? parent : undefined, name: lastPart };
    }
    /**
     * Process a command string and return the updated history lines (or void if direct history mutation).
     * Actually, let's return a list of NEW lines provided by the command execution.
     */
    async execute(input) {
        const trimmed = input.trim();
        if (!trimmed)
            return [];
        let [cmd, ...args] = trimmed.split(/\s+/);
        // Alias Resolution
        if (this.aliases[cmd]) {
            const aliased = this.aliases[cmd];
            const expanded = aliased + ' ' + args.join(' ');
            [cmd, ...args] = expanded.trim().split(/\s+/);
        }
        const outputLines = [];
        // 1. Custom Commands (Priority over built-ins)
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
        // 2. Built-in: clear
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
        // 3. Built-in: ls
        if (cmd === 'ls') {
            const flags = new Set();
            let target = '.';
            // Parse args
            for (const arg of args) {
                if (arg.startsWith('-')) {
                    // e.g. -la -> l, a
                    for (let i = 1; i < arg.length; i++) {
                        flags.add(arg[i]);
                    }
                }
                else {
                    target = arg;
                }
            }
            const { node } = this.resolvePath(target);
            if (node && typeof node === 'object') {
                let entries = Object.entries(node);
                // Filter hidden files unless -a is present
                if (!flags.has('a')) {
                    entries = entries.filter(([name]) => !name.startsWith('.'));
                }
                if (flags.has('l')) {
                    // Long format: one per line, maybe fake details
                    // drwxr-xr-x 1 user 0 <date> name
                    const lines = entries.map(([name, val]) => {
                        const isDir = typeof val === 'object';
                        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
                        const size = isDir ? 0 : (typeof val === 'string' ? val.length : 0);
                        const date = new Date().toLocaleDateString();
                        // Simplified date for demo
                        return `${perms} 1 user ${size.toString().padStart(4)} ${date} ${name}${isDir ? '/' : ''}`;
                    });
                    outputLines.push({ type: 'output', content: lines.length ? lines.join('\n') : '' });
                }
                else {
                    // Standard format
                    const names = entries.map(([name, val]) => {
                        return typeof val === 'object' ? name + '/' : name;
                    });
                    outputLines.push({ type: 'output', content: names.length ? names.join('  ') : '' });
                }
            }
            else if (typeof node === 'string') {
                outputLines.push({ type: 'output', content: target });
            }
            else {
                outputLines.push({ type: 'error', content: `ls: cannot access '${target}': No such file or directory` });
            }
            return outputLines;
        }
        // 4. Built-in: cat
        if (cmd === 'cat') {
            const target = args[0];
            if (!target) {
                return [{ type: 'error', content: 'usage: cat <file>' }];
            }
            const { node } = this.resolvePath(target);
            if (typeof node === 'string') {
                return [{ type: 'output', content: node }];
            }
            else if (typeof node === 'object') {
                return [{ type: 'error', content: `cat: ${target}: Is a directory` }];
            }
            return [{ type: 'error', content: `cat: ${target}: No such file or directory` }];
        }
        // 5. Built-in: cd
        if (cmd === 'cd') {
            const target = args[0];
            if (!target || target === '~') {
                this.cwd = ['~'];
                return [];
            }
            const { node, path } = this.resolvePath(target);
            if (node && typeof node === 'object') {
                this.cwd = path;
            }
            else if (typeof node === 'string') {
                return [{ type: 'error', content: `cd: ${target}: Not a directory` }];
            }
            else {
                return [{ type: 'error', content: `cd: ${target}: No such file or directory` }];
            }
            return [];
        }
        // 6. Built-in: pwd
        if (cmd === 'pwd') {
            // Convert ['~', 'src', 'lib'] -> '/src/lib'
            const pathStr = this.cwd.length > 1 ? '/' + this.cwd.slice(1).join('/') : '/';
            return [{ type: 'output', content: pathStr }];
        }
        // 7. Built-in: help
        if (cmd === 'help') {
            const custom = Object.keys(this.customCommands);
            const content = `Available commands: clear, ls, cat, cd, pwd, help, history, mkdir, touch, rm, alias${custom.length ? ', ' + custom.join(', ') : ''}`;
            return [{ type: 'output', content }];
        }
        // 8. Built-in: history
        if (cmd === 'history') {
            const historyContent = this.history
                .filter(h => h.type === 'command')
                .map((h, i) => `${i + 1}  ${h.content}`)
                .join('\n');
            return [{ type: 'output', content: historyContent }];
        }
        // 9. Built-in: mkdir
        if (cmd === 'mkdir') {
            const target = args[0];
            if (!target)
                return [{ type: 'error', content: 'usage: mkdir <directory>' }];
            const { node, parent, name } = this.resolvePath(target);
            if (node) {
                return [{ type: 'error', content: `mkdir: cannot create directory '${target}': File exists` }];
            }
            if (parent && typeof parent === 'object') {
                parent[name] = {};
                this.emit('change', this.structure);
                return [];
            }
            return [{ type: 'error', content: `mkdir: cannot create directory '${target}': No such file or directory` }];
        }
        // 10. Built-in: touch
        if (cmd === 'touch') {
            const target = args[0];
            if (!target)
                return [{ type: 'error', content: 'usage: touch <file>' }];
            const { node, parent, name } = this.resolvePath(target);
            if (node) {
                // Update timestamp? For now do nothing if exists
                return [];
            }
            if (parent && typeof parent === 'object') {
                parent[name] = "";
                this.emit('change', this.structure);
                return [];
            }
            return [{ type: 'error', content: `touch: cannot touch '${target}': No such file or directory` }];
        }
        // 11. Built-in: rm
        if (cmd === 'rm') {
            const recursive = args[0] === '-r';
            const target = recursive ? args[1] : args[0];
            if (!target)
                return [{ type: 'error', content: 'usage: rm [-r] <file/directory>' }];
            const { node, parent, name } = this.resolvePath(target);
            if (!node) {
                return [{ type: 'error', content: `rm: cannot remove '${target}': No such file or directory` }];
            }
            if (typeof node === 'object' && !recursive) {
                return [{ type: 'error', content: `rm: cannot remove '${target}': Is a directory` }];
            }
            if (parent && typeof parent === 'object') {
                delete parent[name];
                this.emit('change', this.structure);
                return [];
            }
            return [{ type: 'error', content: `rm: cannot remove root` }];
        }
        // 13. Built-in: cp
        if (cmd === 'cp') {
            const src = args[0];
            const dest = args[1];
            if (!src || !dest)
                return [{ type: 'error', content: 'usage: cp <source> <destination>' }];
            const sourceRes = this.resolvePath(src);
            if (!sourceRes.node)
                return [{ type: 'error', content: `cp: cannot stat '${src}': No such file or directory` }];
            const destRes = this.resolvePath(dest);
            let targetParent = destRes.parent;
            let targetName = destRes.name;
            // If destination exists and is a directory, copy INTO it
            if (destRes.node && typeof destRes.node === 'object') {
                targetParent = destRes.node;
                targetName = sourceRes.name;
            }
            if (targetParent && typeof targetParent === 'object') {
                targetParent[targetName] = typeof sourceRes.node === 'object' ? JSON.parse(JSON.stringify(sourceRes.node)) : sourceRes.node;
                this.emit('change', this.structure);
                return [];
            }
            return [{ type: 'error', content: `cp: cannot create regular file '${dest}': No such file or directory` }];
        }
        // 14. Built-in: mv
        if (cmd === 'mv') {
            const src = args[0];
            const dest = args[1];
            if (!src || !dest)
                return [{ type: 'error', content: 'usage: mv <source> <destination>' }];
            const sourceRes = this.resolvePath(src);
            if (!sourceRes.node)
                return [{ type: 'error', content: `mv: cannot stat '${src}': No such file or directory` }];
            const destRes = this.resolvePath(dest);
            let targetParent = destRes.parent;
            let targetName = destRes.name;
            // If destination exists and is a directory, move INTO it
            if (destRes.node && typeof destRes.node === 'object') {
                targetParent = destRes.node;
                targetName = sourceRes.name;
            }
            if (targetParent && typeof targetParent === 'object') {
                targetParent[targetName] = sourceRes.node;
                if (sourceRes.parent && typeof sourceRes.parent === 'object') {
                    delete sourceRes.parent[sourceRes.name];
                }
                this.emit('change', this.structure);
                return [];
            }
            return [{ type: 'error', content: `mv: cannot move '${src}' to '${dest}': No such file or directory` }];
        }
        // 15. Built-in: alias
        if (cmd === 'alias') {
            // alias name="value" or alias name=value
            const argStr = args.join(' ');
            if (!argStr) {
                // List aliases
                const list = Object.entries(this.aliases).map(([k, v]) => `${k}='${v}'`).join('\n');
                return [{ type: 'output', content: list }];
            }
            const match = argStr.match(/^([a-zA-Z0-9_-]+)=(.+)$/);
            if (match) {
                const key = match[1];
                let val = match[2];
                // Remove quotes if present
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                this.aliases[key] = val;
                return [];
            }
            return [{ type: 'error', content: "usage: alias name='command'" }];
        }
        return [{ type: 'error', content: `Command not found: ${cmd}` }];
    }
    /**
     * Autocomplete logic
     */
    autocomplete(input) {
        if (!input)
            return '';
        // naive tokenizer: split by space
        // if ends with space, we are looking for a new argument?
        // bash usually autocompletes the *current* token.
        // Find the token being typed.
        // If the cursor is at the end (assumed), we look at the last part.
        const parts = input.split(' ');
        const lastPart = parts[parts.length - 1]; // This determines WHAT we are trying to complete
        const isCommand = parts.length === 1;
        let candidates = [];
        let prefix = ''; // The part of the path that is already "fixed"
        if (isCommand) {
            // Match against commands
            const builtIns = ['clear', 'ls', 'cat', 'cd', 'pwd', 'help', 'history'];
            const customs = Object.keys(this.customCommands);
            const all = Array.from(new Set([...builtIns, ...customs]));
            candidates = all.filter(c => c.startsWith(lastPart));
        }
        else {
            // Resolve the "parent" of the token we are typing
            // e.g. src/li -> parent is "src/", looking for things starting with "li"
            const lastSlashIndex = lastPart.lastIndexOf('/');
            let parentPath = '.';
            let searchToken = lastPart;
            if (lastSlashIndex !== -1) {
                parentPath = lastPart.substring(0, lastSlashIndex) || '/';
                searchToken = lastPart.substring(lastSlashIndex + 1);
                prefix = parentPath === '/' ? '/' : parentPath + '/';
            }
            const { node } = this.resolvePath(parentPath);
            if (node && typeof node === 'object') {
                const entries = Object.keys(node).map(name => {
                    // Add trailing slash for directories?
                    const isDir = typeof node[name] === 'object';
                    return isDir ? name + '/' : name;
                });
                candidates = entries.filter(e => e.startsWith(searchToken));
            }
        }
        if (candidates.length === 0)
            return input;
        if (candidates.length === 1) {
            // Complete it
            parts[parts.length - 1] = prefix + candidates[0];
            return parts.join(' ');
        }
        // Multiple candidates: find common prefix
        candidates.sort();
        const first = candidates[0];
        const last = candidates[candidates.length - 1];
        let i = 0;
        while (i < first.length && first.charAt(i) === last.charAt(i))
            i++;
        const common = first.substring(0, i);
        if (common.length > 0) {
            // IMPORTANT: If we are completing a file path, we need to append the common part to the *directory prefix*
            // But 'common' is just the common part of the entries *in that directory*.
            // So if prefix is "src/" and candidates are "lib/" and "locales/", common is "l".
            // Result should be "src/l".
            // But wait, 'candidates' were filtered from 'entries'.
            // 'entries' are just names like 'lib/', 'Terminal.svelte'.
            // So 'common' is correct relative to the parent dir.
            // However, we want to update the lastPart
            // lastPart was e.g. "src/li"
            // prefix was "src/"
            // common is "lib/" (if only one match) or "l" (if multiple)
            parts[parts.length - 1] = prefix + common;
            return parts.join(' ');
        }
        return input;
    }
}

import type { FileStructure, CommandHandler, TerminalLine } from './types';
export declare class Shell {
    private structure;
    private customCommands;
    private cwd;
    private history;
    private user;
    private aliases;
    private listeners;
    constructor(structure?: FileStructure, commands?: Record<string, CommandHandler>, user?: string, history?: TerminalLine[]);
    on(event: string, callback: Function): void;
    private emit;
    get currentPath(): string[];
    setHistory(h: TerminalLine[]): void;
    setStructure(s: FileStructure): void;
    setCommands(c: Record<string, CommandHandler>): void;
    /**
     * Resolve a path string to a node and its logical path.
     * Handles:
     * - Absolute paths ( start with / )
     * - Relative paths ( start with ., .., or name )
     * - Nested paths ( a/b/c )
     */
    private resolvePath;
    /**
     * Process a command string and return the updated history lines (or void if direct history mutation).
     * Actually, let's return a list of NEW lines provided by the command execution.
     */
    execute(input: string): Promise<TerminalLine[]>;
    /**
     * Autocomplete logic
     */
    autocomplete(input: string): string;
}

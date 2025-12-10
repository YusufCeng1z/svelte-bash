import type { FileStructure, CommandHandler, TerminalLine } from './types';
export declare class Shell {
    private structure;
    private customCommands;
    private cwd;
    private history;
    private user;
    constructor(structure?: FileStructure, commands?: Record<string, CommandHandler>, user?: string, history?: TerminalLine[]);
    get currentPath(): string[];
    setHistory(h: TerminalLine[]): void;
    setStructure(s: FileStructure): void;
    setCommands(c: Record<string, CommandHandler>): void;
    /**
     * Resolve path parts to a node in the file structure.
     */
    private resolveNode;
    /**
     * Process a command string and return the updated history lines (or void if direct history mutation).
     * Actually, let's return a list of NEW lines provided by the command execution.
     */
    execute(input: string): Promise<TerminalLine[]>;
}

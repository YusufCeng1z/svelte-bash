import type { Component } from 'svelte';
/**
 * Represents a single line in the terminal history.
 */
export interface TerminalLine {
    type: 'command' | 'output' | 'error';
    content: string | string[] | Component;
    id?: number;
    /** Optional snapshot of the prompt at the time this line was created (for commands). */
    promptLabel?: string;
}
/**
 * Represents the virtual file system structure.
 * keys are file/directory names.
 * values are string (file content) or object (subdirectory).
 */
export type FileStructure = {
    [key: string]: string | FileStructure;
};
/**
 * Function signature for custom commands.
 * Returns a promise that resolves to the output (string, lines, or void).
 */
export type CommandHandler = (args: string[]) => Promise<string | string[] | void> | string | string[] | void;
/**
 * Interface for the terminal theme.
 */
export interface Theme {
    background: string;
    foreground: string;
    prompt: string;
    cursor: string;
    selection?: string;
}
/**
 * Predefined themes available in the library.
 */
export declare const Themes: Record<string, Theme>;
/**
 * Props accepted by the `<Terminal />` component.
 */
export interface TerminalProps {
    /** Map of custom commands. Key is the command name. */
    commands?: Record<string, CommandHandler>;
    /** Virtual file system structure. */
    structure?: FileStructure;
    /**
     * Theme object or name of a preset ('dark', 'light', 'dracula', 'matrix').
     * @default 'dark'
     */
    theme?: keyof typeof Themes | Theme;
    /** Message to display on initialization. */
    welcomeMessage?: string | string[];
    /** Username for the prompt. @default 'user' */
    user?: string;
    /**
     * Static override for the entire prompt string.
     * If provided, `user` and dynamic path are ignored.
     */
    promptStr?: string;
    /**
     * Autoplay script for "Show Mode".
     * If provided, the terminal becomes read-only and plays this script.
     */
    autoplay?: {
        command: string;
        output?: string | string[] | Component;
        typingSpeed?: number;
        delayAfter?: number;
    }[];
    /**
     * Whether to loop the autoplay script.
     * @default true
     */
    autoplayLoop?: boolean;
    /**
     * Typing speed in milliseconds for autoplay.
     * @default 50
     */
    typingSpeed?: number;
    /**
     * Additional CSS classes for the terminal container.
     */
    class?: string;
}


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
export const Themes: Record<string, Theme> = {
    dark: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        prompt: '#7aa2f7',
        cursor: '#c0caf5'
    },
    light: {
        background: '#ffffff',
        foreground: '#000000',
        prompt: '#2563eb',
        cursor: '#000000'
    },
    dracula: {
        background: '#282a36',
        foreground: '#f8f8f2',
        prompt: '#bd93f9',
        cursor: '#f8f8f2'
    },
    matrix: {
        background: '#000000',
        foreground: '#00ff00',
        prompt: '#00cc00',
        cursor: '#00ff00'
    }
};

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
    autoplay?: { command: string; output?: string | string[] | Component }[];

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
     * Bootplay script for "OS Boot Mode".
     * Unlike autoplay, it does not type commands — it only streams output lines.
     * If provided, the terminal becomes read-only and plays this script.
     */
    bootplay?: { output: string | string[] | Component; delay?: number }[];

    /**
     * Whether to loop the bootplay script.
     * @default false
     */
    bootplayLoop?: boolean;

    /**
     * Base speed in milliseconds between bootplay output lines.
     * Individual items can override using `delay`.
     * @default 10
     */
    bootSpeed?: number;

    /**
     * Additional CSS classes for the terminal container.
     */
    class?: string;
}

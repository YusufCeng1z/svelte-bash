# Svelte Bash

<div align="center">

  <img src="static/svelte-bash.jpg" alt="Svelte Bash Banner" width="100%" />

  <h1>Svelte Bash</h1>

  <p>
    <strong>The ultimate lightweight, fully typed, and customizable terminal component for Svelte 5.</strong>
  </p>

  <p>
    <a href="https://svelte-bash.netlify.app/"><strong>Live Demo</strong></a> ·
    <a href="https://www.npmjs.com/package/svelte-bash"><strong>NPM</strong></a> ·
    <a href="https://github.com/YusufCeng1z/svelte-bash"><strong>GitHub</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/npm/v/svelte-bash?style=flat-square&color=blue" alt="NPM Version" />
    <img src="https://img.shields.io/npm/l/svelte-bash?style=flat-square&color=orange" alt="License" />
    <img src="https://img.shields.io/badge/Svelte-5-orange?style=flat-square&logo=svelte" alt="Svelte 5" />
    <img src="https://img.shields.io/badge/Zero_Dependency-Used_Vanilla_CSS-blueviolet?style=flat-square" alt="Zero Dependency" />
  </p>

</div>

---

**Svelte Bash** is a high-performance terminal emulator component designed specifically for modern Svelte applications. It provides a realistic shell experience with a virtual file system, command history navigation, and advanced features like autoplay sequences for tutorials.

> **Note:** As of v1.0.1, svelte-bash has been refactored to use **Pure Vanilla CSS** internally. This means it has **ZERO dependencies** on Tailwind CSS and will render correctly in any project (including Bootstrap, Tailwind, or plain CSS projects). You do NOT need to install Tailwind.

Whether you are building a developer portfolio, a documentation site, or a web-based CLI tool, Svelte Bash offers the perfect balance of aesthetics and functionality.

## Key Features

*   **Lightweight & Fast**: Zero external dependencies, ~4kb gzipped.
*   **Filesystem Mutation (v1.1)**: Create, move, copy, and delete files/folders (`mkdir`, `touch`, `rm`, `cp`, `mv`).
*   **Persistent Changes**: Use the `on:change` event to save filesystem state to `localStorage`.
*   **Aliases (v1.1)**: Create custom command shortcuts (e.g. `alias ll='ls -la'`).
*   **Virtual File System**: fully functional `ls -la`, `cd`, `cat`, and `pwd` commands.
*   **Deep Theming**: Includes `dracula`, `matrix`, and `dark` presets, plus full CSS control.
*   **Autoplay Mode**: Script commands to run automatically with granular speed control.
*   **Accessible**: Proper focus management and keyboard history navigation (Up/Down arrows).
*   **TypeScript**: Written in TypeScript for excellent type safety and autocomplete.

## Installation

```bash
npm install svelte-bash
```

## Usage

### Basic Example

Import the component and pass a `structure` object to define the virtual file system.

```svelte
<script>
  import { Terminal } from 'svelte-bash';

  const fileSystem = {
    'readme.md': '# Hello World',
    'src': {
       'app.js': 'console.log("Hi")'
    }
  };
</script>

<Terminal
    structure={fileSystem}
    user="guest"
    style="height: 300px"
/>
```

### Filesystem Management (v1.1)

The terminal now supports file mutation. You can listen to changes to persist them.

```svelte
<script>
    import { Terminal } from 'svelte-bash';

    // ... load initial state from localStorage ...

    function handleFsChange(event) {
        // event.detail contains the new FileStructure
        localStorage.setItem('fs', JSON.stringify(event.detail));
    }
</script>

<Terminal
    structure={initialState}
    on:change={handleFsChange}
/>
```

### Custom Commands & Aliases

You can extend the terminal with your own commands or presets.

```svelte
<script>
  import { Terminal } from 'svelte-bash';

  const myCommands = {
    // Return a string
    hello: () => "Hello form svelte-bash!",

    // Accept arguments
    echo: (args) => args.join(' '),

    // Define an alias programmatically
    ll: () => "alias ll='ls -la'"
  };
</script>

<Terminal commands={myCommands} />
```

### Autoplay (Show Mode)

Perfect for documentation or presentations. The terminal will automatically type and execute the provided sequence.

```svelte
<Terminal
  autoplay={[
    { command: "mkdir project" },
    { command: "touch project/index.js", delayAfter: 500 },
    { command: "ls -la" }
  ]}
  typingSpeed={80}
/>
```

## Theming

Svelte Bash allows comprehensive styling customization.

**Built-in Presets:**
- `dark` (default)
- `light`
- `dracula`
- `matrix`

**Custom Theme Object:**

```svelte
<Terminal
  theme={{
    background: '#1a1b26',
    foreground: '#a9b1d6',
    prompt: '#7aa2f7',
    cursor: '#c0caf5'
  }}
/>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `structure` | `FileStructure` | `{}` | Key-value pairs defining the virtual file system. |
| `commands` | `Record<string, Function>` | `{}` | Custom command handlers. |
| `theme` | `string` \| `Theme` | `'dark'` | Theme preset name or specific color object. |
| `user` | `string` | `'user'` | The username displayed in the prompt. |
| `machine` | `string` | `'machine'` | The machine name displayed in the prompt. |
| `welcomeMessage` | `string` \| `string[]` | `[]` | Message shown on initialization. |
| `autoplay` | `AutoplayItem[]` | `undefined` | Array of commands to execute automatically. |
| `typingSpeed` | `number` | `50` | Default typing speed for autoplay (ms). |
| `readonly` | `boolean` | `false` | If true, user input is disabled. |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `FileStructure` | Fired when the filesystem is modified (mkdir, rm, etc). |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Yusuf Cengiz](https://github.com/YusufCeng1z)

interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const Terminal: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    commands?: Record<string, import("./types").CommandHandler> | undefined;
    structure?: import("./types").FileStructure | undefined;
    theme?: string | import("./types").Theme | undefined;
    welcomeMessage?: string | string[] | undefined;
    user?: string | undefined;
    promptStr?: string | undefined;
    autoplay?: {
        command: string;
        output?: string | string[] | import("svelte").Component;
    }[] | undefined;
    autoplayLoop?: boolean | undefined;
    typingSpeed?: number | undefined;
    bootplay?: {
        output: string | string[] | import("svelte").Component;
        delay?: number;
    }[] | undefined;
    bootplayLoop?: boolean | undefined;
    bootSpeed?: number | undefined;
    class?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Terminal = InstanceType<typeof Terminal>;
export default Terminal;

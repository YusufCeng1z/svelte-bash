import type { FileStructure } from './types';
export declare function resolvePath(structure: FileStructure, cwdParts: string[], targetPath: string): {
    node: string | FileStructure | undefined;
    name: string;
};

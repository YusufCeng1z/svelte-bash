export function resolvePath(structure, cwdParts, targetPath) {
    if (targetPath === '/') {
        return { node: structure, name: '' };
    }
    const parts = targetPath.split('/');
    let currentParts = [...cwdParts];
    let pointer = structure;
    // Navigate to CWD first
    for (const p of currentParts) {
        if (pointer[p] && typeof pointer[p] === 'object') {
            pointer = pointer[p];
        }
    }
    if (pointer[targetPath]) {
        return { node: pointer[targetPath], name: targetPath };
    }
    if (targetPath === '..') {
        return { node: undefined, name: targetPath };
    }
    return { node: undefined, name: targetPath };
}

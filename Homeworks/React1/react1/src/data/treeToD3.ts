import { Node } from "./types/Node";

export function convertToD3(node: Node | null): any {
    if (!node) return null;

    return {
        name: node.value.toString(),
        children: [
            convertToD3(node.left),
            convertToD3(node.right),
        ].filter(Boolean),
    };
}
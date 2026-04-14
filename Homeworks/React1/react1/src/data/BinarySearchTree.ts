import { Node } from "./types/Node";

export class BinarySearchTree {
    root: Node | null;

    constructor() {
      this.root = null;
    }

    insert(value: number) {
        const newNode = new Node(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
      
        let current = this.root;
      
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
            current = current.left;
          } else {
            if (!current.right) {
                current.right = newNode;
                return;
            }
            current = current.right;
          }
        }
    }

    preOrder(node: Node | null, result: number[] = []): number[] {

        if (!node) return result;       
        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);      
        return result;
    }

    inOrder(node: Node | null, result: number[] = []): number[] {

        if (!node) return result;
        
        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
        
        return result;
    }

    postOrder(node: Node | null, result: number[] = []): number[] {
        
        if (!node) return result;
        
        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.value);
        
        return result;
    }

    search(value: number): boolean {
        let current = this.root;

        while (current) {
            if (value === current.value) return true;
            
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
    
        return false;
    }       
}
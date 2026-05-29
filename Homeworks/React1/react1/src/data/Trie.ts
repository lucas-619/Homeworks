export class TrieNode {
  children: Map<string, TrieNode>;
  productName: string | null; // nombre completo si este nodo es el final de una palabra

  constructor() {
    this.children = new Map();
    this.productName = null;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Inserta un producto (el nombre se usa como clave, se guarda el string original)
  insert(productName: string): void {
    const lowerName = productName.toLowerCase();
    let node = this.root;
    for (const char of lowerName) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.productName = productName; // guardamos el nombre con su casing original
  }

  // Retorna el nodo asociado a un prefijo (en minúsculas)
  private getNode(prefix: string): TrieNode | null {
    const lowerPrefix = prefix.toLowerCase();
    let node = this.root;
    for (const char of lowerPrefix) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char)!;
    }
    return node;
  }

  // Recoge todos los nombres de productos desde un nodo dado
  private collectProducts(node: TrieNode): string[] {
    const results: string[] = [];
    if (node.productName !== null) {
      results.push(node.productName);
    }
    for (const child of node.children.values()) {
      results.push(...this.collectProducts(child));
    }
    return results;
  }

  // Devuelve todos los productos que empiezan con el prefijo dado
  getAllProductsWithPrefix(prefix: string): string[] {
    const startNode = this.getNode(prefix);
    if (!startNode) return [];
    return this.collectProducts(startNode);
  }
}
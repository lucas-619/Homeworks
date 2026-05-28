export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  title: string | null;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.title = null;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(title: string): void {
    if (!title.trim()) return;
    let node = this.root;
    const lowerTitle = title.toLowerCase();
    
    for (const char of lowerTitle) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    
    node.isEndOfWord = true;
    node.title = title;
  }

  search(title: string): boolean {
    if (!title.trim()) return false;
    let node = this.root;
    const lowerTitle = title.toLowerCase();
    
    for (const char of lowerTitle) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    
    return node.isEndOfWord;
  }

  startsWith(prefix: string): string[] {
    if (!prefix.trim()) return [];
    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();
    
    for (const char of lowerPrefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }
    
    const suggestions: string[] = [];
    this.collectWords(node, suggestions);
    return suggestions;
  }

  private collectWords(node: TrieNode, suggestions: string[]): void {
    if (node.isEndOfWord && node.title !== null) {
      suggestions.push(node.title);
    }
    
    for (const childNode of node.children.values()) {
      this.collectWords(childNode, suggestions);
    }
  }
}
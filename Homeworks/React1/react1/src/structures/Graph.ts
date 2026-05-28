export class Graph {
  private adjacencyList: Map<number, Set<number>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(nodeId: number): void {
    if (!this.adjacencyList.has(nodeId)) {
      this.adjacencyList.set(nodeId, new Set());
    }
  }

  addEdge(node1: number, node2: number): void {
    this.addNode(node1);
    this.addNode(node2);
    this.adjacencyList.get(node1)!.add(node2);
    this.adjacencyList.get(node2)!.add(node1);
  }

  getNeighbors(nodeId: number): number[] {
    return this.adjacencyList.has(nodeId) 
      ? Array.from(this.adjacencyList.get(nodeId)!)
      : [];
  }

  removeNode(nodeId: number): void {
    if (!this.adjacencyList.has(nodeId)) return;
    
    const neighbors = this.getNeighbors(nodeId);
    for (const neighbor of neighbors) {
      this.adjacencyList.get(neighbor)?.delete(nodeId);
    }
    this.adjacencyList.delete(nodeId);
  }

  hasNode(nodeId: number): boolean {
    return this.adjacencyList.has(nodeId);
  }

  getNodes(): number[] {
    return Array.from(this.adjacencyList.keys());
  }
}
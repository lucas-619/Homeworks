import type {node} from "./types/node";

export class Graph {
    nodes: node[];
    adjList: Record<string, string[]>;

    constructor(){
        this.nodes = [];
        this.adjList = {}; 
    }

    addNode(n: node): void {
        this.nodes.push(n);
        this.adjList[n.id] = [];
    }

    addEdge(id1: string, id2: string): void {
        this.adjList[id1].push(id2);
        this.adjList[id2].push(id1);
    }

    searchNode(id: string): node | undefined {
        return this.nodes.find(n => n.id === id);
    }

    printAdjacency(id: string): void {
        if (this.adjList[id]) {
            console.log(this.adjList[id]);
        }
    }

    printGraph(): void {
        console.log(this.adjList);
    }

    getPeopleByCity(cityId: string): node[] {
        return this.adjList[cityId]
            .map(id => this.searchNode(id))
            .filter((n): n is node => !!n && n.type === "person");
    }

    toD3Format() {
        return {
            nodes: this.nodes.map(n => ({
                id: n.id,
                label: n.name,
                color: n.type === "city" ? "blue" : "green"
            })),
            links: Object.entries(this.adjList).flatMap(([source, targets]) =>
                targets.map(target => ({
                        source,
                        target
                }))
                )
            };
    }
}
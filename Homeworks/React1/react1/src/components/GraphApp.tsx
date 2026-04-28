import { useState, useEffect, useRef } from "react";
import { Graph as D3Graph } from "react-d3-graph";
import { Graph } from "../data/graph";
import type {node} from "../data/types/node";

type GraphData = {
    nodes: {
        id: string;
        label?: string;
        color?: string;
    }[];
    links: {
        source: string;
        target: string;
    }[];
}; 

export default function GraphApp() {
    
    const [data, setData] = useState<GraphData>({
        nodes: [],
        links: []
    });
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [cityId, setCityId] = useState("");
    const graphRef = useRef(new Graph());
    const graph = graphRef.current;
    const [filterCity, setFilterCity] = useState("");
    

    useEffect(() => {    

        const cali: node = { id: "c1", type: "city", name: "Cali", age: null };
        const bogota: node = { id: "c2", type: "city", name: "Bogotá", age: null };
        const medellin: node = { id: "c3", type: "city", name: "Medellin", age: null };
        const cartagena: node = { id: "c4", type: "city", name: "Cartagena", age: null };
        const barrancamermeja: node = { id: "c5", type: "city", name: "Barrancamermeja", age: null };

        const juan: node = { id: "p1", type: "person", name: "Juan", age: 25 };
        const ana: node = { id: "p2", type: "person", name: "Ana", age: 30 };

        graph.addNode(cali);
        graph.addNode(bogota);
        graph.addNode(medellin);
        graph.addNode(cartagena);
        graph.addNode(barrancamermeja);
        graph.addNode(juan);
        graph.addNode(ana);

        graph.addEdge("p1", "c1");
        graph.addEdge("p2", "c1");

        setData(graph.toD3Format());
        
    }, []);

    const handleAddPerson = () => {
        if (!name || !age || !cityId) return;

        const newPerson : node = {
            id: "p" + Date.now(),
            type: "person",
            name,
            age: Number(age)
        };

        graph.addNode(newPerson);
        graph.addEdge(newPerson.id, cityId);

        setData(graph.toD3Format());

        setName("");
        setAge("");
    };

    const cities = graph.nodes.filter(n => n.type === "city");

    const filterGraphByCity = (cityId: string) => {
        const graph = graphRef.current;

        if (!cityId) {
            setData(graph.toD3Format());
            return;
        }

        const people = graph.getPeopleByCity(cityId);
        const cityNode = graph.searchNode(cityId);

        const nodes = [cityNode, ...people]
            .filter((n): n is node => !!n)
            .map(n => ({
                id: n.id,
                label: n.name,
                color: n.type === "city" ? "blue" : "green"
            }));

        const links = people.map(p => ({
            source: p.id,
            target: cityId
        }));

        setData({ nodes, links });
    };  

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
        
            {/* 🔹 FORMULARIO */}
            <div style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                alignItems: "center",
                flexWrap: "wrap",
                background: "#f5f5f5",
                padding: "15px",
                borderRadius: "10px"
            }}>
                <input
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
    
                <input
                    placeholder="Edad"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "80px" }}
                />
    
                <select
                    onChange={(e) => setCityId(e.target.value)}
                    style={{ padding: "8px", borderRadius: "5px" }}
                >
                    <option value="">Selecciona ciudad</option>
                    {cities.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                
                <button
                    onClick={handleAddPerson}
                    style={{
                        padding: "8px 15px",
                        borderRadius: "5px",
                        border: "none",
                        background: "#4CAF50",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Agregar
                </button>
            </div>
                
            {/* 🔹 FILTRO */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ marginRight: "10px", fontWeight: "bold" }}>
                    Filtrar por ciudad:
                </label>
                
                <select
                    onChange={(e) => {
                        const value = e.target.value;
                        setFilterCity(value);
                        filterGraphByCity(value);
                    }}
                    style={{ padding: "8px", borderRadius: "5px" }}
                >
                    <option value="">Ver todo</option>
                    {cities.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
                
            {/* 🔹 GRAFO */}
            <div style={{
                height: "500px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                background: "#fafafa"
            }}>
                <D3Graph
                    id="graph"
                    data={data}
                    config={{
                        nodeHighlightBehavior: true,
                        node: {
                            color: "lightgreen",
                            size: 400,
                            highlightStrokeColor: "blue",
                            labelProperty: "label",
                        },
                        link: {
                            highlightColor: "lightblue",
                        }
                    }}
                />
            </div>
        </div>
    );
}
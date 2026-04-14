import { useState } from "react";
import Tree from "react-d3-tree";
import { BinarySearchTree } from "../data/BinarySearchTree";
import { convertToD3 } from "../data/treeToD3";
import "../styles/TreeApp.css";

export default function TreeApp() {
    const [tree] = useState(new BinarySearchTree());
    const [input, setInput] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [result, setResult] = useState<string>("");
    const [treeData, setTreeData] = useState<any>(null);

    const handleInsert = () => {
        const num = Number(input);
        if (isNaN(num)) return;

        tree.insert(num);
        setInput("");
        setTreeData(convertToD3(tree.root));
    };

    const handleTraversal = (type: string) => {
        let res: number[] = [];

        if (type === "pre") res = tree.preOrder(tree.root);
        if (type === "in") res = tree.inOrder(tree.root);
        if (type === "post") res = tree.postOrder(tree.root);

        console.log(type.toUpperCase(), res);
        setResult(res.join(" - "));
    };

    const handleSearch = () => {
        const num = Number(searchValue);
        if (isNaN(num)) return;

        const found = tree.search(num);
        setResult(found ? "Encontrado ✅" : "No encontrado ❌");
    };

    return (
        <div className="page">
            
            {/* PANEL IZQUIERDO */}
            <div className="container">
                <h1 className="title">🌳 Binary Tree App</h1>

                {/* INSERTAR */}
                <div className="section">
                  <h3 className="subtitle">Insertar número</h3>
                  <div className="row">
                    <input
                      className="input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ej: 10"
                    />
                    <button className="primaryBtn" onClick={handleInsert}>
                      Insertar
                    </button>
                  </div>
                </div>

                {/* RECORRIDOS */}
                <div className="section">
                    <h3 className="subtitle">Recorridos</h3>
                    <div className="row">
                        <button className="secondaryBtn" onClick={() => handleTraversal("pre")}>
                            PreOrder
                        </button>
                        <button className="secondaryBtn" onClick={() => handleTraversal("in")}>
                            InOrder
                        </button>
                        <button className="secondaryBtn" onClick={() => handleTraversal("post")}>
                            PostOrder
                        </button>
                    </div>
                </div>

                {/* BUSCAR */}
                <div className="section">
                  <h3 className="subtitle">Buscar valor</h3>
                  <div className="row">
                    <input
                        className="input"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Ej: 7"
                    />
                    <button className="primaryBtn" onClick={handleSearch}>
                        Buscar
                    </button>
                  </div>
                </div>

                {/* RESULTADO */}
                {result && <div className="result">{result}</div>}
            </div>

            {/* ÁRBOL */}
            <div className="treeContainer">
                {treeData && (
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        translate={{ x: 400, y: 60 }}
                    />
                )}
            </div>
        </div>
    );
}
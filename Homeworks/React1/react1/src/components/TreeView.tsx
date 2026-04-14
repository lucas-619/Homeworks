import Tree from "react-d3-tree";
import { useEffect, useState } from "react";
import { BinarySearchTree } from "../data/BinarySearchTree";
import { convertToD3 } from "../data/treeToD3";

export default function TreeView() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const tree = new BinarySearchTree();
        
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        tree.insert(3);
        tree.insert(7);
        
        const d3Data = convertToD3(tree.root);
        setData(d3Data);
    }, []);

    return (
        <div style={{ width: "100%", height: "500px" }}>
            {data && <Tree data={data} orientation="vertical" />}
        </div>
    );
}
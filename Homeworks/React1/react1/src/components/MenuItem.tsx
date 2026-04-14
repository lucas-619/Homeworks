import type { MenuNode } from "../data/types/MenuNode";
import { useNavigate } from "react-router-dom";

type Props = {
    node: MenuNode;
};

export default function MenuItem({ node }: Props) {
    const navigate = useNavigate();

    return (
        <div style={{ marginLeft: "10px", marginTop: "5px" }}>

            <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(node.link)}
            >
                {node.title}
            </div>  

            {node.children &&
                node.children.map((child, index) => (
                    <MenuItem key={index} node={child} />
                ))}
        </div>
    );
}
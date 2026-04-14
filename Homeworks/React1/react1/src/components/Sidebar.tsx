import { menuTree } from "../data/menuTree";
import MenuItem from "./MenuItem.tsx";

export default function Sidebar() {
  return (
    <div style={{ width: "250px", background: "#222", color: "white", padding: "1rem" }}>
      <h3>Menu</h3>

      {menuTree.children?.map((node, index) => (
        <MenuItem key={index} node={node} />
      ))}
    </div>
  );
}
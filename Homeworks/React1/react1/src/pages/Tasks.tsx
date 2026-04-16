import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useArchivo } from "../hook/useArchivo";
import "../styles/tasks.scss";

export default function Files() {
  const auth = useContext(AuthContext);

  const [name, setName] = useState("");
  const [type, setType] = useState<"file" | "folder">("file");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  if (!auth) return null;

  const { user, logout } = auth;
  const { nodes, addNode, deleteNode, editNode, refresh } = useArchivo(user);

  //Construir árbol
  function buildTree(nodes: any[], parentId: string | null = null): any[] {
    return nodes
      .filter((node) => node.parentId === parentId)
      .map((node) => ({
        ...node,
        children: buildTree(nodes, node.id),
      }));
  }

  const tree = buildTree(nodes);

  const TreeNodeComponent = ({ node }: any) => {
    return (
      <div style={{ marginLeft: "20px" }}>

        <div className="task-item">

          {/* IZQUIERDA */}
          <div className="left">
            <span
              style={{ cursor: node.type === "folder" ? "pointer" : "default" }}
              onClick={() => {
                if (node.type === "folder") {
                  setSelectedParent(node.id);
                }
              }}
            >
              {node.type === "folder" ? "📁" : "📄"}
            </span>

            {editingId === node.id ? (
              <input
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            ) : (
              <span>{node.name}</span>
            )}

          </div>


          <div className="actions">

            {/* ➕ Crear hijo SOLO si es carpeta */}
            {node.type === "folder" && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedParent(node.id)}
              >
                ➕
              </button>
            )}

            {editingId === node.id ? (
              <button
                className="btn btn-success btn-sm"
                onClick={async () => {
                  await editNode(node.id, editName);
                  setEditingId(null);
                }}
              >
                💾
              </button>
            ) : (
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  setEditingId(node.id);
                  setEditName(node.name);
                }}
              >
                ✏️
              </button>
            )}

            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                await deleteNode(node.id);
              }}
            >
              ❌
            </button>
          </div>
        </div>

        {node.children.map((child: any) => (
          <TreeNodeComponent key={child.id} node={child} />
        ))}
      </div>
    );
  };

  return (
    <div className="tasks-container">
      <div className="tasks-card">

        {/* HEADER */}
        <div className="d-flex justify-content-between mb-3">
          <h3>Gestor de Archivos (Árbol n-ario)</h3>
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>

        {/* CREAR */}
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              selectedParent
                ? "Crear dentro de carpeta seleccionada"
                : "Crear en raíz"
            }
          />

          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value as "file" | "folder")}
          >
            <option value="file">Archivo</option>
            <option value="folder">Carpeta</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={async () => {
              if (!name.trim()) return;

              await addNode(name, type, selectedParent);

              setName("");
              setSelectedParent(null);

              await refresh();
            }}
          >
            Agregar
          </button>
        </div>

        {/* INFO */}
        {selectedParent && (
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            Creando dentro de carpeta seleccionada
          </p>
        )}

        {/* 🌳 ÁRBOL */}
        {tree.map((node) => (
          <TreeNodeComponent key={node.id} node={node} />
        ))}

      </div>
    </div>
  );
}
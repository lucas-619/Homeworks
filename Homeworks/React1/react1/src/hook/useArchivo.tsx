import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

export type NodeType = "file" | "folder";

export interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  userId: string;
}

export function useArchivo(user: any) {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  const nodesRef = collection(db, "nodes");

  // 🔹 Obtener nodos del usuario
  const getNodes = async () => {
    if (!user) return;

    const q = query(nodesRef, where("userId", "==", user.uid));
    const data = await getDocs(q);

    const list: TreeNode[] = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<TreeNode, "id">),
    }));

    setNodes(list);
  };

  // 🔹 Obtener nodos por parentI
  const getNodesByParentId = async (parentId: string | null) => {
    if (!user) return;

    const q = query(nodesRef, where("userId", "==", user.uid), where("parentId", "==", parentId));
    const data = await getDocs(q);

    const list: TreeNode[] = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<TreeNode, "id">),
    }));

    return list;
  };

  // 🔹 Crear nodo
  const addNode = async (
    name: string,
    type: NodeType,
    parentId: string | null
  ) => {
    if (!user) return;

    await addDoc(nodesRef, {
      name,
      type,
      parentId,
      userId: user.uid,
    });
  };

  // 🔹 Editar nodo
  const editNode = async (id: string, newName: string) => {
    const ref = doc(db, "nodes", id);

    await updateDoc(ref, {
      name: newName,
    });

    getNodes();
  };

  // 🔹 Eliminar nodo
  const deleteNode = async (id: string) => {
    const ref = doc(db, "nodes", id);

    const hijos = await getNodesByParentId(id);

    if (hijos && hijos.length > 0) {
     for (const hijo of hijos) {
        await deleteNode(hijo.id);
      }
    }

    await deleteDoc(ref);

    getNodes();
  };

  useEffect(() => {
    getNodes();
  }, [user]);

  return {
  nodes,
  addNode,
  editNode,
  deleteNode,
  getNodesByParentId,
  refresh: getNodes,
  };
}
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

export function useTasks(user: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  const tasksRef = collection(db, "tasks");

  // 🔹 Obtener tareas
  const getTasks = async () => {
    if (!user) return;

    const q = query(tasksRef, where("userId", "==", user.uid));
    const data = await getDocs(q);

    const tasksList = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(tasksList);
  };

  // 🔹 Crear tarea
  const addTask = async (text: string) => {
    await addDoc(tasksRef, {
      text,
      userId: user.uid,
      completed: false,
    });

    getTasks(); // refrescar
  };

  // 🔹 Toggle completed
  const toggleTask = async (id: string, completed: boolean) => {
    const taskDoc = doc(db, "tasks", id);

    await updateDoc(taskDoc, {
      completed: !completed,
    });

    getTasks();
  };

  // 🔹 Editar tarea
  const editTask = async (id: string, newText: string) => {
    const taskDoc = doc(db, "tasks", id);

    await updateDoc(taskDoc, {
      text: newText,
    });

    getTasks();
  };

  // 🔹 Eliminar tarea
  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);

    getTasks(); // refrescar
  };

  useEffect(() => {
    getTasks();
  }, [user]);

  return { tasks, addTask, deleteTask, toggleTask, editTask };
}
import { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  QueryConstraint,
  type DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";

// 🔹 Tipo para filtros
type Filter = [string, any, any];

// 🔹 Tipo genérico para documentos
type WithId<T> = T & { id: string };

const useCollection = <T extends DocumentData>(table: string) => {
  const [results, setResults] = useState<WithId<T>[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔍 GET ALL
  const getAll = async (filters: Filter[] = []): Promise<WithId<T>[]> => {
    setIsPending(true);
    setError(null);

    try {
      let q = query(collection(db, table));

      for (const [field, op, value] of filters) {
        q = query(q, where(field, op, value) as QueryConstraint);
      }

      const snapshot = await getDocs(q);

      const docs: WithId<T>[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot) =>
          ({
            id: doc.id,
            ...(doc.data() as T)
          })
      );

      setResults(docs);
      setIsPending(false);
      return docs;

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setIsPending(false);
      return [];
    }
  };

  // ➕ ADD
  const add = async (data: T) => {
    setIsPending(true);
    setError(null);

    try {
      const ref = await addDoc(collection(db, table), {
        ...data,
        createdAt: serverTimestamp()
      });

      setIsPending(false);
      return ref;

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setIsPending(false);
      return null;
    }
  };

  // ✏️ UPDATE
  const update = async (id: string, data: Partial<T>) => {
    setIsPending(true);
    setError(null);

    try {
      await updateDoc(doc(db, table, id), {
        ...data,
        updatedAt: serverTimestamp()
      });

      setIsPending(false);
      return true;

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setIsPending(false);
      return false;
    }
  };

  // ❌ DELETE
  const remove = async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      await deleteDoc(doc(db, table, id));
      setIsPending(false);
      return true;

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setIsPending(false);
      return false;
    }
  };

  return { results, isPending, error, getAll, add, update, remove };
};

export default useCollection;
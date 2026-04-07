import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import { auth } from "../firebase/config";

export function useAuthFirebase() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
    };

    const register = async (email: string, password: string) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        setUser(res.user);
     };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return { user, login, register, logout };
}
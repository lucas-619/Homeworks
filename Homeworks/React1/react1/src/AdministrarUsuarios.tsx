import {useState, useEffect, useRef} from "react";
import type { Usuario } from "./usuario.ts";
import Queue from "./queue.ts";
import AddUsuario from "./addUsuario.tsx";
import ListarUsuarios from "./listarUsuarios.tsx"

export default function AdministrarUsuarios(){

    const [usuarios, setUsuario] = useState<any[]>([]);
    const lista = useRef(new Queue());

    useEffect(()=>{

        if(lista.current.size() === 0){

            lista.current.enqueue(
                {
                    nombre : "Arturo Calle",
                    monto : 120000,
                    time : new Date(2026, 2, 17, 14, 30)
                }
            )
            lista.current.enqueue(
                {
                    nombre : "Vicky Davila",
                    monto : 1200000,
                    time : new Date(2026, 2, 17, 15, 30)
                }
            )
            lista.current.enqueue(
                {
                    nombre : "Frisby",
                    monto : 12000000,
                    time : new Date(2026, 2, 17, 16, 30)
                }
            )
        }
        
        setUsuario([...lista.current.item]);

    }, []);

    
    const addUsario = (nombre:string, monto:number, time:Date) => {
        const newLibro: Usuario = {
            nombre,
            monto,
            time     
        };

        lista.current.enqueue(newLibro);
        setUsuario([...lista.current.item]);
    }
   
    const atenderUsuario = () => {
        lista.current.dequeue();
        setUsuario([...lista.current.item]);
    }
    
    return (
        <>
            <h1>Añadir Usuario</h1>
            <AddUsuario onAdd={addUsario}/>
            <br></br>
            <button 
                onClick={atenderUsuario}>
                    Atender Al Primer Usuario
            </button>
            <ListarUsuarios Usuarios={usuarios}/>
        </>
    );

}
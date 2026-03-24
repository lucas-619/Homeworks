import {useState, useEffect, useContext, useRef} from "react";
import type { Usuario } from "./Page 2/usuario.ts";
import Queue from "./Page 2/queue.ts";
import AddUsuario from "./Page 2/addUsuario.tsx";
import ListarUsuarios from "./Page 2/listarUsuarios.tsx"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./MyContext";

export default function AdministrarUsuarios(){

    const [usuarios, setUsuario] = useState<any[]>([]);
    const lista = useRef(new Queue());
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

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
        const newUsuario: Usuario = {
            nombre,
            monto,
            time     
        };

        lista.current.enqueue(newUsuario);
        setUsuario([...lista.current.item]);
        console.log("DESPUÉS:", lista.current.item);
    }
   
    const atenderUsuario = () => {
        lista.current.dequeue();
        setUsuario([...lista.current.item]);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    
    return (
        <>
            <button onClick={() => handleLogout()}>Logout</button>
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
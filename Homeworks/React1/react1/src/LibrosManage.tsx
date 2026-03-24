import {useState, useEffect, useContext, useRef} from "react";
import Stack from "./Page1/Stacks.ts";
import type { Libro } from "./Page1/Libro.ts";
import AddLibro from "./Page1/AddLibro.tsx";
import LibrosDisponibles from "./Page1/LibrosDisponibles.tsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./MyContext";

function LibrosManage() {
    
    const [libros, setLibros] = useState<any[]>([]);
    const lista = useRef(new Stack());
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    //Libros Iniciales
    useEffect(() =>{

        if(lista.current.size() === 0){


            lista.current.push(
                {
                    nombre: "20mil Leguas de Viaje Submarino",
                    isbn: "0001 00001 00002",
                    autor: "Julio Verne",
                    editorial: "Norma"
                }
            )

            lista.current.push(
                {
                    nombre: "El Viaje al Centro De La Tierra",
                    isbn: "0001 00001 00002",
                    autor: "Julio Verne",
                    editorial: "Norma"
                }
            )

            lista.current.push(
                {
                    nombre: "Petro: Heroe O Villano",
                    isbn: "0003 00003 00003",
                    autor: "Laura Campo",
                    editorial: "Norma"
                }
            )
            setLibros([...lista.current.item]);
        }

    },[]);

    const addLibro = (nombre:string, isbn:string, autor:string, editorial:string) => {
        const newLibro: Libro = {
            nombre,
            isbn,
            autor,
            editorial      
        };

        lista.current.push(newLibro);
        setLibros([...lista.current.item]);
    }

    const alquilarLibro = () => {
        lista.current.pop();
        setLibros([...lista.current.item]);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <button onClick={() => handleLogout()}>Logout</button>
            <h1> Añade un Libro</h1>
            <AddLibro onAdd={addLibro} />
            <LibrosDisponibles libros={libros} alquilar={alquilarLibro}/>
        </>
    );

}

export default LibrosManage;


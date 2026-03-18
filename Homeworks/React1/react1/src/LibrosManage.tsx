import {useState, useEffect, useRef} from "react";
import Stack from "./Stacks.ts";
import type { Libro } from "./Libro.ts";
import AddLibro from "./AddLibro.tsx";
import LibrosDisponibles from "./LibrosDisponibles.tsx";

function LibrosManage() {
    
    const [libros, setLibros] = useState<any[]>([]);
    const lista = useRef(new Stack());

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

    return (
        <>
            <h1> Añade un Libro</h1>
            <AddLibro onAdd={addLibro} />
            <LibrosDisponibles libros={libros} alquilar={alquilarLibro}/>
        </>
    );

}

export default LibrosManage;


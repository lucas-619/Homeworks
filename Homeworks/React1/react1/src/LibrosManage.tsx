import {useState, useEffect, useRef} from "react";
import Stack from "./Stacks.ts";

function LibrosManage() {
    
    const [Libro, setLibro] = useState<any>(null);
    const lista = useRef(new Stack());

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

        }

    },[]);


    return (
        <>
            <h1> Añade un Libro</h1>
        </>
    );

}

export default LibrosManage;


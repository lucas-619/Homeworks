import React, { useState } from "react";

interface Props{

    onAdd: (nombre:string, isbn:string, autor:string, editorial:string) => void;

}

export default function AddLibro({onAdd}: Props){

    const [nombre, setNombre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [autor, setAutor] = useState("");
    const [editorial, setEditorial] = useState("");

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        if(!nombre || !isbn || !autor || !editorial) return;

        onAdd(nombre, isbn, autor, editorial);

        setNombre("");
        setIsbn("");
        setAutor("");
        setEditorial("");
    };

    return(

        <form onSubmit={handleSubmit}>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={e=>setNombre(e.target.value)} 
            />
            <input
                placeholder="ISBN"
                value={isbn}
                onChange={e=>setIsbn(e.target.value)} 
            />
            <input
                placeholder="Autor"
                value={autor}
                onChange={e=>setAutor(e.target.value)} 
            />
            <input
                placeholder="Editorial"
                value={editorial}
                onChange={e=>setEditorial(e.target.value)} 
            />
            
            <button type="submit">Agregar</button>
        </form>
    );
}
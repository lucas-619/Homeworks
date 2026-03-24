import React, { useState } from "react";

interface Props{

    onAdd: (nombre:string, monto:number, time:Date) => void;

}

export default function AddUsuario({onAdd}: Props){

    const [nombre, setNombre] = useState("");
    const [monto, setMonto] = useState(0);
    const [time, setTime] = useState(new Date());

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        if(!nombre || !monto || !time) return;

        onAdd(nombre, monto, time);

        setNombre("");
        setMonto(0);
        setTime(new Date());
    };

    return(

        <form onSubmit={handleSubmit}>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={e=>setNombre(e.target.value)} 
            />
            <input
                placeholder="Monto"
                type="Number"
                onChange={e=>setMonto(e.target.valueAsNumber)} 
            />
            <input
                type="datetime-local"
                onChange={e => setTime(e.target.valueAsDate || new Date())}
            />
            
            <button type="submit">Agregar</button>
        </form>
    );
}
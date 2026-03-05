import { useState, useEffect, useRef } from "react";
import { LinkedList } from "./LinkedList";
import ListaVehiculosDisponibles from "./ListaVehiculosDisponibles";
import { DoublyLinkedList } from "./DoublyLinkedList";
import ListaHistorialAlquileres from "./ListaHistorialAlquileres";
import { CircularLinkedList } from "./CircularLinkedList";
import VehiculoDestacado from "./VehiculoDestacado";

function vehiculosManage() {

    const [head, setHead] = useState<any>(null);
    const lista = useRef(new LinkedList());
    const historial = useRef(new DoublyLinkedList());
    const [historialHead, setHistorialHead] = useState<any>(null);
    const alquilarVehiculo = (vehiculo: any) => {

        lista.current.remove(vehiculo);
        setHead(lista.current.head);

        historial.current.append(vehiculo);
        setHistorialHead(historial.current.head);
    };
    const destacados = useRef(new CircularLinkedList());
    const [vehiculoDestacado, setVehiculoDestacado] = useState<any>(null);

    useEffect(() => {

        if (lista.current.length === 0) {

            lista.current.append(
            {
                modelo: "Picantico",
                año: 2010,
                placa: "ADO 001"
            }
            );
            lista.current.append(
            {
                modelo: "Spark Gt",
                año: 2000,
                placa: "BOC 402"
            }
            );

            setHead(lista.current.head);
        }

        if (destacados.current.length === 0) {
            
            destacados.current.append({

                modelo: "Tracker",
                año: 2022,
                placa: "CUL 003"

            });
        
            destacados.current.append({

                modelo: "Captiva",
                año: 2026,
                placa: "DED 004"

            });

            destacados.current.append({

                modelo: "Chery QQ",
                año: 2006,
                placa: "ELO 735"

            });
        
            setVehiculoDestacado(destacados.current.head);
        }

    }, []);

    useEffect(() => {

        if (!vehiculoDestacado) return;

        const interval = setInterval(() => {
            setVehiculoDestacado((prev: { next: any; }) => prev.next);
        }, 5000);

        return () => clearInterval(interval);

    }, [vehiculoDestacado]);

    return (
        <>
            <h1>Lista de Vehículos Disponibles</h1>
            <ListaVehiculosDisponibles head={head} removeVehiculoDisponible={alquilarVehiculo} />
            <ListaHistorialAlquileres head={historialHead} />
            <VehiculoDestacado node={vehiculoDestacado} />
        </>
    );
}   

export default vehiculosManage; //Nota, el nombre a veces me funciona a veces no, a veces funciona con minuscula otras veces no, 
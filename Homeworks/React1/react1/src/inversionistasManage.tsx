import { useState, useEffect, useRef } from "react";
import { CircularDoublyLinkedList } from "./CircularDoublyLinkedList";
import ListaInversionistas from "./ListaInversionistas";

function inversionistasManage() {
    
    const inversionistas = useRef(new CircularDoublyLinkedList());
    const [inversionistaActual, setInversionistaActual] = useState<any>(null);
    const siguienteInversionista = () => {
        setInversionistaActual((prev: { next: any; }) => prev.next);
    };

    const anteriorInversionista = () => {
        setInversionistaActual((prev: { prev: any; }) => prev.prev);
    };

    useEffect(() => {
    
        if (inversionistas.current.length === 0) {

            inversionistas.current.append({
                nombre: "Carlos Pérez",
                edad: 50
            });
        
            inversionistas.current.append({
                nombre: "Selene Delgado",
                edad: 35
            });
        
            inversionistas.current.append({
                nombre: "Miguel Torres",
                edad: 45
            });
        
            setInversionistaActual(inversionistas.current.head);
        }
        
    }, []);

    return (
        <>

            <ListaInversionistas node={inversionistaActual} siguiente={siguienteInversionista} anterior={anteriorInversionista} />

        </>
    );

}

export default inversionistasManage;
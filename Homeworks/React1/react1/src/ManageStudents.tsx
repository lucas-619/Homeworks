import { useState, useEffect, useRef } from "react";
import { LinkedList } from "./LinkedList";
import StudentList from "./StudentList";

function ManageStudents() {
    const [head, setHead] = useState<any>(null);
    const lista = useRef(new LinkedList());
    const removeStudent = (student: any) => { lista.current.remove(student); setHead(lista.current.head); };
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [codigo, setCodigo] = useState("");
    const addStudent = () => {

        if (!nombre || !edad || !codigo) return;

        lista.current.append({
            nombre,
            edad: Number(edad),
            codigo
        });
      
        setHead(lista.current.head);
      
        // limpiar formulario
        setNombre("");
        setEdad("");
        setCodigo("");
    };

    useEffect(() => {

        if (lista.current.length === 0) {

            lista.current.append(
            {
            nombre: "Juan",
            edad: 20,
            codigo: "001"
            }
            );
            lista.current.append(
            {
            nombre: "María",
            edad: 22,
            codigo: "002"
            }
            );
            lista.current.append(
            {
            nombre: "Miguel",
            edad: 40,
            codigo: "003"
            }
            );
            setHead(lista.current.head);
        }

    }, []);

    useEffect(() => {
        console.log("La lista cambió");
        console.log("Head actual:", head);
    }, [head]);

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />

                <button onClick={addStudent}>
                    Agregar
                </button>
            </div>
            <h1>Lista de Estudiantes</h1>
            <StudentList head={head} removeStudent={removeStudent} />
        </>
    );
}   

export default ManageStudents;
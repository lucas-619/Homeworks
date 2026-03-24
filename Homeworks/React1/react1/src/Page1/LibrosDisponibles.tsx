interface Props {
    libros: any[];
    alquilar: () => void; 
}

export default function LibrosDisponibles({ libros, alquilar }: Props) {

    return (
        <div>
            
            <h2>Libros en Pila:</h2>

            {
                [...libros].reverse().map((libro, index) => (
                    
                    <div key={index}>

                        <p>Nombre: {libro.nombre}</p>
                        <p>ISBN: {libro.isbn}</p>
                        <p>Autor: {libro.autor}</p>
                        <p>Editorial: {libro.editorial}</p>
                        {
                            index === 0 && (
                           <button onClick={alquilar}>
                                Alquilar
                            </button>
                        )
                        }
                        <hr />

                    </div>
                ))
            }

        </div>
    );
}
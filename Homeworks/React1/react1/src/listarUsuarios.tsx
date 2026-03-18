interface Props {
    Usuarios: any[];
}

export default function ListarUsuarios({ Usuarios}: Props) {

    return (
    
        <div>
            
            <h2>Usuarios en Fila:</h2>

            {
                [...Usuarios].map((usuario, index) => (
                    
                    <div key={index}>

                        <p>Nombre: {usuario.nombre}</p>
                        <p>Monto: ${usuario.monto.toString()}</p>
                        <p>Fecha: {usuario.time.toLocaleString()}</p>
                        <hr />

                    </div>
                ))
            }

        </div>
    );
}
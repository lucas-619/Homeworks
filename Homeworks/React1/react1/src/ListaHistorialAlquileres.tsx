interface Props {
  head: any;
}

function ListaHistorialAlquileres({ head }: Props) {

    let current = head;
    const elements = [];

    while (current !== null) {

        const vehiculoData = current.value;
        
        elements.push(
            <div key={vehiculoData.placa}>
                <p>Modelo: {vehiculoData.modelo}</p>
                <p>Año: {vehiculoData.año}</p>
                <p>Placa: {vehiculoData.placa}</p>
                <hr />
            </div>
        );

        current = current.next;
    }

    return (
        <div>
            <h2>Historial de Alquileres</h2>
            {elements}
        </div>
    );
}   

export default ListaHistorialAlquileres;
interface Props {
    head: any;
    removeVehiculoDisponible: (vehiculo: any) => void;
};

function ListaVehiculosDisponibles({ head, removeVehiculoDisponible }: Props) {

    let current = head;

    const elements = [];

    while (current !== null) {

        const vehiculoData = current.value; 

        elements.push(

            <div key={vehiculoData.placa}>

                <p>Modelo: {vehiculoData.modelo}</p>
                <p>Año: {vehiculoData.año}</p>
                <p>Placa: {vehiculoData.placa}</p>

                <button onClick={() => removeVehiculoDisponible(vehiculoData)}>
                    Alquilar
                </button>

                <hr />
            </div>
        );

        current = current.next;
    }

      return (
            <div>
                <h2>Vehículos Disponibles:</h2>
                {elements}
            </div>
      );
}

export default ListaVehiculosDisponibles;
interface Props {
  node: any;
}

function VehiculoDestacado({ node }: Props) {

  if (!node) return null;

  const vehiculo = node.value;

  return (
    <div>
      <h2>Vehículo Destacado</h2>
      <p>Modelo: {vehiculo.modelo}</p>
      <p>Año: {vehiculo.año}</p>
      <p>Placa: {vehiculo.placa}</p>
    </div>
  );
}

export default VehiculoDestacado;
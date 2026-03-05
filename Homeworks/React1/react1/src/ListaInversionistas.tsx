interface Props {
  node: any;
  siguiente: () => void;
  anterior: () => void;
}

function ListaInversionistas({ node, siguiente, anterior }: Props) {

  if (!node) return null;

  const inversionista = node.value;

  return (
    <div>
      <h2>Inversionista Activo</h2>

      <p>Nombre: {inversionista.nombre}</p>
      <p>edad: {inversionista.edad}</p>

      <button onClick={anterior}>Anterior</button>
      <button onClick={siguiente}>Siguiente</button>
    </div>
  );
}

export default ListaInversionistas;
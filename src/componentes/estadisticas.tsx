interface Boxpromps {
  titulo: string;
  numero: number;
}

function BoxEstadisticas(promps: Boxpromps) {
  const { titulo, numero } = promps;

  return (
    <div className="boxestadisticas">
      <h2>{titulo}</h2>
      <span>{numero}</span>
    </div>
  );
}

export default BoxEstadisticas;

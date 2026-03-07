import { useEffect, useRef, useState } from "react"
import { DoublyLinkedList } from "./DoubleLinkedList"

function HistorialPage() {

  const historial = useRef(new DoublyLinkedList())
  const [actual, setActual] = useState<any>(null)

  useEffect(() => {

    historial.current.append({
      titulo: "Google",
      url: "https://google.com"
    })

    historial.current.append({
      titulo: "YouTube",
      url: "https://youtube.com"
    })

    historial.current.append({
      titulo: "Wikipedia",
      url: "https://wikipedia.org"
    })

    setActual(historial.current.head)

  }, [])

  const siguiente = () => {
    if (actual?.next) {
      setActual(actual.next)
    }
  }

  const anterior = () => {
    if (actual?.prev) {
      setActual(actual.prev)
    }
  }

  if (!actual) return null

  return (
    <div>

      <h1>Historial Navegador</h1>

      <p>{actual.value.titulo}</p>
      <p>{actual.value.url}</p>

      <button onClick={anterior}>Atrás</button>
      <button onClick={siguiente}>Adelante</button>

    </div>
  )
}

export default HistorialPage
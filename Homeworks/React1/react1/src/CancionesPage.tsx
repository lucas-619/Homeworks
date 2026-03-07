import { useEffect, useRef, useState } from "react"
import { LinkedList } from "./LinkedList"

function CancionesPage() {

  const lista = useRef(new LinkedList())
  const [actual, setActual] = useState<any>(null)

  useEffect(() => {

    lista.current.append({
      titulo: "Blinding Lights",
      artista: "The Weeknd",
      duracion: "3:20"
    })

    lista.current.append({
      titulo: "Levitating",
      artista: "Dua Lipa",
      duracion: "3:23"
    })

    lista.current.append({
      titulo: "As It Was",
      artista: "Harry Styles",
      duracion: "2:47"
    })

    setActual(lista.current.head)

  }, [])

  const siguiente = () => {
    if (actual?.next) {
      setActual(actual.next)
    }
  }

  if (!actual) return null

  return (
    <div>

      <h1>Reproductor</h1>

      <p>{actual.value.titulo}</p>
      <p>{actual.value.artista}</p>
      <p>{actual.value.duracion}</p>

      <button onClick={siguiente}>
        Siguiente canción
      </button>

    </div>
  )
}

export default CancionesPage
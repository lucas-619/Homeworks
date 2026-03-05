import type { vehiculo } from "./Vehiculo"

class Node {

    value: vehiculo
    next: Node | null

    constructor(value: vehiculo) {

        this.value = value
        this.next = null

    }
}

export { Node }
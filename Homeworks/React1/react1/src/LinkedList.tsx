import type { vehiculo } from "./Vehiculo"
import { Node} from "./Node"

class LinkedList {

    head: Node | null
    tail: Node | null
    length: number

    constructor() {

        this.head = null
        this.tail = null
        this.length = 0
        
    }

    append(value: vehiculo){

        const newNode = new Node(value)

        if (!this.head) {

            this.head = newNode

        } else {

            this.tail!.next = newNode
            
        }

        this.tail = newNode
        this.length++
    }

    remove(value: vehiculo) {

        if (!this.head) return

        if (this.head.value.modelo === value.modelo && 
            this.head.value.placa === value.placa && 
            this.head.value.año === value.año) {

            this.head = this.head.next;

            if (!this.head) {
                this.tail = null;
            }

            this.length--;
            return;
        }

        let current = this.head
        while (
          current.next &&
          (
            current.next.value.modelo !== value.modelo ||
            current.next.value.placa !== value.placa ||
            current.next.value.año !== value.año
          )
        ) {
          current = current.next;
        }

        if(current.next) {

            current.next = current.next.next;
            if(!current.next) this.tail = current;
            this.length--;

        }
    }

}

export { LinkedList }
import type { estudiante } from "./Estudiante"

class Node {

    value: estudiante
    next: Node | null

    constructor(value: estudiante) {

        this.value = value
        this.next = null

    }
}

class LinkedList {

    head: Node | null
    tail: Node | null
    length: number

    constructor() {

        this.head = null
        this.tail = null
        this.length = 0
        
    }

    append(value: estudiante){

        const newNode = new Node(value)

        if (!this.head) {

            this.head = newNode

        } else {

            this.tail!.next = newNode
            
        }

        this.tail = newNode
        this.length++
    }

    peak(value: estudiante, current = this.head) {

        while (current !== null) {

           if (current.value.nombre === value.nombre && current.value.edad === value.edad && current.value.codigo === value.codigo) {
                return current
           }

           current = current.next

        }

        return null
    }

    remove(value: estudiante) {

        if (!this.head) return

        if (this.head.value.nombre === value.nombre && 
            this.head.value.edad === value.edad && 
            this.head.value.codigo === value.codigo) {

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
            current.next.value.nombre !== value.nombre ||
            current.next.value.edad !== value.edad ||
            current.next.value.codigo !== value.codigo
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
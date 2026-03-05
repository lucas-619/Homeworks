import type { vehiculo } from "./Vehiculo";

class DoubleNode {

    value: vehiculo;
    next: DoubleNode | null;
    prev: DoubleNode | null;

    constructor(value: vehiculo) {

        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {

    head: DoubleNode | null;
    tail: DoubleNode | null;
    length: number;

    constructor() {
        
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value: vehiculo) {

        const newNode = new DoubleNode(value);

        if (!this.head) {

            this.head = newNode;
            this.tail = newNode;

        } else {

            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }

      this.length++;
    }

}

export { DoublyLinkedList };
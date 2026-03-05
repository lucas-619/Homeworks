import type { vehiculo } from "./Vehiculo";

class CircularNode {

    value: vehiculo;
    next: CircularNode | null;

    constructor(value: vehiculo) {

        this.value = value;
        this.next = null;

    }
}

class CircularLinkedList {

    head: CircularNode | null;
    tail: CircularNode | null;
    length: number;

    constructor() {

        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value: vehiculo) {

        const newNode = new CircularNode(value);

        if (!this.head) {

            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;

        } else {

            newNode.next = this.head;
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.length++;

    }   

}

export { CircularLinkedList };
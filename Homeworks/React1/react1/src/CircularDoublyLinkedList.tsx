class inversionista {
    nombre: string;
    edad: number;
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
}

class CircularDoubleNode {
    
    value: inversionista;
    next: CircularDoubleNode | null;
    prev: CircularDoubleNode | null;

    constructor(value: inversionista) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class CircularDoublyLinkedList {

    head: CircularDoubleNode | null;
    tail: CircularDoubleNode | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value: inversionista) {

        const newNode = new CircularDoubleNode(value);

        if (!this.head) {

            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;

        } else {

            newNode.prev = this.tail;
            newNode.next = this.head;

            this.tail!.next = newNode;
            this.head.prev = newNode;

            this.tail = newNode;
        }

        this.length++;

  }

}

export { CircularDoublyLinkedList };
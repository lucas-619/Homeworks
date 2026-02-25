
class Node {

    value: string
    next: Node | null

    constructor(value: string) {

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

    append(value: string){

        const newNode = new Node(value)

        if (!this.head) {

            this.head = newNode

        } else {

            this.tail!.next = newNode
            
        }

        this.tail = newNode
        this.length++
    }

    peak(value: string, current = this.head) {

        while (current !== null) {

           if (current.value === value) {
                return current
           }

           current = current.next

        }

        return null
    }


    
}

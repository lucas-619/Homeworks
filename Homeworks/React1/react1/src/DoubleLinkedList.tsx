import type { Pagina } from "./PaginaWeb"

class DoubleNode {

  value: Pagina
  next: DoubleNode | null
  prev: DoubleNode | null

  constructor(value: Pagina) {
    this.value = value
    this.next = null
    this.prev = null
  }

}

export class DoublyLinkedList {

  head: DoubleNode | null = null
  tail: DoubleNode | null = null

  append(value: Pagina) {

    const newNode = new DoubleNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {

      newNode.prev = this.tail
      this.tail!.next = newNode
      this.tail = newNode

    }

  }

}
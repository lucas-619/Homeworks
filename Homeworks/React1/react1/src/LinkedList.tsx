import type { Cancion } from "./cancion"

class Node {
  value: Cancion
  next: Node | null

  constructor(value: Cancion) {
    this.value = value
    this.next = null
  }
}

export class LinkedList {

  head: Node | null = null
  tail: Node | null = null
  length = 0

  append(value: Cancion) {

    const newNode = new Node(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      this.tail = newNode
    }

    this.length++
  }

}
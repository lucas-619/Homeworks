import {Libro} from "./Libro.ts"

export default class Stack {

    item: Libro[];
    constructor(){
        this.item=[];
    }

    push(value:Libro){
        this.item.push(value)
    }

    pop(){
        return this.item.length > 0 ? this.item.pop() : null;
    }

    size(){
        return this.item.length;
    }
}


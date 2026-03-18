import {Usuario} from "./usuario"

export default class Queue{

    item: Usuario[];

    constructor(){
        this.item = [];
    }

    enqueue(value: Usuario){
        this.item.push(value);
        this.item.sort((a,b) => a.time.getTime() - b.time.getTime()); //Orden automaricamente por orden de llegada
    }

    dequeue(){
        return this.item.length > 0 ? this.item.shift() : null;
    }

    size(){
        return this.item.length;
    }

}
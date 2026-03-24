class Usuario{

    nombre: String;
    monto: Number;
    time: Date;

    constructor(nombre:string, monto:number, time:Date){
        this.nombre = nombre;
        this.monto = monto;
        this.time = time;
    }
}

export {Usuario}
class Libro {

    nombre: string;
    isbn: string;
    autor: string;
    editorial: string;

    constructor(nombre: string, isbn: string, autor: string, editorial: string){
        this.nombre = nombre;
        this.isbn = isbn;
        this.autor = autor;
        this.editorial = editorial;
    }
    
}

export {Libro}
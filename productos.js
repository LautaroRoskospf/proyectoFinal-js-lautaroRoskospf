//clase producto
class Producto {
    constructor (id,nombre,precio,img){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
    }
}

//Objetos
const antiparra1 = new Producto(1, "Antiparras STRAY", 2000, "assets/img/antiparra1.png");
const antiparra2 = new Producto(2, "Antiparras RIET", 2500, "assets/img/antiparra2.png");
const antiparra3 = new Producto(3, "Antiparras MTB", 3000, "assets/img/antiparra3.png");
const bota1 = new Producto(4, "Botas COMP", 5000, "assets/img/bota1.png");
const bota2 = new Producto(5, "Botas YTH", 6000, "assets/img/bota2.png");
const bota3 = new Producto(6, "Botas INST", 7000, "assets/img/bota3.png");
const casco1 = new Producto(7, "Casco V3", 10000, "assets/img/casco1.png");
const casco2 = new Producto(8, "Casco V2", 12000, "assets/img/casco2.png");
const casco3 = new Producto(9, "Casco RS", 14000, "assets/img/casco3.png");
const guante1 = new Producto(10, "Guantes PAW", 4000, "assets/img/guante1.png");
const guante2 = new Producto(11, "Guantes AIR", 4500, "assets/img/guante2.png");
const pechera1 = new Producto(12, "Pechera RACE", 6700, "assets/img/pechera1.png");
const pechera2 = new Producto(13, "Pechera MX", 7400, "assets/img/pechera2.png");
const pechera3 = new Producto(14, "Pechera TITAN", 7900, "assets/img/pechera3.png");
const traje1 = new Producto(15, "Traje LT3", 9300, "assets/img/traje1.png");
const traje2 = new Producto(16, "Traje 360", 9800, "assets/img/traje2.png");
const traje3 = new Producto(17, "Traje MURC", 10200, "assets/img/traje3.png");
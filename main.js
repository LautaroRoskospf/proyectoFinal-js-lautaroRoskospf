//array con todo el catalogo de productos
const productos = [antiparra1,antiparra2,antiparra3,bota1,bota2,bota3,casco1,casco2,casco3,guante1,guante2,pechera1,pechera2,pechera3,traje1,traje2,traje3];

//array para el carrito
let carrito = [];

// cargar carrito desde localstorage
carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];

//modifico el DOM mostrando los productos
const contenedorProductos = document.getElementById("contenedorProductos");

// barra de busqueda
document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById('buscar');
    const contenedorProductos = document.getElementById('contenedorProductos');

    // resultados de busqueda
    inputBuscar.addEventListener('input', () => {
        const busqueda = inputBuscar.value.trim().toLowerCase();
        mostrarResultados(busqueda);
    });

    // funcion para mostrar resultados de busqueda
    const mostrarResultados = (busqueda) => {
        contenedorProductos.innerHTML = '';

        const resultados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda)
        );

        resultados.forEach(producto => {
            const card = document.createElement('div');
            card.innerHTML = `
            <div class="card">
            <img src = "${producto.img}" alt = "${producto.nombre}">
                <div class="datos-card">
                    <h2>${producto.nombre}</h2>
                    <p>$${producto.precio}</p>
                    <button id="boton${producto.id}" class="btnCard"> Comprar </button>
                </div>
            </div>
            `;
            contenedorProductos.appendChild(card);

            const boton = card.querySelector(`#boton${producto.id}`);
            boton.addEventListener('click', () => {
                agregarAlcarrito(producto.id);
            });
        });
    };
});

//funcion para mostrar productos
const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `
                        <div class="card">
                        <img src = "${producto.img}" alt = "${producto.nombre}">
                            <div class="datos-card">
                                <h2>${producto.nombre}</h2>
                                <p>$${producto.precio}</p>
                                <button id="boton${producto.id}" class="btnCard"> Comprar </button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(card);
        //agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlcarrito(producto.id);
        })
    })
}

mostrarProductos();

// funcion para actualizar el contador del carrito
const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById("contadorCarrito");
    const cantidadEnCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = cantidadEnCarrito.toString();
};


//funcion para agregar al carrito
const agregarAlcarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
        mostrarAlertaAgregado(productoEnCarrito);
    }else{
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        mostrarAlertaAgregado(producto);
    }

    actualizarContadorCarrito();
    calcularTotal();
    //localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// funcion para mostrar la alerta
const mostrarAlertaAgregado = (producto) => {
    Swal.fire({
        text: `Agregaste ${producto.nombre} al carrito`,
        imageUrl: producto.img,
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: producto.nombre,
    });
}

// modal para el carrito
const modalCarrito = document.getElementById("ventanaModalCarrito");
const btnCarritoMod = document.getElementById("verCarrito");
const spanCarritoMod = document.getElementsByClassName("cerrarModalCarrito")[0];

btnCarritoMod.addEventListener("click", () => {
    modalCarrito.style.display = "block";
    mostrarCarrito();
    actualizarContadorCarrito();
});
spanCarritoMod.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});
window.addEventListener("click", (event) => {
    if (event.target == modalCarrito) {
    modalCarrito.style.display = "none";
    }
});

//contenido del modal carrito
const contenedorCarrito = document.getElementById("contenedorCarrito");

//funcion para mostrar carrito
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML =`
                        <td>
                            <div class="imgModal">
                                <img src="${producto.img}" alt="${producto.nombre}">
                            </div>
                        </td>
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio}</td>
                        <td><button id="restar${producto.id}" class="btnCard"> - </button></td>
                        <td>${producto.cantidad}</td>
                        <td><button id="sumar${producto.id}" class="btnCard"> + </button></td>
                        <td><button id="eliminar${producto.id}" class="btnEliminarProd"> Eliminar </button></td>
                        `
        contenedorCarrito.appendChild(tr);

        //restar cantidad de productos
        const botonRestar = document.getElementById(`restar${producto.id}`);
        botonRestar.addEventListener("click", () => {
            restarCantidad(producto.id);
        })

        //sumar cantidad de productos
        const botonSumar = document.getElementById(`sumar${producto.id}`);
        botonSumar.addEventListener("click", () => {
            sumarCantidad(producto.id);
        })

        //elimino productos del carrito
        const botonEliminar = document.getElementById(`eliminar${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//funcion para restar cantidad del producto en carrito
const restarCantidad = (id) => {
    const productoEncarrito = carrito.find(producto => producto.id === id);
    if (productoEncarrito){
        if(productoEncarrito.cantidad > 1) {
            productoEncarrito.cantidad--;
        } else {
            const indice = carrito.indexOf(productoEncarrito);
            carrito.splice(indice, 1);
            //alerta de producto eliminado
        Swal.fire({
            text: `Eliminaste ${productoEncarrito.nombre} del carrito`,
            imageUrl: productoEncarrito.img,
            imageWidth: 120,
            imageHeight: 120,
            imageAlt: productoEncarrito.nombre,
    })
        }
        actualizarContadorCarrito();
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

//funcion para sumar cantidad del producto en carrito
const sumarCantidad = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarContadorCarrito();
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}



//funcion para eliminar producto del carrito
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    actualizarContadorCarrito();
    mostrarCarrito();
    //localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    //alerta de producto eliminado
    Swal.fire({
        text: `Eliminaste ${producto.nombre} del carrito`,
        imageUrl: producto.img,
        imageWidth: 120,
        imageHeight: 120,
        imageAlt: producto.nombre,
    })
}

//total de la compra
const total = document.getElementById("totalCompra");

//funcion para calcular total
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `${totalCompra}`;
} 

//vaciar carrito de compras
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

btnVaciarCarrito.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'El carrito ya está vacío',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        eliminarCarritoCompleto();
    //localStorage
    localStorage.clear();
    }
});

//funcion para eliminar el carrito
const eliminarCarritoCompleto = () => {
    carrito = [];
    actualizarContadorCarrito();
    mostrarCarrito();
    //localStorage
    localStorage.clear();
    //alerta vacio
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Vaciando carrito',
        showConfirmButton: false,
        timer: 1500
    });
}

// finalizar compra
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

//funcion para finalizar la compra
btnFinalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        //alerta de carrito vacío
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El carrito está vacío',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        carrito = [];
        mostrarCarrito();
        //localStorage
        localStorage.clear();

        // Alerta finalizar
        Swal.fire({
            title: 'Aguarde',
            html: 'Estamos preparando su pedido.',
            timer: 3500,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
});

// modal sesion

const botonIniciarSesion = document.getElementById("botonIniciarSesion");
const modalForm = document.getElementById("modal-form");

botonIniciarSesion.addEventListener("click", () => {
    modalForm.style.display = "block";
});

window.addEventListener("click", (event) => {
    if (event.target === modalForm) {
        modalForm.style.display = "none";
    }
});

//inicio de sesion
// Función para cargar el JSON de usuarios registrados
async function cargarUsuariosRegistrados() {
    const response = await fetch('usuarios.json');
    const usuariosRegistrados = await response.json();
    return usuariosRegistrados;
}

// funcion para verificar el inicio de sesion
async function verificarInicioSesion(usuario, contraseña) {
    const usuariosRegistrados = await cargarUsuariosRegistrados();

return new Promise((resolve, reject) => {
    setTimeout(() => {
        const usuarioEncontrado = usuariosRegistrados.find(
            u => u.usuario === usuario && u.contraseña === contraseña
        );

        if (usuarioEncontrado) {
            resolve(usuarioEncontrado);
            } else {
                reject(new Error("Datos incorrectos"));
            }
        }, 500);
    });
}

    // manejo del formulario
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", async event => {
        event.preventDefault();

        const usuarioInput = document.getElementById("usuario");
        const contraseñaInput = document.getElementById("contraseña");

        const usuario = usuarioInput.value;
        const contraseña = contraseñaInput.value;

        try {
            const usuarioAutenticado = await verificarInicioSesion(usuario, contraseña);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Bienvenido ${usuarioAutenticado.nombre} ${usuarioAutenticado.apellido}`,
                showConfirmButton: false,
                timer: 1700
            });
            contraseñaInput.value = '';
            usuarioInput.value = '';
            modalForm.style.display = "none";
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Datos incorrectos`,
                showConfirmButton: false,
                timer: 1500
            });
            contraseñaInput.value = '';
        }
    });

document.addEventListener("DOMContentLoaded", () => {
    let carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTableBody = document.getElementById('carrito-items');
    const totalgeneral = document.getElementById('total');
    let total = 0;

    function actualizarCarrito() {
        carritoTableBody.innerHTML = ''; 
        total = 0;

        carritoItemsStorage.forEach((item) => {
            const row = document.createElement('tr');

            const nombreCelda = document.createElement('td');
            nombreCelda.textContent = item.title;
            row.appendChild(nombreCelda);

            const precioCelda = document.createElement('td');
            precioCelda.textContent = `USD ${item.price}`;
            row.appendChild(precioCelda);

            const cantidadCelda = document.createElement('td');
            cantidadCelda.textContent = 1;
            row.appendChild(cantidadCelda);

            const subtotal = item.price;
            const subtotalCelda = document.createElement('td');
            subtotalCelda.textContent = `USD ${subtotal}`;
            row.appendChild(subtotalCelda);

            const eliminarCelda = document.createElement('td');
            const eliminarBoton = document.createElement('button');
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
            eliminarBoton.addEventListener('click', () => eliminarProducto(item.id));
            eliminarCelda.appendChild(eliminarBoton);
            row.appendChild(eliminarCelda);

            carritoTableBody.appendChild(row);

            total += subtotal;
        });

        totalgeneral.textContent = total.toFixed(2);
    }

    function eliminarProducto(id) {
        carritoItemsStorage = carritoItemsStorage.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(carritoItemsStorage)); 
        actualizarCarrito(); 
    }

    actualizarCarrito();

    document.getElementById('limpiar-carrito').addEventListener('click', () => {
        localStorage.removeItem('cart'); 
        window.location.href = 'index.html'; 
    });

    document.getElementById('finalizar-compra').addEventListener('click', () => {
        Swal.fire({
            title: 'Compra Procesada',
            text: 'Se ha procesado el ticket de compra correspondiente',
            icon: 'success',
            confirmButtonText: 'Continuar',
            customClass: {
                confirmButton: 'custom-swal-button'
            }
        });

        localStorage.removeItem('cart'); 
        
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 4000);     
    });
});
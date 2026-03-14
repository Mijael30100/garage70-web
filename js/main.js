// Seleccionamos el botón y el menú
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

// Le agregamos un evento de clic al botón
menuBtn.addEventListener('click', () => {
    // Esto agrega la clase 'activa' si no la tiene, y se la saca si la tiene
    sidebar.classList.toggle('activa');
});

// --- LÓGICA DEL CARRUSEL DE PRODUCTOS ---
// Primero verificamos si estamos en la página de productos
const track = document.getElementById('track');

if (track) {
    const items = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Arrancamos con el índice 1 como centro (el segundo producto)
    let indexCentro = 1; 

    function actualizarCarrusel() {
        // Sacamos la clase 'centro' a todos
        items.forEach(item => item.classList.remove('centro'));
        
        // Se la agregamos al que corresponde
        items[indexCentro].classList.add('centro');

        // Movemos el track. 
        // En PC (3 items), para centrar el índice 1, movemos 0.
        // La fórmula: -(indexCentro - 1) * 100 / cantidadVisible
        let porcentajeDesplazamiento;
        
        if (window.innerWidth <= 768) {
            // En móvil (1 item visible)
            porcentajeDesplazamiento = -(indexCentro) * 100;
        } else {
            // En PC (3 items visibles, cada uno es 33.333%)
            porcentajeDesplazamiento = -(indexCentro - 1) * 33.333;
        }

        track.style.transform = `translateX(${porcentajeDesplazamiento}%)`;
    }

    // Botón Siguiente
    nextBtn.addEventListener('click', () => {
        if (indexCentro < items.length - 2) { // Evita pasarse de largo al final
            indexCentro++;
            actualizarCarrusel();
        }
    });

    // Botón Anterior
    prevBtn.addEventListener('click', () => {
        if (indexCentro > 1) { // Evita pasarse de largo al inicio
            indexCentro--;
            actualizarCarrusel();
        }
    });

    // Ejecutamos una vez al cargar para acomodar la vista inicial
    actualizarCarrusel();
    
    // Si cambian el tamaño de la ventana, recalculamos
    window.addEventListener('resize', actualizarCarrusel);
}
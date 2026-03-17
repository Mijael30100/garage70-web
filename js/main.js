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
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    function reasignarCentro() {
        const currentItems = Array.from(track.children);
        currentItems.forEach(item => item.classList.remove('centro'));
        
        let centroIdx = 1;
        currentItems[centroIdx].classList.add('centro');
    }

    reasignarCentro();

    let enTransicion = false;

    nextBtn.addEventListener('click', () => {
        if (enTransicion) return;
        enTransicion = true;

        let desplazamiento = -33.3333;
        
        track.style.transition = 'transform 0.4s ease-in-out';
        track.style.transform = `translateX(${desplazamiento}%)`;

        const currentItems = Array.from(track.children);
        currentItems.forEach(item => item.classList.remove('centro'));
        let centroIdxFuturo = 2;
        currentItems[centroIdxFuturo].classList.add('centro');

        setTimeout(() => {
            track.style.transition = 'none';
            track.appendChild(track.firstElementChild);
            track.style.transform = 'translateX(0)';
            reasignarCentro();
            enTransicion = false;
        }, 400); 
    });

    prevBtn.addEventListener('click', () => {
        if (enTransicion) return;
        enTransicion = true;

        track.prepend(track.lastElementChild);
        
        track.style.transition = 'none';
        let desplazamiento = -33.3333;
        track.style.transform = `translateX(${desplazamiento}%)`;

        track.offsetHeight;

        track.style.transition = 'transform 0.4s ease-in-out';
        track.style.transform = 'translateX(0)';

        const currentItems = Array.from(track.children);
        currentItems.forEach(item => item.classList.remove('centro'));
        let centroIdxFuturo = 1;
        currentItems[centroIdxFuturo].classList.add('centro');

        setTimeout(() => {
            reasignarCentro();
            enTransicion = false;
        }, 400);
    });
    
    window.addEventListener('resize', () => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        reasignarCentro();
    });
}
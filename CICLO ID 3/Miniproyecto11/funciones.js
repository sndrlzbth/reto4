// Obtener el lienzo y su contexto
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Variables para rastrear el estado del ratón
let isPainting = false;

// Evento cuando se presiona el ratón
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('touchstart', startPainting);

function startPainting(event) {
    isPainting = true;
    draw(event);
}

// Evento cuando se mueve el ratón
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

function draw(event) {
    if (!isPainting) return;

    // Coordenadas del puntero
    let x, y;
    if (event.type === 'touchmove' || event.type === 'touchstart') {
        x = event.touches[0].clientX - canvas.offsetLeft;
        y = event.touches[0].clientY - canvas.offsetTop;
    } else {
        x = event.offsetX;
        y = event.offsetY;
    }

    // Dibujar en el lienzo
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000'; // Color de la línea

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Evento cuando se suelta el ratón
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('touchend', stopPainting);

function stopPainting() {
    isPainting = false;
    ctx.beginPath();
}

// Limpiar el lienzo
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Cuenta Regresiva
    function actualizarContador() {
        // Obtener la fecha actual
        const now = new Date();

        // Obtener siguiente año
        // Año actual + 1
        const nextYear = now.getFullYear() + 1;

        // Obtener fecha del proximo año
        const newYear = new Date(`January 1, ${nextYear} 00:00:00`);

        // Obtener la diferencia entre la fecha actual y la fecha del proximo año
        const timeDifference = newYear - now;

        // Obtener la cantidad de segundos en un dia, hora y minuto
        const secondsInADay = 24 * 60 * 60;
        const secondsInAnHour = 60 * 60;
        const secondsInAMinute = 60;

        // Convertir la diferencia en dias, horas, minutos y segundos
        const days = Math.floor(timeDifference / (1000 * secondsInADay));
        const hours = Math.floor((timeDifference % (1000 * secondsInADay)) / (1000 * secondsInAnHour));
        const minutes = Math.floor((timeDifference % (1000 * secondsInAnHour)) / (1000 * secondsInAMinute));
        const seconds = Math.floor((timeDifference % (1000 * secondsInAMinute)) / 1000);

        // Actualizar los elementos de la cuenta regresiva
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    // Actualizar la cuenta regresiva
    setInterval(actualizarContador, 1000);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start-btn');
    const resultDiv = document.getElementById('result');

    // Verifica si el navegador soporta la API de Reconocimiento de Voz
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        // No continúa escuchando una vez que se ha detectado la primera frase
        recognition.continuous = false; 
        // No muestra resultados intermedios
        recognition.interimResults = false; 
        recognition.lang = 'es-ES';

        recognition.onstart = () => {
            resultDiv.textContent = 'Escuchando...';
        };

        recognition.onerror = (event) => {
            resultDiv.textContent = `Error: ${event.error}`;
        };

        recognition.onend = () => {
            resultDiv.textContent = 'Presiona el botón para empezar a hablar.';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            resultDiv.textContent = `Escuchado: ${transcript}`;
            const number = parseFloat(transcript);
            if (!isNaN(number)) {
                resultDiv.textContent += `\nNúmero: ${number}`;
            } else {
                resultDiv.textContent += '\nNo se reconoció un número.';
            }
        };

        startButton.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        resultDiv.textContent = 'Tu navegador no soporta el reconocimiento de voz.';
    }
});
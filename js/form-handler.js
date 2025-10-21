// Configuración del formulario para Google Sheets
// IMPORTANTE: Reemplaza esta URL con la URL de tu Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbCqpL61YF8BQAaFr_hR9O-XTH05oEp6CfR7rt2YhO_L9mREB65l4Mwv4xp7TT9N5q/exec';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('status-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Mostrar mensaje de carga
        showMessage('Enviando...', 'loading');
        
        // Recopilar datos del formulario
        const formData = new FormData(form);
        const data = {
            timestamp: new Date().toISOString(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            contactMethod: formData.get('contact-method'),
            appointmentType: formData.get('appointment-type'),
            preferredDate: formData.get('preferred-date') || 'N/A',
            preferredTime: formData.get('preferred-time') || 'N/A',
            message: formData.get('message')
        };

        try {
            // Enviar datos a Google Sheets
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Como usamos no-cors, asumimos que fue exitoso
            showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
        }
    });

    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.style.display = 'block';
        
        // Remover clases anteriores
        statusMessage.classList.remove('success', 'error', 'loading');
        
        // Agregar clase según el tipo
        statusMessage.classList.add(type);
        
        // Auto-ocultar mensaje después de 5 segundos (excepto errores)
        if (type !== 'error') {
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        }
    }
});
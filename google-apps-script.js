// Google Apps Script para VKE - Sistema de Agendamiento
// URL de tu Google Sheet: https://docs.google.com/spreadsheets/d/PONER_ID/edit

function doPost(e) {
  try {
    // Tu Google Sheet ID
    const SHEET_ID = 'SHEET_ID';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Preparar la fila de datos
    const row = [
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.contactMethod,
      data.appointmentType,
      data.preferredDate,
      data.preferredTime,
      data.message,
      'Pendiente'
    ];
    
    // Agregar la fila al sheet
    sheet.appendRow(row);
    
    // Si es una cita (no solo información), crear evento en Google Calendar
    if (data.appointmentType !== 'other' && data.preferredDate && data.preferredTime) {
      createCalendarEvent(data);
    }
    
    // Enviar email de notificación al cliente
    sendClientNotification(data);
    
    // Enviar email de notificación al administrador
    sendAdminNotification(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error en doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function createCalendarEvent(data) {
  try {
    // Obtener el calendario principal
    const calendar = CalendarApp.getDefaultCalendar();
    
    // Configurar los tipos de cita y duraciones
    const appointmentTypes = {
      'consultation': { duration: 30, title: 'Consulta gratuita' },
      'project-review': { duration: 45, title: 'Revisión de proyecto' },
      'quote': { duration: 60, title: 'Cotización personalizada' },
      'support': { duration: 30, title: 'Soporte técnico' }
    };
    
    const appointmentInfo = appointmentTypes[data.appointmentType];
    if (!appointmentInfo) return;
    
    // Crear fecha y hora del evento
    const eventDate = new Date(data.preferredDate + 'T' + data.preferredTime + ':00');
    const endDate = new Date(eventDate.getTime() + (appointmentInfo.duration * 60000));
    
    // Crear el evento
    const event = calendar.createEvent(
      `${appointmentInfo.title} - ${data.name}`,
      eventDate,
      endDate,
      {
        description: `Cliente: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\nMétodo de contacto preferido: ${data.contactMethod}\n\nMensaje:\n${data.message}`,
        guests: data.email,
        sendInvites: true
      }
    );
    
    console.log('Evento creado:', event.getId());
    
  } catch (error) {
    console.error('Error creando evento:', error);
  }
}

function sendClientNotification(data) {
  try {
    const appointmentTypes = {
      'consultation': 'Consulta gratuita (30 min)',
      'project-review': 'Revisión de proyecto (45 min)',
      'quote': 'Cotización personalizada (60 min)',
      'support': 'Soporte técnico (30 min)',
      'other': 'Información general'
    };
    
    const subject = `VKE - Confirmación de solicitud: ${appointmentTypes[data.appointmentType]}`;
    
    let body = `Hola ${data.name},\n\n`;
    body += `Gracias por contactarnos. Hemos recibido tu solicitud con los siguientes detalles:\n\n`;
    body += `Tipo de contacto: ${appointmentTypes[data.appointmentType]}\n`;
    body += `Email: ${data.email}\n`;
    body += `Teléfono: ${data.phone}\n`;
    body += `Método de contacto preferido: ${data.contactMethod}\n`;
    
    if (data.preferredDate && data.preferredTime && data.appointmentType !== 'other') {
      body += `Fecha preferida: ${data.preferredDate}\n`;
      body += `Hora preferida: ${data.preferredTime}\n\n`;
      body += `Te enviaremos una invitación de calendario una vez que confirmemos la disponibilidad.\n\n`;
    } else {
      body += `\nNos pondremos en contacto contigo pronto.\n\n`;
    }
    
    body += `Mensaje:\n${data.message}\n\n`;
    body += `Saludos,\nEquipo VKE\n\n`;
    body += `---\nEste es un mensaje automático. Si tienes dudas, responde a este email.`;
    
    MailApp.sendEmail(data.email, subject, body);
    
  } catch (error) {
    console.error('Error enviando email al cliente:', error);
  }
}

function sendAdminNotification(data) {
  try {
    // Cambia este email por tu email de administrador
    const ADMIN_EMAIL = 'contacto@vke.com'; // ⚠️ CAMBIAR POR TU EMAIL
    
    const appointmentTypes = {
      'consultation': 'Consulta gratuita (30 min)',
      'project-review': 'Revisión de proyecto (45 min)',
      'quote': 'Cotización personalizada (60 min)',
      'support': 'Soporte técnico (30 min)',
      'other': 'Información general'
    };
    
    const subject = `🔔 Nueva solicitud de cliente: ${data.name}`;
    
    let body = `Nueva solicitud recibida:\n\n`;
    body += `👤 Cliente: ${data.name}\n`;
    body += `📧 Email: ${data.email}\n`;
    body += `📱 Teléfono: ${data.phone}\n`;
    body += `📞 Método preferido: ${data.contactMethod}\n`;
    body += `🎯 Tipo: ${appointmentTypes[data.appointmentType]}\n`;
    
    if (data.preferredDate && data.preferredTime && data.appointmentType !== 'other') {
      body += `📅 Fecha preferida: ${data.preferredDate}\n`;
      body += `⏰ Hora preferida: ${data.preferredTime}\n`;
    }
    
    body += `\n💬 Mensaje:\n${data.message}\n\n`;
    body += `---\n`;
    body += `Ver en Google Sheets: https://docs.google.com/spreadsheets/d/1g_Ia04PiJ7fIBPmr1zACFFmcqjGQthD9pCtmgbLKNoI/edit\n`;
    body += `Enviado desde: VKE Website`;
    
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);
    
  } catch (error) {
    console.error('Error enviando email al admin:', error);
  }
}

// Función de prueba (opcional - para testing)
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    phone: '+52 55 1234 5678',
    contactMethod: 'email',
    appointmentType: 'consultation',
    preferredDate: '2025-10-20',
    preferredTime: '10:00',
    message: 'Este es un mensaje de prueba'
  };
  
  console.log('Iniciando prueba...');
  
  // Simular el evento POST
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Resultado:', result.getContent());
}
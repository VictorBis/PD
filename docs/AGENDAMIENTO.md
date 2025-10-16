# 📅 Sistema de Agendamiento de Citas

## 📋 Descripción

Sistema que permite a los clientes:
- Llenar formulario de contacto básico
- Seleccionar tipo de servicio y cita
- Elegir fecha y hora preferida
- Recibir confirmación automática

Los datos se guardan en Google Sheets y se crean eventos automáticamente en Google Calendar.

## 🎯 Tipos de cita disponibles

| Tipo | Duración | Descripción |
|------|----------|-------------|
| **Consulta gratuita** | 30 min | Primera reunión para conocer el proyecto |
| **Revisión de proyecto** | 45 min | Análisis detallado de proyecto existente |
| **Cotización personalizada** | 60 min | Reunión para crear presupuesto detallado |
| **Soporte técnico** | 30 min | Ayuda con sitios web existentes |
| **Solo información** | - | Contacto sin cita programada |

## ⚙️ Configuración de Google Apps Script

### Paso 1: Crear proyecto en Google Apps Script

1. Ve a [script.google.com](https://script.google.com)
2. Crea nuevo proyecto: "VKE Agendamiento"
3. Copia el código del archivo `google-apps-script.js`
4. **Cambia el email de administrador** en la línea:
   ```javascript
   const ADMIN_EMAIL = 'TU_EMAIL_AQUI';
   ```

### Paso 2: Configurar Google Sheets

1. Crea una nueva hoja de cálculo en Google Sheets
2. Agrega estas columnas en la fila 1:
   ```
   A1: Timestamp    | B1: Nombre      | C1: Email
   D1: Teléfono     | E1: Método      | F1: Tipo de Cita
   G1: Fecha        | H1: Hora        | I1: Mensaje
   J1: Estado
   ```
3. Copia el ID de la hoja (desde la URL) y pégalo en el script

### Paso 3: Desplegar aplicación web

1. En Google Apps Script: **Desplegar > Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Acceso: **Cualquier usuario**
5. Copia la URL generada

### Paso 4: Conectar formulario

Edita `js/form-handler.js` y reemplaza:
```javascript
const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
```

Con tu URL real de Google Apps Script.

## 🔄 Flujo del sistema

1. **Cliente envía formulario** → Datos a Google Sheets
2. **Si es cita** → Evento en Google Calendar + invitación automática
3. **Notificaciones** → Email al cliente y administrador
4. **Gestión** → Confirmar/modificar desde Google Calendar

## 🧪 Pruebas

Para probar el sistema:

1. **Ejecutar función de prueba** en Google Apps Script (`testFunction`)
2. **Autorizar permisos** (Sheets, Calendar, Gmail)
3. **Probar formulario** con datos reales
4. **Verificar** que lleguen datos a Sheets y se cree evento en Calendar

## 🔧 Solución de problemas

### Error "No autorizado"
- Ejecuta `testFunction` en Google Apps Script
- Autoriza todos los permisos solicitados

### No llegan datos
- Verifica URL en `form-handler.js`
- Revisa consola del navegador (F12)
- Confirma que el script esté desplegado

### No se crean eventos
- Verifica permisos de Google Calendar
- Revisa formato de fecha/hora en el formulario
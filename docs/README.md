# 📚 README - VKE Website

## 🌟 Descripción

Sitio web corporativo para VKE con sistema integrado de agendamiento de citas. Incluye formulario de contacto que se conecta con Google Sheets y Google Calendar para gestión automática de citas.

## ✨ Características

- **Diseño responsive** - Optimizado para desktop, tablet y mobile
- **Sistema de agendamiento** - Citas automáticas en Google Calendar
- **Formulario inteligente** - Campos dinámicos según tipo de servicio
- **Integración Google Workspace** - Sheets + Calendar + Gmail
- **Servidor de desarrollo** - Python/Node.js para testing local

## 🚀 Inicio rápido

1. **Clonar proyecto**
   ```bash
   git clone [URL_DEL_REPO]
   cd PD
   ```

2. **Iniciar servidor**
   ```bash
   python3 server.py
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8000
   ```

## 📖 Documentación

- [`docs/DESARROLLO.md`](docs/DESARROLLO.md) - Guía de desarrollo y servidor local
- [`docs/AGENDAMIENTO.md`](docs/AGENDAMIENTO.md) - Configuración del sistema de citas
- [`google-apps-script.js`](google-apps-script.js) - Código para Google Apps Script

## 🔧 Tecnologías

- **Frontend**: HTML5, CSS3/SCSS, JavaScript
- **Backend**: Google Apps Script (serverless)
- **Integración**: Google Sheets, Google Calendar, Gmail
- **Desarrollo**: Python HTTP Server / Node.js

## 📁 Páginas principales

- `/` - Homepage con servicios y precios
- `/Formulario/` - Contacto y agendamiento de citas
- `/Proyectos/` - Portfolio de trabajos
- `/Nosotros/` - Información del equipo
- `/FAQ/` - Preguntas frecuentes

## 🎯 Configuración de producción

Para activar el sistema de agendamiento:

1. Seguir guía en [`docs/AGENDAMIENTO.md`](docs/AGENDAMIENTO.md)
2. Configurar Google Apps Script
3. Conectar Google Sheets
4. Desplegar aplicación web
5. Actualizar URL en `js/form-handler.js`

## 📞 Soporte

Para dudas sobre el proyecto, revisa la documentación en la carpeta `docs/` o contacta al equipo de desarrollo.
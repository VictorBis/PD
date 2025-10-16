# 📖 Documentación del Proyecto VKE

## 🚀 Desarrollo Local

### Servidor de desarrollo

Para probar el sitio web localmente:

```bash
# Desde la carpeta raíz del proyecto
python3 server.py

# O en un puerto específico
python3 server.py --port 3000
```

**Alternativas:**
```bash
# Con Node.js (requiere npm install primero)
npm start

# Python básico
python3 -m http.server 8000
```

### Compilar estilos SCSS

```bash
# Compilar SCSS a CSS
sass css/style.scss css/style.css

# Modo watch (compilación automática)
sass --watch css/style.scss css/style.css
```

## 📁 Estructura del proyecto

```
PD/
├── css/                    # Estilos SCSS
├── js/                     # JavaScript
├── img/                    # Imágenes y assets
├── Formulario/            # Página de contacto
├── Proyectos/             # Página de proyectos
├── Nosotros/              # Página del equipo
├── docs/                  # Documentación
├── server.py              # Servidor Python
└── index.html             # Página principal
```

## 🛠️ Scripts disponibles

- `server.py` - Servidor de desarrollo con Python
- `package.json` - Configuración de Node.js (alternativo)
- `css/style.scss` - Archivo principal de estilos

## 📱 Responsive Design

El sitio está optimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (hasta 767px)

## 🔄 Workflow de desarrollo

1. **Hacer cambios** en archivos HTML/SCSS/JS
2. **Compilar SCSS** si es necesario: `sass css/style.scss css/style.css`
3. **Probar localmente**: `python3 server.py`
4. **Commit cambios** cuando estén listos
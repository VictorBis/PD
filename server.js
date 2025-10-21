const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());

// Servir archivos estáticos con configuración específica
app.use('/css', express.static(path.join(__dirname, 'css'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/favicon', express.static(path.join(__dirname, 'favicon')));

// Middleware general para otros archivos estáticos
app.use(express.static(__dirname, {
    maxAge: '1d' // Cache por 1 día
}));

app.use(express.json());

// Middleware para inyectar variables de entorno en todas las páginas HTML
app.use((req, res, next) => {
    if (req.path.endsWith('.html') || req.path === '/' || req.path.endsWith('/')) {
        const originalSend = res.send;
        res.send = function(body) {
            if (typeof body === 'string' && body.includes('<head>')) {
                // Obtener la URL base del sitio
                const baseUrl = process.env.VERCEL_URL 
                    ? `https://${process.env.VERCEL_URL}` 
                    : `${req.protocol}://${req.get('host')}`;
                
                const envScript = `
                <script>
                    globalThis.GOOGLE_SCRIPT_URL = '${process.env.GOOGLE_SCRIPT_URL || ''}';
                </script>`;
                
                // Reemplazar URLs relativas en meta tags con URLs absolutas
                body = body.replaceAll('content="/img/SN-Thumbnail/Thumbnail.png"', 
                    `content="${baseUrl}/img/SN-Thumbnail/Thumbnail.png"`);
                body = body.replace('content="https://www.vike.com.mx"', 
                    `content="${baseUrl}"`);
                
                body = body.replace('</head>', envScript + '</head>');
            }
            originalSend.call(this, body);
        };
    }
    next();
});

// Rutas para las páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/Formulario/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Formulario', 'index.html'));
});

app.get('/Proyectos/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Proyectos', 'index.html'));
});

app.get('/Nosotros/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Nosotros', 'index.html'));
});

app.get('/Contacto/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Contacto', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 Servidor iniciado en: http://localhost:' + PORT);
    console.log('📁 Sirviendo archivos desde:', __dirname);
    console.log('✨ Páginas disponibles:');
    console.log('   - Inicio: http://localhost:' + PORT);
    console.log('   - Formulario: http://localhost:' + PORT + '/Formulario/');
    console.log('   - Proyectos: http://localhost:' + PORT + '/Proyectos/');
    console.log('   - Nosotros: http://localhost:' + PORT + '/Nosotros/');
    console.log('   - Contacto: http://localhost:' + PORT + '/Contacto/');
    console.log('\n⚡ Presiona Ctrl+C para detener el servidor');
});
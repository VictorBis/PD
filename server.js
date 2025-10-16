const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.static('.'));
app.use(express.json());

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
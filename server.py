#!/usr/bin/env python3
"""
Servidor local simple para desarrollo
Ejecuta este script desde la carpeta raíz del proyecto
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Puerto por defecto
PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Agregar headers CORS para desarrollo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 Servidor iniciado en: http://localhost:{PORT}")
            print(f"📁 Sirviendo archivos desde: {os.getcwd()}")
            print("✨ Páginas disponibles:")
            print(f"   - Inicio: http://localhost:{PORT}")
            print(f"   - Formulario: http://localhost:{PORT}/Formulario/")
            print(f"   - Proyectos: http://localhost:{PORT}/Proyectos/")
            print(f"   - Nosotros: http://localhost:{PORT}/Nosotros/")
            print(f"   - Contacto: http://localhost:{PORT}/Contacto/")
            print("\n⚡ Presiona Ctrl+C para detener el servidor")
            
            # Abrir navegador automáticamente
            webbrowser.open(f'http://localhost:{PORT}')
            
            # Iniciar servidor
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor detenido")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ El puerto {PORT} ya está en uso.")
            print("Intenta con otro puerto usando: python server.py --port OTRO_PUERTO")
        else:
            print(f"❌ Error al iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Verificar si se especificó un puerto diferente
    if len(sys.argv) > 1:
        try:
            if sys.argv[1] == "--port" and len(sys.argv) > 2:
                PORT = int(sys.argv[2])
            else:
                PORT = int(sys.argv[1])
        except ValueError:
            print("❌ Puerto inválido. Usando puerto por defecto 8000")
    
    start_server()
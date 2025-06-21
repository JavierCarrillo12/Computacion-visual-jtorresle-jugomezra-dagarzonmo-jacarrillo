from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import tempfile
from detector import ObjectDetector
import base64
import cv2
import numpy as np
import traceback
import mimetypes

app = Flask(__name__)
CORS(app)  # Permitir CORS para frontend

# Inicializar el detector
detector = ObjectDetector()

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint de salud del servidor"""
    return jsonify({"status": "ok", "message": "API funcionando correctamente"})

@app.route('/detect', methods=['POST'])
def detect_objects():
    """Endpoint para detectar objetos en una imagen"""
    try:
        print("📥 Recibida petición de detección")
        
        # Verificar si se envió una imagen
        if 'image' not in request.files:
            print("❌ No se encontró archivo 'image' en la petición")
            return jsonify({"error": "No se proporcionó imagen"}), 400
        
        file = request.files['image']
        if file.filename == '':
            print("❌ Nombre de archivo vacío")
            return jsonify({"error": "No se seleccionó archivo"}), 400
        
        print(f"📁 Archivo recibido: {file.filename}")
        print(f"📊 Tipo MIME: {file.content_type}")
        
        # Determinar la extensión correcta basada en el tipo MIME
        if file.content_type == 'image/png':
            suffix = '.png'
        elif file.content_type == 'image/jpeg' or file.content_type == 'image/jpg':
            suffix = '.jpg'
        elif file.content_type == 'image/webp':
            suffix = '.webp'
        else:
            # Intentar determinar por el nombre del archivo
            _, ext = os.path.splitext(file.filename)
            if ext.lower() in ['.png', '.jpg', '.jpeg', '.webp']:
                suffix = ext.lower()
            else:
                suffix = '.jpg'  # Por defecto
        
        # Guardar imagen temporalmente con la extensión correcta
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
            file.save(tmp_file.name)
            tmp_path = tmp_file.name
            print(f"💾 Archivo temporal guardado: {tmp_path}")
        
        try:
            # Verificar que el archivo se guardó correctamente
            if not os.path.exists(tmp_path):
                raise ValueError("El archivo temporal no se creó correctamente")
            
            file_size = os.path.getsize(tmp_path)
            print(f"📁 Tamaño del archivo guardado: {file_size} bytes")
            
            if file_size == 0:
                raise ValueError("El archivo temporal está vacío")
            
            # Realizar detección
            print("🚀 Iniciando detección...")
            results = detector.detect_objects(tmp_path)
            print("✅ Detección completada exitosamente")
            
            return jsonify(results)
            
        finally:
            # Limpiar archivo temporal
            try:
                os.unlink(tmp_path)
                print(f"🗑️ Archivo temporal eliminado: {tmp_path}")
            except Exception as e:
                print(f"⚠️ Error al eliminar archivo temporal: {e}")
    
    except Exception as e:
        print(f"❌ Error en detect_objects: {str(e)}")
        print(f"📋 Traceback: {traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

@app.route('/detect-base64', methods=['POST'])
def detect_objects_base64():
    """Endpoint para detectar objetos usando imagen en base64"""
    try:
        print("📥 Recibida petición de detección base64")
        
        data = request.get_json()
        if not data or 'image' not in data:
            print("❌ No se encontró imagen en base64")
            return jsonify({"error": "No se proporcionó imagen en base64"}), 400
        
        # Decodificar imagen base64
        print("🔓 Decodificando imagen base64...")
        image_data = base64.b64decode(data['image'].split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            print("❌ Error al decodificar imagen base64")
            return jsonify({"error": "No se pudo decodificar la imagen"}), 400
        
        print(f"🖼️ Imagen decodificada: {image.shape}")
        
        # Guardar imagen temporalmente
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp_file:
            cv2.imwrite(tmp_file.name, image)
            tmp_path = tmp_file.name
            print(f"💾 Archivo temporal guardado: {tmp_path}")
        
        try:
            # Realizar detección
            print("🚀 Iniciando detección...")
            results = detector.detect_objects(tmp_path)
            print("✅ Detección completada exitosamente")
            
            return jsonify(results)
            
        finally:
            # Limpiar archivo temporal
            try:
                os.unlink(tmp_path)
                print(f"🗑️ Archivo temporal eliminado: {tmp_path}")
            except Exception as e:
                print(f"⚠️ Error al eliminar archivo temporal: {e}")
    
    except Exception as e:
        print(f"❌ Error en detect_objects_base64: {str(e)}")
        print(f"📋 Traceback: {traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

@app.route('/results/<filename>', methods=['GET'])
def get_result_file(filename):
    """Endpoint para obtener archivos de resultados"""
    try:
        file_path = os.path.join('../resultados', filename)
        if not os.path.exists(file_path):
            return jsonify({"error": "Archivo no encontrado"}), 404
        
        return send_file(file_path)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/results', methods=['GET'])
def list_results():
    """Endpoint para listar archivos de resultados disponibles"""
    try:
        results_dir = '../resultados'
        if not os.path.exists(results_dir):
            return jsonify({"files": []})
        
        files = os.listdir(results_dir)
        return jsonify({"files": files})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Iniciando servidor API en http://localhost:5000")
    print("📋 Endpoints disponibles:")
    print("  GET  /health - Verificar estado del servidor")
    print("  POST /detect - Detectar objetos (archivo)")
    print("  POST /detect-base64 - Detectar objetos (base64)")
    print("  GET  /results - Listar archivos de resultados")
    print("  GET  /results/<filename> - Obtener archivo de resultado")
    
    app.run(host='0.0.0.0', port=5000, debug=True) 
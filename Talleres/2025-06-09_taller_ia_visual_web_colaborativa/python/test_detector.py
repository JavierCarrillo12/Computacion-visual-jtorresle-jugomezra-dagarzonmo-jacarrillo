#!/usr/bin/env python3
"""
Script de prueba para verificar que el detector de objetos funciona correctamente
"""

import os
import sys
import cv2
import numpy as np
from detector import ObjectDetector

def test_detector():
    """Probar el detector con una imagen de prueba"""
    print("🧪 Iniciando pruebas del detector...")
    
    # Verificar que el modelo existe
    model_path = 'yolov8n.pt'
    if not os.path.exists(model_path):
        print(f"❌ Modelo no encontrado: {model_path}")
        return False
    
    print(f"✅ Modelo encontrado: {model_path}")
    
    # Crear una imagen de prueba simple
    print("🖼️ Creando imagen de prueba...")
    test_image = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Dibujar un rectángulo simple
    cv2.rectangle(test_image, (100, 100), (300, 300), (255, 255, 255), -1)
    cv2.rectangle(test_image, (400, 200), (500, 400), (128, 128, 128), -1)
    
    # Guardar imagen de prueba
    test_image_path = 'test_image.png'
    cv2.imwrite(test_image_path, test_image)
    print(f"💾 Imagen de prueba guardada: {test_image_path}")
    
    try:
        # Inicializar detector
        print("🤖 Inicializando detector...")
        detector = ObjectDetector()
        print("✅ Detector inicializado correctamente")
        
        # Probar detección
        print("🔍 Probando detección...")
        results = detector.detect_objects(test_image_path)
        print("✅ Detección completada")
        print(f"📊 Resultados: {results}")
        
        # Limpiar
        os.remove(test_image_path)
        print("🧹 Imagen de prueba eliminada")
        
        return True
        
    except Exception as e:
        print(f"❌ Error en la prueba: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_opencv():
    """Probar que OpenCV funciona correctamente"""
    print("🔧 Probando OpenCV...")
    
    # Crear imagen simple
    img = np.zeros((100, 100, 3), dtype=np.uint8)
    img[25:75, 25:75] = [255, 255, 255]
    
    # Guardar y cargar
    test_path = 'opencv_test.png'
    cv2.imwrite(test_path, img)
    
    loaded_img = cv2.imread(test_path)
    if loaded_img is not None:
        print("✅ OpenCV funciona correctamente")
        os.remove(test_path)
        return True
    else:
        print("❌ OpenCV no puede cargar imágenes")
        return False

if __name__ == "__main__":
    print("🚀 Iniciando pruebas del sistema de detección...")
    
    # Probar OpenCV primero
    if not test_opencv():
        print("❌ Falló la prueba de OpenCV")
        sys.exit(1)
    
    # Probar detector
    if test_detector():
        print("🎉 Todas las pruebas pasaron exitosamente!")
    else:
        print("❌ Falló la prueba del detector")
        sys.exit(1) 
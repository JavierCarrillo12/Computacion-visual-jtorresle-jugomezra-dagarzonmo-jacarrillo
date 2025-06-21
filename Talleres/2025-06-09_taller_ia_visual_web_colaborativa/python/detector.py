import cv2
import json
import os
from datetime import datetime
from ultralytics import YOLO
import numpy as np

class ObjectDetector:
    def __init__(self):
        self.model = YOLO('yolov8n.pt')
        self.results_dir = '../resultados'
        os.makedirs(self.results_dir, exist_ok=True)

    def detect_objects(self, image_path):
        """Detectar objetos en una imagen"""
        try:
            print(f"🔍 Procesando imagen: {image_path}")
            
            # Verificar que el archivo existe
            if not os.path.exists(image_path):
                raise ValueError(f"El archivo no existe: {image_path}")
            
            # Verificar el tamaño del archivo
            file_size = os.path.getsize(image_path)
            print(f"📁 Tamaño del archivo: {file_size} bytes")
            
            if file_size == 0:
                raise ValueError("El archivo está vacío")
            
            # Leer la imagen con OpenCV
            print(f"📖 Intentando leer imagen con OpenCV...")
            image = cv2.imread(image_path)
            print(f"🖼️ Resultado de cv2.imread: {type(image)}")
            
            if image is None:
                # Intentar con diferentes flags de OpenCV
                print("🔄 Intentando con diferentes flags de OpenCV...")
                image = cv2.imread(image_path, cv2.IMREAD_COLOR)
                if image is None:
                    image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
                    if image is None:
                        image = cv2.imread(image_path, cv2.IMREAD_ANYCOLOR)
                        if image is None:
                            raise ValueError(f"No se pudo cargar la imagen con ningún método: {image_path}")
            
            print(f"📐 Dimensiones de la imagen: {image.shape}")
            print(f"📊 Tipo de datos: {image.dtype}")
            
            # Verificar que la imagen tiene el formato correcto
            if len(image.shape) == 2:
                # Convertir imagen en escala de grises a RGB
                image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
                print("🔄 Convertida imagen en escala de grises a RGB")
            elif len(image.shape) == 3 and image.shape[2] == 4:
                # Convertir imagen RGBA a RGB
                image = cv2.cvtColor(image, cv2.COLOR_RGBA2BGR)
                print("🔄 Convertida imagen RGBA a RGB")
            
            # Realizar detección con YOLO
            print("🤖 Ejecutando modelo YOLO...")
            results = self.model(image)
            print(f"✅ Detección completada. Resultados: {len(results)}")
            
            # Procesar resultados
            detections = []
            for result in results:
                boxes = result.boxes
                if boxes is not None:
                    for box in boxes:
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        confidence = float(box.conf[0].cpu().numpy())
                        class_id = int(box.cls[0].cpu().numpy())
                        class_name = result.names[class_id]

                        detection = {
                            "class": class_name,
                            "confidence": confidence,
                            "x": int(x1),
                            "y": int(y1),
                            "w": int(x2 - x1),
                            "h": int(y2 - y1)
                        }
                        detections.append(detection)
                        print(f"🎯 Detectado: {class_name} (confianza: {confidence:.2f})")

            # Guardar resultados
            timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
            output = {
                "timestamp": timestamp,
                "objects": detections,
                "total_objects": len(detections)
            }

            # Guardar JSON
            json_path = os.path.join(self.results_dir, 'detecciones.json')
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(output, f, indent=2, ensure_ascii=False)
            print(f"💾 JSON guardado en: {json_path}")

            # Guardar imagen con detecciones
            if len(results) > 0:
                result_image = results[0].plot()
                image_path_output = os.path.join(self.results_dir, 'deteccion.png')
                cv2.imwrite(image_path_output, result_image)
                print(f"🖼️ Imagen con detecciones guardada en: {image_path_output}")

            print(f"✅ Procesamiento completado. {len(detections)} objetos detectados.")
            return output

        except Exception as e:
            print(f"❌ Error en detect_objects: {str(e)}")
            print(f"📋 Traceback completo:")
            import traceback
            traceback.print_exc()
            raise e

    def detect_objects_from_array(self, image_array):
        """Detectar objetos directamente desde un array de numpy"""
        try:
            print(f"🔍 Procesando imagen desde array: {image_array.shape}")
            
            # Realizar detección con YOLO
            print("🤖 Ejecutando modelo YOLO...")
            results = self.model(image_array)
            print(f"✅ Detección completada. Resultados: {len(results)}")
            
            # Procesar resultados
            detections = []
            for result in results:
                boxes = result.boxes
                if boxes is not None:
                    for box in boxes:
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        confidence = float(box.conf[0].cpu().numpy())
                        class_id = int(box.cls[0].cpu().numpy())
                        class_name = result.names[class_id]

                        detection = {
                            "class": class_name,
                            "confidence": confidence,
                            "x": int(x1),
                            "y": int(y1),
                            "w": int(x2 - x1),
                            "h": int(y2 - y1)
                        }
                        detections.append(detection)
                        print(f"🎯 Detectado: {class_name} (confianza: {confidence:.2f})")

            # Guardar resultados
            timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
            output = {
                "timestamp": timestamp,
                "objects": detections,
                "total_objects": len(detections)
            }

            # Guardar JSON
            json_path = os.path.join(self.results_dir, 'detecciones.json')
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(output, f, indent=2, ensure_ascii=False)
            print(f"💾 JSON guardado en: {json_path}")

            # Guardar imagen con detecciones
            if len(results) > 0:
                result_image = results[0].plot()
                image_path_output = os.path.join(self.results_dir, 'deteccion.png')
                cv2.imwrite(image_path_output, result_image)
                print(f"🖼️ Imagen con detecciones guardada en: {image_path_output}")

            print(f"✅ Procesamiento completado. {len(detections)} objetos detectados.")
            return output

        except Exception as e:
            print(f"❌ Error en detect_objects_from_array: {str(e)}")
            raise e

if __name__ == "__main__":
    detector = ObjectDetector()
    # Ejemplo de uso
    try:
        results = detector.detect_objects("../src/test_image.png")
        print("Detecciones guardadas exitosamente")
    except Exception as e:
        print(f"Error: {str(e)}") 
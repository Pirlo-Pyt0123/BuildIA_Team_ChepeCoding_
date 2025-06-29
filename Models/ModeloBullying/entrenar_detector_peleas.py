import cv2
import numpy as np
from ultralytics import YOLO
import os
import pickle
from collections import deque
import time

class DetectorPeleas:
    def __init__(self):
        # Cargar modelo YOLO preentrenado
        self.model = YOLO('yolov8n.pt')  # Modelo ligero para detección de personas
        
        # Parámetros para análisis de movimiento
        self.motion_threshold = 5000
        self.violence_threshold = 0.7
        self.frame_buffer = deque(maxlen=10)
        
        # Historial de detecciones
        self.detection_history = []
        
    def detectar_personas(self, frame):
        """Detecta personas en el frame usando YOLO"""
        results = self.model(frame, classes=[0], verbose=False)  # Clase 0 = personas
        personas = []
        
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    if box.conf[0] > 0.5:  # Confianza > 50%
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        personas.append({
                            'bbox': [int(x1), int(y1), int(x2), int(y2)],
                            'confianza': float(box.conf[0])
                        })
        return personas
    
    def calcular_movimiento(self, frame_actual, frame_anterior):
        """Calcula el nivel de movimiento entre frames"""
        if frame_anterior is None:
            return 0
        
        # Convertir a escala de grises
        gray1 = cv2.cvtColor(frame_anterior, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(frame_actual, cv2.COLOR_BGR2GRAY)
        
        # Calcular diferencia
        diff = cv2.absdiff(gray1, gray2)
        
        # Aplicar threshold
        _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)
        
        # Contar píxeles en movimiento
        movimiento = np.sum(thresh)
        
        return movimiento
    
    def analizar_interacciones(self, personas):
        """Analiza las interacciones entre personas detectadas"""
        if len(personas) < 2:
            return 0
        
        score_violencia = 0
        
        for i, persona1 in enumerate(personas):
            for j, persona2 in enumerate(personas[i+1:], i+1):
                # Calcular distancia entre personas
                x1_center = (persona1['bbox'][0] + persona1['bbox'][2]) // 2
                y1_center = (persona1['bbox'][1] + persona1['bbox'][3]) // 2
                x2_center = (persona2['bbox'][0] + persona2['bbox'][2]) // 2
                y2_center = (persona2['bbox'][1] + persona2['bbox'][3]) // 2
                
                distancia = np.sqrt((x1_center - x2_center)**2 + (y1_center - y2_center)**2)
                
                # Si están muy cerca, aumentar score
                if distancia < 100:  # Píxeles
                    score_violencia += 0.3
                
                # Analizar superposición de bounding boxes
                overlap = self.calcular_overlap(persona1['bbox'], persona2['bbox'])
                if overlap > 0.1:
                    score_violencia += 0.4
        
        return min(score_violencia, 1.0)
    
    def calcular_overlap(self, bbox1, bbox2):
        """Calcula el porcentaje de superposición entre dos bounding boxes"""
        x1_max = max(bbox1[0], bbox2[0])
        y1_max = max(bbox1[1], bbox2[1])
        x2_min = min(bbox1[2], bbox2[2])
        y2_min = min(bbox1[3], bbox2[3])
        
        if x2_min <= x1_max or y2_min <= y1_max:
            return 0
        
        area_overlap = (x2_min - x1_max) * (y2_min - y1_max)
        area1 = (bbox1[2] - bbox1[0]) * (bbox1[3] - bbox1[1])
        area2 = (bbox2[2] - bbox2[0]) * (bbox2[3] - bbox2[1])
        
        return area_overlap / min(area1, area2)
    
    def procesar_video(self, ruta_video):
        """Procesa un video completo y extrae características"""
        cap = cv2.VideoCapture(ruta_video)
        
        if not cap.isOpened():
            print(f"Error al abrir video: {ruta_video}")
            return None
        
        frame_anterior = None
        caracteristicas_video = []
        frame_count = 0
        
        print(f"Procesando: {ruta_video}")
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_count += 1
            
            # Procesar cada 5 frames para optimizar
            if frame_count % 5 != 0:
                continue
            
            # Redimensionar para optimizar procesamiento
            frame_resized = cv2.resize(frame, (640, 480))
            
            # Detectar personas
            personas = self.detectar_personas(frame_resized)
            
            # Calcular movimiento
            movimiento = self.calcular_movimiento(frame_resized, frame_anterior)
            
            # Analizar interacciones
            score_violencia = self.analizar_interacciones(personas)
            
            # Combinar métricas
            score_final = 0
            if len(personas) >= 2:
                score_final += 0.3  # Bonus por múltiples personas
            
            if movimiento > self.motion_threshold:
                score_final += 0.4  # Bonus por alto movimiento
            
            score_final += score_violencia
            
            caracteristicas_video.append({
                'frame': frame_count,
                'personas': len(personas),
                'movimiento': movimiento,
                'score_violencia': score_violencia,
                'score_final': min(score_final, 1.0)
            })
            
            frame_anterior = frame_resized.copy()
            
            # Mostrar progreso cada 100 frames
            if frame_count % 100 == 0:
                print(f"  Procesados {frame_count} frames...")
        
        cap.release()
        return caracteristicas_video
    
    def entrenar_modelo(self):
        """Entrena el modelo con todos los videos disponibles"""
        print("=== INICIANDO ENTRENAMIENTO DETECTOR DE PELEAS ===")
        
        videos = ['pelea1.mp4', 'pelea2.mp4', 'pelea3.mp4', 'pelea4.mp4', 'pelea5.mp4']
        
        datos_entrenamiento = {}
        
        for video in videos:
            if os.path.exists(video):
                caracteristicas = self.procesar_video(video)
                if caracteristicas:
                    datos_entrenamiento[video] = caracteristicas
                    
                    # Calcular estadísticas del video
                    scores = [c['score_final'] for c in caracteristicas]
                    promedio_violencia = np.mean(scores)
                    max_violencia = np.max(scores)
                    
                    print(f"{video}:")
                    print(f"  - Frames procesados: {len(caracteristicas)}")
                    print(f"  - Score promedio: {promedio_violencia:.3f}")
                    print(f"  - Score máximo: {max_violencia:.3f}")
                    print()
        
        # Crear modelo entrenado
        modelo_entrenado = {
            'datos_videos': datos_entrenamiento,
            'parametros': {
                'motion_threshold': self.motion_threshold,
                'violence_threshold': self.violence_threshold,
                'modelo_yolo': 'yolov8n.pt'
            },
            'estadisticas': self.calcular_estadisticas_globales(datos_entrenamiento)
        }
        
        # Guardar modelo
        with open('detector_peleas_modelo.pkt', 'wb') as f:
            pickle.dump(modelo_entrenado, f)
        
        print("=== MODELO GUARDADO COMO 'detector_peleas_modelo.pkt' ===")
        print(f"Total de videos procesados: {len(datos_entrenamiento)}")
        
        return modelo_entrenado
    
    def calcular_estadisticas_globales(self, datos):
        """Calcula estadísticas globales del entrenamiento"""
        todos_scores = []
        total_frames = 0
        
        for video, caracteristicas in datos.items():
            scores = [c['score_final'] for c in caracteristicas]
            todos_scores.extend(scores)
            total_frames += len(caracteristicas)
        
        return {
            'total_frames': total_frames,
            'score_promedio_global': np.mean(todos_scores),
            'score_maximo_global': np.max(todos_scores),
            'score_minimo_global': np.min(todos_scores),
            'desviacion_estandar': np.std(todos_scores)
        }

if __name__ == "__main__":
    detector = DetectorPeleas()
    modelo = detector.entrenar_modelo()
    
    print("\n=== RESUMEN DEL ENTRENAMIENTO ===")
    stats = modelo['estadisticas']
    print(f"Total de frames analizados: {stats['total_frames']}")
    print(f"Score promedio global: {stats['score_promedio_global']:.3f}")
    print(f"Score máximo encontrado: {stats['score_maximo_global']:.3f}")
    print(f"Desviación estándar: {stats['desviacion_estandar']:.3f}")
    print("\nModelo listo para usar en 'detector_peleas_modelo.pkt'")

import cv2
import numpy as np
import pickle
from ultralytics import YOLO
import time
import os
from datetime import datetime
from collections import deque

class ProbadorPeleas:
    def __init__(self, modelo_path='detector_peleas_modelo.pkt'):
        # Cargar modelo entrenado
        with open(modelo_path, 'rb') as f:
            self.modelo_data = pickle.load(f)
        
        # Cargar YOLO
        self.yolo = YOLO('yolov8n.pt')
        
        # Parámetros del modelo entrenado (compatibilidad con ambos formatos)
        if 'parametros' in self.modelo_data:
            # Modelo simple
            params = self.modelo_data['parametros']
            self.motion_threshold = params['motion_threshold']
            self.violence_threshold = params['violence_threshold']
            self.usar_ml_avanzado = False
        else:
            # Modelo avanzado
            params = self.modelo_data['parameters']
            self.motion_threshold = params['motion_threshold']
            self.violence_threshold = params['violence_threshold']
            self.usar_ml_avanzado = True
            self.modelo_ml = self.modelo_data['models']['ensemble']
            self.scaler = self.modelo_data['models']['scaler']
        
        # Variables para grabación
        self.grabando = False
        self.video_writer = None
        self.carpeta_actual = None
        self.tiempo_inicio_pelea = None
        self.frames_pelea = []
        self.contador_deteccion = 0
        
        # Buffer circular para capturar momentos previos
        self.buffer_frames = deque(maxlen=60)  # 3 segundos a 20fps
        self.buffer_timestamps = deque(maxlen=60)
        
        # Control de grabación precisa
        self.frames_post_pelea = 0
        self.max_frames_post = 100  # 5 segundos después de que termine
        self.pelea_activa = False
        
    def detectar_personas(self, frame):
        """Detecta personas usando YOLO"""
        results = self.yolo(frame, classes=[0], verbose=False)
        personas = []
        
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    if box.conf[0] > 0.5:
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        personas.append([int(x1), int(y1), int(x2), int(y2)])
        return personas
    
    def calcular_score_pelea(self, frame, frame_anterior, personas):
        """Calcula score de pelea basado en el modelo entrenado"""
        if self.usar_ml_avanzado:
            return self.calcular_score_ml_avanzado(frame, frame_anterior, personas)
        else:
            return self.calcular_score_basico(frame, frame_anterior, personas)
    
    def calcular_score_basico(self, frame, frame_anterior, personas):
        """Método básico original"""
        score = 0
        
        # Bonus por múltiples personas
        if len(personas) >= 2:
            score += 0.3
        
        # Calcular movimiento
        if frame_anterior is not None:
            gray1 = cv2.cvtColor(frame_anterior, cv2.COLOR_BGR2GRAY)
            gray2 = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            diff = cv2.absdiff(gray1, gray2)
            _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)
            movimiento = np.sum(thresh)
            
            if movimiento > self.motion_threshold:
                score += 0.4
        
        # Analizar proximidad entre personas
        for i, p1 in enumerate(personas):
            for j, p2 in enumerate(personas[i+1:], i+1):
                x1_c = (p1[0] + p1[2]) // 2
                y1_c = (p1[1] + p1[3]) // 2
                x2_c = (p2[0] + p2[2]) // 2
                y2_c = (p2[1] + p2[3]) // 2
                
                dist = np.sqrt((x1_c - x2_c)**2 + (y1_c - y2_c)**2)
                if dist < 100:
                    score += 0.3
        
        return min(score, 1.0)
    
    def calcular_score_ml_avanzado(self, frame, frame_anterior, personas):
        """Método avanzado usando ML"""
        try:
            # Extraer características (versión simplificada)
            caracteristicas = self.extraer_caracteristicas_simplificadas(frame, frame_anterior, personas)
            
            # Normalizar características
            caracteristicas_norm = self.scaler.transform(caracteristicas.reshape(1, -1))
            
            # Predecir probabilidad
            probabilidad = self.modelo_ml.predict_proba(caracteristicas_norm)[0][1]
            
            return probabilidad
        except Exception as e:
            print(f"Error en ML avanzado, usando método básico: {e}")
            return self.calcular_score_basico(frame, frame_anterior, personas)
    
    def extraer_caracteristicas_simplificadas(self, frame, frame_anterior, personas):
        """Extrae características básicas para el modelo ML"""
        # Inicializar array de características (30 dimensiones)
        features = np.zeros(30)
        
        if frame_anterior is not None:
            # Características de movimiento básicas
            gray1 = cv2.cvtColor(frame_anterior, cv2.COLOR_BGR2GRAY)
            gray2 = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            diff = cv2.absdiff(gray1, gray2)
            _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)
            movimiento = np.sum(thresh) / (thresh.shape[0] * thresh.shape[1])
            
            # Gradientes
            grad_x = cv2.Sobel(diff, cv2.CV_64F, 1, 0, ksize=3)
            grad_y = cv2.Sobel(diff, cv2.CV_64F, 0, 1, ksize=3)
            grad_magnitude = np.sqrt(grad_x**2 + grad_y**2)
            avg_gradient = np.mean(grad_magnitude)
            
            features[0:4] = [movimiento, avg_gradient, 0, 0]  # Características de movimiento
        
        # Características de interacción
        if len(personas) >= 2:
            distancias = []
            for i, p1 in enumerate(personas):
                for j, p2 in enumerate(personas[i+1:], i+1):
                    x1_c = (p1[0] + p1[2]) // 2
                    y1_c = (p1[1] + p1[3]) // 2
                    x2_c = (p2[0] + p2[2]) // 2
                    y2_c = (p2[1] + p2[3]) // 2
                    
                    dist = np.sqrt((x1_c - x2_c)**2 + (y1_c - y2_c)**2)
                    distancias.append(dist)
            
            features[8] = np.min(distancias) if distancias else 0
            features[9] = np.mean(distancias) if distancias else 0
        
        features[19] = len(personas)  # Número de personas
        
        return features
    
    def crear_carpeta_evidencia(self):
        """Crea carpeta con fecha y hora para guardar evidencias"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        carpeta = f"Pelea_Detectada_{timestamp}"
        
        if not os.path.exists(carpeta):
            os.makedirs(carpeta)
            print(f"📁 Carpeta creada: {carpeta}")
        
        return carpeta
    
    def iniciar_grabacion_precisa(self, frame_size):
        """Inicia la grabación precisa del momento de la pelea"""
        if not self.grabando:
            self.carpeta_actual = self.crear_carpeta_evidencia()
            self.tiempo_inicio_pelea = datetime.now()
            
            # Configurar video writer
            video_path = os.path.join(self.carpeta_actual, "evidencia_pelea.mp4")
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            self.video_writer = cv2.VideoWriter(video_path, fourcc, 20.0, frame_size)
            
            self.grabando = True
            self.pelea_activa = True
            self.frames_post_pelea = 0
            
            # Escribir frames previos del buffer
            print(f"🔴 GRABANDO PELEA - {self.tiempo_inicio_pelea.strftime('%H:%M:%S')}")
            print(f"📼 Incluyendo {len(self.buffer_frames)} frames previos...")
            
            for frame_previo in self.buffer_frames:
                self.video_writer.write(frame_previo)
            
            self.frames_pelea = list(self.buffer_frames)  # Copiar frames previos
    
    def detener_grabacion_precisa(self):
        """Detiene la grabación cuando ya no hay pelea"""
        if self.grabando and self.video_writer:
            self.video_writer.release()
            self.grabando = False
            self.pelea_activa = False
            
            # Guardar fotos clave de la pelea
            self.guardar_fotos_evidencia()
            
            duracion = datetime.now() - self.tiempo_inicio_pelea
            print(f"⏹️ GRABACIÓN COMPLETADA - Duración: {duracion.seconds}s")
            print(f"📊 Total frames: {len(self.frames_pelea)}")
            print(f"💾 Evidencias guardadas en: {self.carpeta_actual}")
            
            self.video_writer = None
            self.frames_pelea = []
            self.frames_post_pelea = 0
    
    def guardar_fotos_evidencia(self):
        """Guarda fotos clave durante la pelea"""
        if len(self.frames_pelea) > 0:
            # Guardar cada 10 frames para no saturar
            frames_a_guardar = self.frames_pelea[::10]
            
            for i, frame in enumerate(frames_a_guardar):
                foto_path = os.path.join(self.carpeta_actual, f"evidencia_{i+1:03d}.jpg")
                cv2.imwrite(foto_path, frame)
            
            print(f"📸 {len(frames_a_guardar)} fotos guardadas como evidencia")
    
    def procesar_camara_tiempo_real(self):
        """Procesa cámara en tiempo real con detección y grabación automática"""
        cap = cv2.VideoCapture(0)  # Cámara principal
        
        if not cap.isOpened():
            print("❌ Error: No se puede acceder a la cámara")
            return
        
        # Configurar resolución
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        frame_size = (640, 480)
        
        print("🎥 DETECTOR DE PELEAS ACTIVADO")
        print("📹 Usando cámara en tiempo real")
        print("Presiona 'q' para salir")
        print("-" * 50)
        
        frame_anterior = None
        
        while True:
            ret, frame = cap.read()
            if not ret:
                print("❌ Error al leer frame de la cámara")
                break
            
            # Agregar frame al buffer circular (siempre)
            self.buffer_frames.append(frame.copy())
            self.buffer_timestamps.append(time.time())
            
            # Detectar personas
            personas = self.detectar_personas(frame)
            
            # Calcular score de pelea
            score = self.calcular_score_pelea(frame, frame_anterior, personas)
            
            # Lógica mejorada de detección de pelea
            es_pelea_detectada = score > 0.6 and len(personas) >= 2
            
            if es_pelea_detectada:
                self.contador_deteccion += 1
                
                # Iniciar grabación si detecta pelea por 2 frames consecutivos
                if self.contador_deteccion >= 2 and not self.grabando:
                    self.iniciar_grabacion_precisa(frame_size)
                
                # Si está grabando, continuar grabando
                if self.grabando:
                    self.video_writer.write(frame)
                    self.frames_pelea.append(frame.copy())
                    self.frames_post_pelea = 0  # Resetear contador post-pelea
                    
                # Alerta visual de pelea
                cv2.putText(frame, "¡PELEA DETECTADA!", (10, 30), 
                           cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                
            else:
                # No hay pelea detectada
                self.contador_deteccion = max(0, self.contador_deteccion - 1)
                
                # Si estaba grabando una pelea, continuar por algunos frames más
                if self.grabando and self.pelea_activa:
                    self.frames_post_pelea += 1
                    
                    # Continuar grabando frames post-pelea
                    self.video_writer.write(frame)
                    self.frames_pelea.append(frame.copy())
                    
                    # Detener grabación después de suficientes frames post-pelea
                    if self.frames_post_pelea >= self.max_frames_post:
                        self.detener_grabacion_precisa()
                    
                    # Mostrar que está en modo post-pelea
                    cv2.putText(frame, f"Post-pelea: {self.frames_post_pelea}/{self.max_frames_post}", 
                               (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 165, 0), 1)
            
            # Visualización
            self.dibujar_interfaz(frame, personas, score)
            
            # Mostrar frame
            cv2.imshow('Detector de Peleas - Cámara en Vivo', frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            
            frame_anterior = frame.copy()
        
        # Limpiar al salir
        if self.grabando:
            self.detener_grabacion_precisa()
        
        cap.release()
        cv2.destroyAllWindows()
    
    def dibujar_interfaz(self, frame, personas, score):
        """Dibuja la interfaz de usuario en el frame"""
        # Dibujar personas detectadas
        for bbox in personas:
            color = (0, 0, 255) if score > 0.6 else (0, 255, 0)
            cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), color, 2)
        
        # Indicador de estado (círculo)
        if score > 0.6:
            cv2.circle(frame, (30, 30), 20, (0, 0, 255), -1)  # Rojo = Pelea
            estado = "PELIGRO"
        else:
            cv2.circle(frame, (30, 30), 20, (0, 255, 0), -1)  # Verde = Normal
            estado = "NORMAL"
        
        # Información en pantalla
        cv2.putText(frame, f"Estado: {estado}", (60, 35), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        
        cv2.putText(frame, f"Personas: {len(personas)}", (10, 460), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        cv2.putText(frame, f"Score: {score:.2f}", (150, 460), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # Información del buffer
        cv2.putText(frame, f"Buffer: {len(self.buffer_frames)}/60", (300, 460), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # Indicador de grabación con más detalles
        if self.grabando:
            if self.pelea_activa:
                cv2.putText(frame, "🔴 GRABANDO PELEA", (450, 30), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            else:
                cv2.putText(frame, "🟡 POST-PELEA", (450, 30), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 165, 255), 2)
            
            # Mostrar contador de frames grabados
            cv2.putText(frame, f"Frames: {len(self.frames_pelea)}", (450, 460), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # Mostrar contador de detección
        if self.contador_deteccion > 0:
            cv2.putText(frame, f"Detección: {self.contador_deteccion}/2", (10, 90), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 1)

def main():
    """Función principal para usar cámara en tiempo real"""
    try:
        probador = ProbadorPeleas()
        
        print("🛡️  SISTEMA DE DETECCIÓN DE PELEAS ACTIVO")
        print("=" * 50)
        
        # Usar cámara en tiempo real
        probador.procesar_camara_tiempo_real()
        
    except FileNotFoundError:
        print("❌ ERROR: No se encontró 'detector_peleas_modelo.pkt'")
        print("➡️  Ejecuta primero 'entrenar_detector_peleas.py'")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()

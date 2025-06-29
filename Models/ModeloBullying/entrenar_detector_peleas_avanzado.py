import cv2
import numpy as np
import pickle
from ultralytics import YOLO
import os
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.neural_network import MLPClassifier
import joblib
from scipy.spatial.distance import euclidean, cosine
from collections import deque
import warnings
import time
from datetime import datetime
import matplotlib.pyplot as plt
warnings.filterwarnings('ignore')

class DetectorPeleasAvanzado:
    def __init__(self):
        # Cargar modelo YOLO preentrenado
        self.model = YOLO('yolov8n.pt')
        
        # Parámetros dinámicos que se optimizarán
        self.motion_threshold = 5000
        self.violence_threshold = 0.7
        self.frame_buffer = deque(maxlen=15)
        
        # Buffers para análisis temporal
        self.velocity_buffer = deque(maxlen=10)
        self.acceleration_buffer = deque(maxlen=5)
        
        # Modelos de ML que se entrenarán
        self.models = {}
        self.scaler = StandardScaler()
        self.feature_importance = {}
        
        print("🤖 DETECTOR DE PELEAS AVANZADO INICIALIZADO")
        print("🔬 Múltiples algoritmos de ML integrados")
        
    def detectar_personas_avanzado(self, frame):
        """Detección avanzada con análisis de pose y movimiento"""
        results = self.model(frame, classes=[0], verbose=False)
        personas = []
        
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    if box.conf[0] > 0.4:  # Umbral más permisivo
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        w, h = x2 - x1, y2 - y1
                        
                        # Calcular características geométricas
                        aspect_ratio = w / h if h > 0 else 0
                        area = w * h
                        center_x, center_y = (x1 + x2) / 2, (y1 + y2) / 2
                        
                        personas.append({
                            'bbox': [int(x1), int(y1), int(x2), int(y2)],
                            'center': (center_x, center_y),
                            'width': w,
                            'height': h,
                            'area': area,
                            'aspect_ratio': aspect_ratio,
                            'confianza': float(box.conf[0])
                        })
        return personas
    
    def extraer_caracteristicas_movimiento(self, frame_actual, frame_anterior):
        """Extrae características avanzadas de movimiento"""
        if frame_anterior is None:
            return np.zeros(8)
        
        # Convertir a escala de grises
        gray1 = cv2.cvtColor(frame_anterior, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(frame_actual, cv2.COLOR_BGR2GRAY)
        
        # 1. Flujo óptico denso usando Farneback
        try:
            flow = cv2.calcOpticalFlowPyrLK(
                gray1, gray2, 
                cv2.goodFeaturesToTrack(gray1, maxCorners=100, qualityLevel=0.3, minDistance=7, blockSize=7),
                None
            )[0]
            
            if flow is not None and len(flow) > 0:
                # Calcular magnitudes
                dx = flow[:, 0, 0] if len(flow.shape) == 3 else flow[:, 0]
                dy = flow[:, 0, 1] if len(flow.shape) == 3 else flow[:, 1]
                magnitude = np.sqrt(dx**2 + dy**2)
                angle = np.arctan2(dy, dx)
                
                avg_magnitude = np.mean(magnitude) if len(magnitude) > 0 else 0
                max_magnitude = np.max(magnitude) if len(magnitude) > 0 else 0
                std_magnitude = np.std(magnitude) if len(magnitude) > 0 else 0
                avg_angle = np.mean(angle) if len(angle) > 0 else 0
            else:
                avg_magnitude = max_magnitude = std_magnitude = avg_angle = 0
        except:
            # Fallback a flujo óptico denso
            flow = cv2.calcOpticalFlowPyrLK(gray1, gray2, None, None)
            if flow is not None:
                magnitude, angle = cv2.cartToPolar(flow[..., 0], flow[..., 1])
                avg_magnitude = np.mean(magnitude)
                max_magnitude = np.max(magnitude)
                std_magnitude = np.std(magnitude)
                avg_angle = np.mean(angle)
            else:
                avg_magnitude = max_magnitude = std_magnitude = avg_angle = 0
        
        # 2. Diferencia de frames
        diff = cv2.absdiff(gray1, gray2)
        _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)
        movimiento_pixeles = np.sum(thresh) / (thresh.shape[0] * thresh.shape[1])
        
        # 3. Análisis de gradientes
        grad_x = cv2.Sobel(diff, cv2.CV_64F, 1, 0, ksize=3)
        grad_y = cv2.Sobel(diff, cv2.CV_64F, 0, 1, ksize=3)
        grad_magnitude = np.sqrt(grad_x**2 + grad_y**2)
        avg_gradient = np.mean(grad_magnitude)
        
        # 4. Análisis de textura (LBP simplificado)
        texture_score = self.calcular_textura_cambio(gray1, gray2)
        
        # 5. Entropía del movimiento
        hist = cv2.calcHist([diff], [0], None, [256], [0, 256])
        hist_norm = hist / np.sum(hist)
        entropia = -np.sum(hist_norm * np.log2(hist_norm + 1e-7))
        
        return np.array([
            avg_magnitude, max_magnitude, std_magnitude,
            movimiento_pixeles, avg_gradient, texture_score,
            entropia, avg_angle
        ])
    
    def calcular_textura_cambio(self, gray1, gray2):
        """Calcula cambios en la textura entre frames"""
        # Usar filtros de Gabor para detectar cambios de textura
        kernel = cv2.getGaborKernel((15, 15), 5, np.pi/4, 2*np.pi, 0.5, 0, ktype=cv2.CV_32F)
        
        filtered1 = cv2.filter2D(gray1, cv2.CV_8UC3, kernel)
        filtered2 = cv2.filter2D(gray2, cv2.CV_8UC3, kernel)
        
        texture_diff = cv2.absdiff(filtered1, filtered2)
        return np.mean(texture_diff)
    
    def analizar_interacciones_avanzadas(self, personas_actual, personas_anterior):
        """Análisis avanzado de interacciones entre personas"""
        if len(personas_actual) < 2:
            return np.zeros(10)
        
        caracteristicas = []
        
        # 1. Análisis de proximidad
        distancias = []
        overlaps = []
        velocidades_relativas = []
        
        for i, p1 in enumerate(personas_actual):
            for j, p2 in enumerate(personas_actual[i+1:], i+1):
                # Distancia euclidiana
                dist = euclidean(p1['center'], p2['center'])
                distancias.append(dist)
                
                # Superposición de bounding boxes
                overlap = self.calcular_overlap_avanzado(p1['bbox'], p2['bbox'])
                overlaps.append(overlap)
                
                # Velocidad relativa (si hay frame anterior)
                if personas_anterior and i < len(personas_anterior) and j < len(personas_anterior):
                    vel_rel = self.calcular_velocidad_relativa(
                        p1, p2, personas_anterior[i], personas_anterior[j]
                    )
                    velocidades_relativas.append(vel_rel)
        
        # 2. Características estadísticas
        min_dist = np.min(distancias) if distancias else 0
        avg_dist = np.mean(distancias) if distancias else 0
        max_overlap = np.max(overlaps) if overlaps else 0
        avg_overlap = np.mean(overlaps) if overlaps else 0
        
        # 3. Densidad de personas
        densidad = len(personas_actual) / (640 * 480)  # Normalizado por área frame
        
        # 4. Variación en tamaños (puede indicar perspectiva/movimiento)
        areas = [p['area'] for p in personas_actual]
        variacion_tamano = np.std(areas) / (np.mean(areas) + 1e-7)
        
        # 5. Análisis de formación grupal
        centroide_x = np.mean([p['center'][0] for p in personas_actual])
        centroide_y = np.mean([p['center'][1] for p in personas_actual])
        
        dispersión = np.mean([
            euclidean(p['center'], (centroide_x, centroide_y)) 
            for p in personas_actual
        ])
        
        # 6. Velocidades promedio
        avg_vel_rel = np.mean(velocidades_relativas) if velocidades_relativas else 0
        max_vel_rel = np.max(velocidades_relativas) if velocidades_relativas else 0
        
        return np.array([
            min_dist, avg_dist, max_overlap, avg_overlap, densidad,
            variacion_tamano, dispersión, avg_vel_rel, max_vel_rel, len(personas_actual)
        ])
    
    def calcular_overlap_avanzado(self, bbox1, bbox2):
        """Cálculo mejorado de superposición"""
        x1_max = max(bbox1[0], bbox2[0])
        y1_max = max(bbox1[1], bbox2[1])
        x2_min = min(bbox1[2], bbox2[2])
        y2_min = min(bbox1[3], bbox2[3])
        
        if x2_min <= x1_max or y2_min <= y1_max:
            return 0
        
        area_overlap = (x2_min - x1_max) * (y2_min - y1_max)
        area1 = (bbox1[2] - bbox1[0]) * (bbox1[3] - bbox1[1])
        area2 = (bbox2[2] - bbox2[0]) * (bbox2[3] - bbox2[1])
        
        # IoU (Intersection over Union)
        iou = area_overlap / (area1 + area2 - area_overlap)
        return iou
    
    def calcular_velocidad_relativa(self, p1_actual, p2_actual, p1_anterior, p2_anterior):
        """Calcula velocidad relativa entre dos personas"""
        vel1 = euclidean(p1_actual['center'], p1_anterior['center'])
        vel2 = euclidean(p2_actual['center'], p2_anterior['center'])
        return abs(vel1 - vel2)
    
    def procesar_video_avanzado(self, ruta_video, es_pelea=True):
        """Procesamiento avanzado de video con extracción completa de características"""
        cap = cv2.VideoCapture(ruta_video)
        
        if not cap.isOpened():
            print(f"❌ Error al abrir video: {ruta_video}")
            return None, None
        
        print(f"🎥 Procesando: {ruta_video} ({'Pelea' if es_pelea else 'Normal'})")
        
        caracteristicas_completas = []
        etiquetas = []
        frame_anterior = None
        personas_anterior = None
        frame_count = 0
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_count += 1
            
            # Procesar cada 3 frames para mayor densidad de datos
            if frame_count % 3 != 0:
                continue
            
            # Redimensionar
            frame_resized = cv2.resize(frame, (640, 480))
            
            # 1. Detectar personas
            personas_actual = self.detectar_personas_avanzado(frame_resized)
            
            # 2. Características de movimiento
            mov_features = self.extraer_caracteristicas_movimiento(frame_resized, frame_anterior)
            
            # 3. Características de interacción
            int_features = self.analizar_interacciones_avanzadas(personas_actual, personas_anterior)
            
            # 4. Características temporales
            temp_features = self.extraer_caracteristicas_temporales(personas_actual)
            
            # 5. Características contextuales
            ctx_features = self.extraer_caracteristicas_contextuales(frame_resized, personas_actual)
            
            # Combinar todas las características
            caracteristicas_frame = np.concatenate([
                mov_features,      # 8 características
                int_features,      # 10 características
                temp_features,     # 5 características
                ctx_features       # 7 características
            ])  # Total: 30 características
            
            caracteristicas_completas.append(caracteristicas_frame)
            
            # Etiquetado inteligente basado en contenido
            if es_pelea:
                # Para videos de pelea, etiquetar frames con alta actividad
                score_actividad = (
                    np.sum(mov_features[:4]) / 4 +  # Promedio características movimiento
                    np.sum(int_features[:4]) / 4 +  # Promedio características interacción
                    len(personas_actual) / 10       # Factor personas (normalizado)
                )
                
                # Etiquetar como pelea si supera el percentil 40 de actividad
                etiqueta = 1 if score_actividad > 0.3 else 0
                
                # Forzar algunas etiquetas positivas para balance
                if frame_count % 20 == 0 and len(personas_actual) >= 2:
                    etiqueta = 1
            else:
                etiqueta = 0
            
            etiquetas.append(etiqueta)
            
            # Actualizar frames anteriores
            frame_anterior = frame_resized.copy()
            personas_anterior = personas_actual.copy()
            
            # Progreso
            if frame_count % 150 == 0:
                print(f"  📊 Procesados {frame_count} frames...")
        
        cap.release()
        
        print(f"  ✅ Completado: {len(caracteristicas_completas)} muestras extraídas")
        return np.array(caracteristicas_completas), np.array(etiquetas)
    
    def extraer_caracteristicas_temporales(self, personas):
        """Extrae características relacionadas con patrones temporales"""
        # Agregar al buffer
        self.frame_buffer.append(len(personas))
        
        if len(self.frame_buffer) < 5:
            return np.zeros(5)
        
        # Variación en número de personas
        variacion_personas = np.std(list(self.frame_buffer))
        
        # Tendencia (regresión lineal simple)
        x = np.arange(len(self.frame_buffer))
        y = np.array(list(self.frame_buffer))
        tendencia = np.polyfit(x, y, 1)[0] if len(x) > 1 else 0
        
        # Periodicidad (autocorrelación simple)
        if len(self.frame_buffer) >= 10:
            autocorr = np.corrcoef(y[:-5], y[5:])[0, 1]
            autocorr = autocorr if not np.isnan(autocorr) else 0
        else:
            autocorr = 0
        
        # Entropía temporal
        hist, _ = np.histogram(y, bins=5, range=(0, 10))
        hist_norm = hist / np.sum(hist) if np.sum(hist) > 0 else hist
        entropia_temporal = -np.sum(hist_norm * np.log2(hist_norm + 1e-7))
        
        # Estabilidad (coeficiente de variación)
        estabilidad = np.std(y) / (np.mean(y) + 1e-7)
        
        return np.array([variacion_personas, tendencia, autocorr, entropia_temporal, estabilidad])
    
    def extraer_caracteristicas_contextuales(self, frame, personas):
        """Extrae características del contexto de la escena"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # 1. Brillo promedio de la escena
        brillo_promedio = np.mean(gray)
        
        # 2. Contraste (desviación estándar del brillo)
        contraste = np.std(gray)
        
        # 3. Actividad en los bordes
        edges = cv2.Canny(gray, 50, 150)
        actividad_bordes = np.sum(edges) / (edges.shape[0] * edges.shape[1])
        
        # 4. Complejidad de la escena (entropía de la imagen)
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        hist_norm = hist / np.sum(hist)
        entropia_escena = -np.sum(hist_norm * np.log2(hist_norm + 1e-7))
        
        # 5. Densidad de personas en frame
        area_total_personas = sum([p['area'] for p in personas])
        densidad_visual = area_total_personas / (frame.shape[0] * frame.shape[1])
        
        # 6. Distribución espacial de personas
        if len(personas) > 0:
            centros_x = [p['center'][0] for p in personas]
            centros_y = [p['center'][1] for p in personas]
            dispersion_x = np.std(centros_x) / frame.shape[1]
            dispersion_y = np.std(centros_y) / frame.shape[0]
        else:
            dispersion_x = dispersion_y = 0
        
        return np.array([
            brillo_promedio, contraste, actividad_bordes, entropia_escena,
            densidad_visual, dispersion_x, dispersion_y
        ])
    
    def entrenar_modelos_avanzados(self, X, y):
        """Entrena múltiples modelos de ML con optimización de hiperparámetros"""
        print("\n🤖 INICIANDO ENTRENAMIENTO DE MODELOS AVANZADOS")
        print("=" * 60)
        
        # Dividir datos
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Normalizar características
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Definir modelos con hiperparámetros optimizados
        modelos_config = {
            'RandomForest': {
                'model': RandomForestClassifier(random_state=42),
                'params': {
                    'n_estimators': [100, 200, 300],
                    'max_depth': [10, 20, None],
                    'min_samples_split': [2, 5, 10]
                }
            },
            'GradientBoosting': {
                'model': GradientBoostingClassifier(random_state=42),
                'params': {
                    'n_estimators': [100, 200],
                    'learning_rate': [0.05, 0.1, 0.2],
                    'max_depth': [3, 5, 7]
                }
            },
            'SVM': {
                'model': SVC(random_state=42, probability=True),
                'params': {
                    'C': [0.1, 1, 10],
                    'kernel': ['rbf', 'poly'],
                    'gamma': ['scale', 'auto']
                }
            },
            'NeuralNetwork': {
                'model': MLPClassifier(random_state=42, max_iter=1000),
                'params': {
                    'hidden_layer_sizes': [(50,), (100,), (50, 25)],
                    'alpha': [0.0001, 0.001, 0.01],
                    'learning_rate': ['constant', 'adaptive']
                }
            }
        }
        
        mejores_modelos = {}
        resultados = {}
        
        for nombre, config in modelos_config.items():
            print(f"\n🔧 Optimizando {nombre}...")
            
            # Grid Search con validación cruzada
            grid_search = GridSearchCV(
                config['model'], config['params'], 
                cv=5, scoring='accuracy', n_jobs=-1
            )
            
            grid_search.fit(X_train_scaled, y_train)
            
            # Mejor modelo
            mejor_modelo = grid_search.best_estimator_
            mejores_modelos[nombre] = mejor_modelo
            
            # Evaluación
            y_pred = mejor_modelo.predict(X_test_scaled)
            accuracy = accuracy_score(y_test, y_pred)
            
            # Validación cruzada
            cv_scores = cross_val_score(mejor_modelo, X_train_scaled, y_train, cv=5)
            
            resultados[nombre] = {
                'accuracy': accuracy,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'best_params': grid_search.best_params_
            }
            
            print(f"  ✅ Accuracy: {accuracy:.3f}")
            print(f"  📊 CV Score: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
        
        # Crear ensemble (voting classifier)
        print(f"\n🎯 Creando modelo ensemble...")
        ensemble = VotingClassifier(
            estimators=[(nombre, modelo) for nombre, modelo in mejores_modelos.items()],
            voting='soft'
        )
        ensemble.fit(X_train_scaled, y_train)
        
        # Evaluar ensemble
        y_pred_ensemble = ensemble.predict(X_test_scaled)
        accuracy_ensemble = accuracy_score(y_test, y_pred_ensemble)
        
        print(f"  🏆 Ensemble Accuracy: {accuracy_ensemble:.3f}")
        
        # Guardar mejor modelo
        mejor_individual = max(resultados.items(), key=lambda x: x[1]['accuracy'])
        
        self.models = {
            'individual_models': mejores_modelos,
            'ensemble': ensemble,
            'scaler': self.scaler,
            'best_individual': mejor_individual[0],
            'results': resultados,
            'ensemble_accuracy': accuracy_ensemble
        }
        
        return resultados, accuracy_ensemble
    
    def entrenar_sistema_completo(self):
        """Entrenamiento completo del sistema"""
        print("🚀 INICIANDO ENTRENAMIENTO COMPLETO DEL SISTEMA")
        print("=" * 70)
        
        # Videos disponibles
        videos_pelea = ['pelea1.mp4', 'pelea2.mp4', 'pelea3.mp4', 'pelea4.mp4', 'pelea5.mp4']
        
        X_total = []
        y_total = []
        estadisticas_videos = {}
        
        # Procesar videos de peleas
        for video in videos_pelea:
            if os.path.exists(video):
                X_video, y_video = self.procesar_video_avanzado(video, es_pelea=True)
                if X_video is not None:
                    X_total.append(X_video)
                    y_total.append(y_video)
                    
                    estadisticas_videos[video] = {
                        'samples': len(X_video),
                        'positive_ratio': np.mean(y_video),
                        'feature_means': np.mean(X_video, axis=0)
                    }
        
        # Combinar datos
        if X_total:
            X_combinado = np.vstack(X_total)
            y_combinado = np.hstack(y_total)
            
            print(f"\n📊 DATOS DE ENTRENAMIENTO:")
            print(f"  Total muestras: {len(X_combinado)}")
            print(f"  Características por muestra: {X_combinado.shape[1]}")
            print(f"  Muestras positivas (pelea): {np.sum(y_combinado)}")
            print(f"  Muestras negativas: {len(y_combinado) - np.sum(y_combinado)}")
            print(f"  Ratio de peleas: {np.mean(y_combinado):.3f}")
            
            # Entrenar modelos
            resultados, ensemble_acc = self.entrenar_modelos_avanzados(X_combinado, y_combinado)
            
            # Crear modelo final
            modelo_final = {
                'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'models': self.models,
                'feature_names': self.generar_nombres_caracteristicas(),
                'statistics': {
                    'videos_processed': len(estadisticas_videos),
                    'total_samples': len(X_combinado),
                    'feature_dimensions': X_combinado.shape[1],
                    'class_distribution': {
                        'fight': int(np.sum(y_combinado)),
                        'normal': int(len(y_combinado) - np.sum(y_combinado))
                    },
                    'video_stats': estadisticas_videos,
                    'model_performance': resultados,
                    'ensemble_accuracy': ensemble_acc
                },
                'parameters': {
                    'motion_threshold': self.motion_threshold,
                    'violence_threshold': self.violence_threshold,
                    'yolo_model': 'yolov8n.pt'
                }
            }
            
            # Guardar modelo
            with open('detector_peleas_modelo.pkt', 'wb') as f:
                pickle.dump(modelo_final, f)
            
            print(f"\n💾 MODELO GUARDADO EXITOSAMENTE")
            print(f"📁 Archivo: detector_peleas_modelo.pkt")
            
            # Mostrar resumen final
            self.mostrar_resumen_entrenamiento(modelo_final)
            
            return modelo_final
        else:
            print("❌ No se encontraron videos válidos para entrenar")
            return None
    
    def generar_nombres_caracteristicas(self):
        """Genera nombres descriptivos para las características"""
        mov_names = [
            'optical_flow_avg', 'optical_flow_max', 'optical_flow_std',
            'pixel_movement', 'gradient_avg', 'texture_change',
            'entropy_movement', 'angle_avg'
        ]
        
        int_names = [
            'min_distance', 'avg_distance', 'max_overlap', 'avg_overlap',
            'person_density', 'size_variation', 'group_dispersion',
            'avg_relative_velocity', 'max_relative_velocity', 'person_count'
        ]
        
        temp_names = [
            'person_variation', 'trend', 'autocorrelation',
            'temporal_entropy', 'stability'
        ]
        
        ctx_names = [
            'brightness', 'contrast', 'edge_activity', 'scene_entropy',
            'visual_density', 'spatial_dispersion_x', 'spatial_dispersion_y'
        ]
        
        return mov_names + int_names + temp_names + ctx_names
    
    def mostrar_resumen_entrenamiento(self, modelo):
        """Muestra un resumen detallado del entrenamiento"""
        print("\n🎯 RESUMEN FINAL DEL ENTRENAMIENTO")
        print("=" * 70)
        
        stats = modelo['statistics']
        
        print(f"📹 Videos procesados: {stats['videos_processed']}")
        print(f"📊 Muestras totales: {stats['total_samples']}")
        print(f"🔢 Dimensiones de características: {stats['feature_dimensions']}")
        
        print(f"\n📈 DISTRIBUCIÓN DE CLASES:")
        fight_count = stats['class_distribution']['fight']
        normal_count = stats['class_distribution']['normal']
        total = fight_count + normal_count
        print(f"  🥊 Peleas: {fight_count} ({fight_count/total*100:.1f}%)")
        print(f"  😌 Normal: {normal_count} ({normal_count/total*100:.1f}%)")
        
        print(f"\n🏆 RENDIMIENTO DE MODELOS:")
        for modelo_nombre, resultado in stats['model_performance'].items():
            print(f"  {modelo_nombre}: {resultado['accuracy']:.3f} ± {resultado['cv_std']:.3f}")
        
        print(f"  🎯 Ensemble: {stats['ensemble_accuracy']:.3f}")
        
        print(f"\n⏰ Entrenamiento completado: {modelo['timestamp']}")
        print("🎉 ¡Sistema listo para detección en tiempo real!")

if __name__ == "__main__":
    detector = DetectorPeleasAvanzado()
    modelo = detector.entrenar_sistema_completo()

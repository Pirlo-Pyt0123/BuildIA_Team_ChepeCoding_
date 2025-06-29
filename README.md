# 🎓 BuildIA Team - Plataforma Educativa Inteligente

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Componentes Principales](#componentes-principales)
- [Modelos de IA](#modelos-de-ia)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso del Sistema](#uso-del-sistema)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribución](#contribución)

## 🎯 Descripción General

BuildIA Team es una **plataforma educativa inteligente** desarrollada por ChepeCoding que integra tecnologías de inteligencia artificial para crear un entorno de aprendizaje gamificado e interactivo. El sistema está diseñado para facilitar la educación mediante la implementación de:

- **Sistema de gamificación** con puntos XP, niveles y logros
- **Análisis de comportamiento** mediante procesamiento de audio con IA
- **Dashboard personalizado** para estudiantes y profesores
- **Sistema de detección de lenguaje ofensivo** en tiempo real
- **Seguimiento y analytics** del progreso académico

### 🎮 Características Principales

- ✨ **Gamificación Completa**: Sistema de puntos, niveles, logros y rankings
- 🔊 **Análisis de Audio IA**: Transcripción y análisis de comportamiento en tiempo real
- 📊 **Analytics Avanzado**: Dashboards personalizados para estudiantes y profesores
- 🛡️ **Detección de Contenido**: Sistema de filtrado de lenguaje ofensivo
- 🏆 **Sistema de Recompensas**: Tienda virtual, marcos, banners y monedas
- 📱 **Interfaz Moderna**: UI/UX responsive con animaciones y efectos visuales

## 🏗️ Arquitectura del Sistema

### Frontend (React + TypeScript)
```
┌─────────────────────────────────────────┐
│                Frontend                 │
├─────────────────────────────────────────┤
│  • React 18 + TypeScript               │
│  • Vite (Build Tool)                   │
│  • Tailwind CSS + Framer Motion        │
│  • React Router (Navigation)           │
│  • Lucide React (Icons)                │
└─────────────────────────────────────────┘
```

### Backend (Flask + IA)
```
┌─────────────────────────────────────────┐
│              Backend IA                 │
├─────────────────────────────────────────┤
│  • Flask Server                        │
│  • PyAudio (Audio Processing)          │
│  • Transformers (Hugging Face)         │
│  • Faster-Whisper (Speech-to-Text)     │
│  • PyTorch (Deep Learning)             │
└─────────────────────────────────────────┘
```

### Modelos de IA
```
┌─────────────────────────────────────────┐
│            Modelos de IA                │
├─────────────────────────────────────────┤
│  • BERT Tokenizer (Análisis de Texto)  │
│  • Audio Classification Models         │
│  • Behavior Detection System           │
│  • Speech Recognition (Whisper)        │
└─────────────────────────────────────────┘
```

## 🧩 Componentes Principales

### 🎓 Panel de Estudiantes
- **Dashboard Personal**: Estadísticas, progreso y logros
- **Sistema de Desafíos**: Challenges gamificados por materias
- **Rankings**: Clasificaciones por curso, colegio y nacional
- **Tienda Virtual**: Compra de marcos, banners y personalizaciones
- **Perfil Personalizable**: Avatar, estadísticas y configuraciones

### 👨‍🏫 Panel de Profesores
- **Dashboard Administrativo**: Vista general de todas las clases
- **Gestión de Estudiantes**: Seguimiento individual y grupal
- **Sistema de Reportes**: Analytics detallados de rendimiento
- **Sistema de Observaciones**: Análisis de comportamiento con IA
- **Herramientas de Comunicación**: Mensajería y notificaciones

### 🤖 Sistema de IA
- **Transcripción de Audio**: Conversión de voz a texto en tiempo real
- **Análisis de Comportamiento**: Detección de patrones de conducta
- **Filtrado de Contenido**: Identificación de lenguaje ofensivo
- **Recomendaciones Inteligentes**: Sugerencias personalizadas

## 🤖 Modelos de IA

### 📁 Directorio Models/

#### 🎙️ **Modelos de Audio**
```
├── Atzel.wav, Atzel2.wav
├── Carla.wav
├── Manuel.wav, Manuel2.wav
├── Mendes.wav, Mendez2.wav
└── Pirlo.wav, Pirlo2.wav
```
**Propósito**: Muestras de audio para entrenamiento y testing de modelos de reconocimiento de voz y análisis de comportamiento.

#### 📝 **Datasets de Entrenamiento**
```
├── normal.txt      # 261 líneas de diálogos educativos normales
└── ofensivo.txt    # 325 líneas de contenido ofensivo para detección
```

**normal.txt** - Contiene ejemplos de interacciones educativas apropiadas:
- Instrucciones de clase
- Diálogos profesor-estudiante
- Contenido educativo inclusivo
- Ejemplos de comunicación respetuosa

**ofensivo.txt** - Dataset para entrenar el filtro de contenido:
- Ejemplos de lenguaje inapropiado
- Contenido discriminatorio
- Patrones de bullying
- Expresiones que requieren intervención

#### 🔤 **BERT Tokenizer**
```
└── bert_tokenizer_manual_primero/
    ├── special_tokens_map.json
    ├── tokenizer_config.json
    └── vocab.txt
```

**Configuración**:
- **Tokens Especiales**: [MASK], [PAD], [UNK], [CLS], [SEP]
- **Vocabulario**: Optimizado para contenido educativo en español
- **Uso**: Análisis de texto y clasificación de contenido

### 🛠️ **Pipeline de IA**

#### 1. **Captura de Audio**
```python
# Configuración de PyAudio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
```

#### 2. **Procesamiento de Voz**
```python
# Faster-Whisper para transcripción
modelo_whisper = WhisperModel("base")
segments, info = modelo_whisper.transcribe(audio)
```

#### 3. **Análisis de Contenido**
```python
# BERT para clasificación
tokenizer = BertTokenizer.from_pretrained('./bert_tokenizer_manual_primero/')
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)
```

#### 4. **Detección de Comportamiento**
- Análisis de patrones de voz
- Detección de emociones
- Clasificación de contenido
- Alertas automáticas

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18+)
- Python (v3.8+)
- Git
- VS Code (recomendado)

### 📦 Instalación del Frontend

```bash
cd Code/EXAMPLEPOO
npm install
```

**Dependencias principales**:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "framer-motion": "^10.16.5",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.5",
  "typescript": "^5.2.2",
  "vite": "^5.0.0"
}
```

### 🐍 Instalación del Backend

```bash
cd Code/EXAMPLEPOO
pip install -r requirements.txt
```

**Dependencias de IA**:
```
flask==2.3.3
flask-cors==4.0.0
flask-socketio==5.3.6
pyaudio==0.2.11
torch>=2.0.0
transformers==4.33.2
faster-whisper==0.9.0
numpy==1.24.3
```

### ⚙️ Configuración

1. **Variables de Entorno**:
```bash
# .env
FLASK_SERVER_URL=http://localhost:5000
DATABASE_URL=postgresql://localhost/buildia
API_KEY=your_api_key_here
```

2. **Base de Datos**:
```bash
# Si usas Prisma
npx prisma generate
npx prisma db push
npm run seed
```

## ▶️ Uso del Sistema

### 🎯 Iniciar el Proyecto

#### Frontend (Desarrollo):
```bash
npm run dev
# Servidor en http://localhost:5173
```

#### Backend Flask:
```bash
python flask_server_advanced.py
# Servidor en http://localhost:5000
```

#### Producción:
```bash
npm run build
npm run preview
```

### 👤 Credenciales de Prueba

**Estudiante**:
- Email: `alex.rivera@colegio.edu`
- Password: `student123`

**Profesor**:
- Email: `prof.garcia@colegio.edu`
- Password: `profesor123`

### 🎮 Funcionalidades Principales

#### Para Estudiantes:
1. **Login** → Acceder al sistema
2. **Dashboard** → Ver progreso y estadísticas
3. **Desafíos** → Completar challenges gamificados
4. **Rankings** → Ver posición en clasificaciones
5. **Tienda** → Personalizar perfil
6. **Perfil** → Gestionar configuraciones

#### Para Profesores:
1. **Dashboard** → Vista general de clases
2. **Estudiantes** → Gestión individual
3. **Reportes** → Analytics y estadísticas
4. **Observaciones** → Sistema de IA en tiempo real
5. **Mensajes** → Comunicación con estudiantes

## 📁 Estructura del Proyecto

```
BuildIA_Team_ChepeCoding_/
├── 📄 README.md
├── 📁 Code/
│   └── 📁 EXAMPLEPOO/                    # Aplicación principal
│       ├── 📄 package.json               # Dependencias Node.js
│       ├── 📄 requirements.txt           # Dependencias Python
│       ├── 📄 tsconfig.json             # Configuración TypeScript
│       ├── 📄 tailwind.config.js        # Configuración Tailwind
│       ├── 📄 vite.config.ts            # Configuración Vite
│       ├── 📄 flask_server_advanced.py  # Servidor Flask con IA
│       ├── 📄 simple-seed.ts            # Script de datos iniciales
│       ├── 📁 public/                   # Recursos estáticos
│       │   ├── 🖼️ BUILDEDU.png
│       │   ├── 🖼️ logoRE.png
│       │   └── 📁 vids/                 # Videos de demostración
│       └── 📁 src/                      # Código fuente
│           ├── 📄 App.tsx               # Componente principal
│           ├── 📄 main.tsx              # Punto de entrada
│           ├── 📄 index.css             # Estilos globales
│           ├── 📁 components/           # Componentes React
│           │   ├── 📁 student/          # Componentes de estudiantes
│           │   │   ├── ChallengesView.tsx
│           │   │   ├── DashboardView.tsx
│           │   │   ├── RankingsView.tsx
│           │   │   ├── ShopView.tsx
│           │   │   └── ProfileView.tsx
│           │   ├── 📁 teacher/          # Componentes de profesores
│           │   │   ├── DashboardView.tsx
│           │   │   ├── ClassStats.tsx
│           │   │   ├── ReportsView.tsx
│           │   │   └── ObservacionesView*.tsx
│           │   └── 📁 ui/               # Componentes de UI
│           ├── 📁 data/                 # Gestión de datos
│           │   ├── database.ts          # Base de datos principal
│           │   ├── api-client.ts        # Cliente API
│           │   └── prisma-database.ts   # Configuración Prisma
│           ├── 📁 pages/                # Páginas principales
│           │   ├── LoginPage.tsx
│           │   ├── StudentDashboard*.tsx
│           │   └── TeacherDashboard*.tsx
│           └── 📁 styles/               # Estilos adicionales
│               └── epic-effects.css
└── 📁 Models/                           # Modelos de IA
    ├── 🎵 *.wav                        # Archivos de audio (8 archivos)
    ├── 📄 normal.txt                   # Dataset de texto normal
    ├── 📄 ofensivo.txt                 # Dataset de texto ofensivo
    └── 📁 bert_tokenizer_manual_primero/ # Tokenizer BERT
        ├── special_tokens_map.json
        ├── tokenizer_config.json
        └── vocab.txt
```

### 🎨 **Arquitectura de Componentes**

#### **Frontend (React)**
```
App
├── LoginPage
├── StudentDashboard
│   ├── DashboardView
│   ├── ChallengesView
│   ├── RankingsView
│   ├── ShopView
│   └── ProfileView
└── TeacherDashboard
    ├── DashboardView
    ├── ClassStats
    ├── StudentsOverview
    ├── ReportsView
    └── ObservacionesView (AI-powered)
```

#### **Backend (Flask)**
```
Flask Server
├── Audio Processing
│   ├── PyAudio Capture
│   ├── Whisper Transcription
│   └── Real-time Analysis
├── AI Models
│   ├── BERT Classification
│   ├── Behavior Detection
│   └── Content Filtering
└── API Endpoints
    ├── /transcribe
    ├── /analyze_behavior
    └── /get_insights
```

## 🛠️ Tecnologías Utilizadas

### Frontend Stack
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ⚛️ **React** | 18.2.0 | Framework principal |
| 📘 **TypeScript** | 5.2.2 | Tipado estático |
| ⚡ **Vite** | 5.0.0 | Build tool y dev server |
| 🎨 **Tailwind CSS** | 3.3.5 | Framework de estilos |
| 🎭 **Framer Motion** | 10.16.5 | Animaciones |
| 🧭 **React Router** | 6.20.1 | Navegación |
| 🎯 **Lucide React** | 0.294.0 | Iconografía |

### Backend Stack
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| 🐍 **Flask** | 2.3.3 | Framework web |
| 🎙️ **PyAudio** | 0.2.11 | Procesamiento de audio |
| 🔥 **PyTorch** | 2.0.0+ | Deep learning |
| 🤗 **Transformers** | 4.33.2 | Modelos de IA |
| ⚡ **Faster-Whisper** | 0.9.0 | Speech-to-text |
| 🔌 **Flask-SocketIO** | 5.3.6 | WebSockets |

### Base de Datos y ORM
| Tecnología | Propósito |
|------------|-----------|
| 🐘 **PostgreSQL** | Base de datos principal |
| 📊 **Prisma** | ORM y gestión de BD |
| 🗃️ **SQLite** | Base de datos de desarrollo |

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-------------|-----------|
| 📝 **ESLint** | Linting de código |
| 🎨 **PostCSS** | Procesamiento de CSS |
| 📦 **npm** | Gestión de paquetes |
| 🐍 **pip** | Gestión de paquetes Python |

## 📊 Características del Sistema

### 🎮 Sistema de Gamificación
- **Puntos XP**: Sistema de experiencia y niveles
- **Logros**: Achievements desbloqueables
- **Rankings**: Clasificaciones por curso, colegio y país
- **Monedas**: Economía virtual para compras
- **Personalización**: Marcos, banners y avatares

### 🤖 Inteligencia Artificial
- **Análisis de Audio**: Transcripción en tiempo real
- **Detección de Comportamiento**: Identificación de patrones
- **Filtrado de Contenido**: Sistema anti-bullying
- **Recomendaciones**: Sugerencias personalizadas

### 📈 Analytics y Reportes
- **Dashboard Estudiantes**: Progreso personal
- **Dashboard Profesores**: Vista administrativa
- **Reportes Detallados**: Análisis de rendimiento
- **Estadísticas en Tiempo Real**: Métricas actualizadas

### 🎯 Funcionalidades Educativas
- **Desafíos por Materia**: Matemáticas, Historia, Ciencias, Lenguaje
- **Seguimiento de Progreso**: Métricas individuales y grupales
- **Sistema de Comunicación**: Mensajería profesor-estudiante
- **Gestión de Clases**: Herramientas administrativas

## 🚀 Roadmap y Futuras Mejoras

### 📅 Versión 2.0 (Próximamente)
- [ ] Integración con LMS existentes
- [ ] App móvil nativa
- [ ] Análisis predictivo avanzado
- [ ] Multiplayer en desafíos
- [ ] Realidad aumentada

### 🔧 Mejoras Técnicas Planificadas
- [ ] Migración completa a Prisma
- [ ] Implementación de Redis para caché
- [ ] Microservicios para escalabilidad
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo con Prometheus

## 🤝 Contribución

### Para Contribuir:
1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Crea** una rama para tu feature
4. **Desarrolla** y **testa** tus cambios
5. **Envía** un Pull Request

### Estándares de Código:
- **TypeScript** para frontend
- **Python** con type hints para backend
- **ESLint** y **Prettier** para formateo
- **Convenciones** de commit semántico

### 📧 Contacto
- **Equipo**: ChepeCoding Team
- **Email**: contact@chepecoding.com
- **Proyecto**: BuildIA Educational Platform

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🎉 Agradecimientos

Desarrollado con ❤️ por el **Team ChepeCoding** para revolucionar la educación mediante inteligencia artificial.

**¡Gracias por ser parte de la revolución educativa!** 🚀📚✨
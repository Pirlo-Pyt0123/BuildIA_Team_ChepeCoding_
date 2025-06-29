import { motion } from 'framer-motion';
import { FileText, Mic, Play, Square, Wifi, WifiOff, Zap } from 'lucide-react';
import { useState } from 'react';

interface AIObservationModel {
  id: string;
  name: string;
  description: string;
  placeholder: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface ObservationData {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  date: string;
  time: string;
  audioTranscription: string;
  behaviorScore: number;
  behaviorDescription: string;
  offensiveWords: string[];
  hasOffensiveContent: boolean;
  audioFile: string;
  videoFile?: string; // Campo opcional para el video
  duration: number;
  context: string;
  severity: 'high' | 'medium' | 'low';
  teacherNotes: string;
}

export default function ObservacionesView() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [observationText, setObservationText] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');
  const [isConnected, setIsConnected] = useState(false);

  // Datos mock de observaciones CRÍTICAS para la galería (solo 3 videos de trampa con celular)
  const observationsData: ObservationData[] = [
    {
      id: '1',
      studentId: '3',
      studentName: 'Tiburcio G',
      studentAvatar: '👨‍🎓',
      date: '2025-06-28',
      time: '11:20',
      audioTranscription: 'Tiburcio G fue descubierto con un celular escondido bajo su escritorio consultando respuestas durante el examen. Al intentar confiscarlo, se mostró agresivo y utilizó lenguaje ofensivo.',
      behaviorScore: 1,
      behaviorDescription: 'Trampa en examen: Uso de celular para consultar respuestas, actitud desafiante al ser descubierto',
      offensiveWords: ['qué carajo', 'déjame en paz', 'estúpida regla'],
      hasOffensiveContent: true,
      audioFile: '/audio/tiburcio_celular_20250628_1120.mp3',
      videoFile: '/vids/tiburcio_trampa_celular.mp4',
      duration: 90,
      context: 'Examen Matemáticas - Trampa con Celular',
      severity: 'high' as const,
      teacherNotes: 'TRAMPA CON CELULAR: Dispositivo confiscado. Examen anulado. Citar padres urgente. Aplicar protocolo de integridad académica.'
    },
    {
      id: '2',
      studentId: '6',
      studentName: 'Jhony Kuno',
      studentAvatar: '👨‍🎓',
      date: '2025-06-27',
      time: '13:45',
      audioTranscription: 'Jhony Kuno tenía un teléfono móvil oculto en su chaqueta y lo usaba para buscar respuestas en internet. Cuando fue confrontado, negó todo y se puso defensivo con palabras ofensivas.',
      behaviorScore: 1,
      behaviorDescription: 'Trampa en examen: Uso de teléfono móvil oculto para buscar respuestas en internet',
      offensiveWords: ['no es cierto', 'me estás molestando', 'qué fastidio'],
      hasOffensiveContent: true,
      audioFile: '/audio/jhony_celular_20250627_1345.mp3',
      videoFile: '/vids/jhony_trampa_celular.mp4',
      duration: 120,
      context: 'Examen Historia - Trampa con Celular',
      severity: 'high' as const,
      teacherNotes: 'TRAMPA CON CELULAR: Teléfono confiscado con evidencia de búsquedas. Examen anulado. Reunión con padres programada.'
    },
    {
      id: '3',
      studentId: '7',
      studentName: 'Desconocido',
      studentAvatar: '❓',
      date: '2025-06-26',
      time: '09:15',
      audioTranscription: 'Estudiante no identificado fue captado usando un celular durante el examen. Al percatarse de que fue descubierto, intentó esconder el dispositivo y se mostró evasivo.',
      behaviorScore: 2,
      behaviorDescription: 'Trampa en examen: Uso de celular durante evaluación, comportamiento evasivo al ser descubierto',
      offensiveWords: ['no vi nada', 'esto es injusto', 'todos lo hacen'],
      hasOffensiveContent: true,
      audioFile: '/audio/desconocido_celular_20250626_0915.mp3',
      videoFile: '/vids/desconocido_trampa_celular.mp4',
      duration: 75,
      context: 'Examen Física - Trampa con Celular',
      severity: 'high' as const,
      teacherNotes: 'TRAMPA CON CELULAR: Estudiante no identificado. Dispositivo confiscado. Investigar identidad. Protocolo de seguridad activado.'
    }
  ];

  // Modelos de observación IA disponibles
  const observationModels: AIObservationModel[] = [
    {
      id: 'behavior',
      name: 'Análisis de Comportamiento',
      description: 'Detecta patrones de comportamiento y actitudes',
      placeholder: 'Observando comportamiento del estudiante...',
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'audio',
      name: 'Transcripción de Audio',
      description: 'Convierte audio en texto para análisis',
      placeholder: 'Transcribiendo audio en tiempo real...',
      icon: Mic,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30'
    }
  ];

  // Toggle de conexión y grabación
  const handleConnectionToggle = () => {
    if (!isConnected) {
      // Conectar
      setIsConnected(true);
      setConnectionStatus('connected');
      setIsRecording(true);
      setTranscriptionText('Iniciando transcripción...');
      
      // Simular transcripción después de un momento
      setTimeout(() => {
        setTranscriptionText('Escuchando audio del aula...');
      }, 1000);
    } else {
      // Desconectar y detener grabación
      setIsConnected(false);
      setConnectionStatus('disconnected');
      setIsRecording(false);
      setTranscriptionText('');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Sistema de Observaciones IA</h2>
          <p className="text-gray-400 mt-1">
            Análisis automático de comportamiento y transcripción en tiempo real
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            connectionStatus === 'connected' 
              ? 'bg-green-500/20 text-green-400' 
              : connectionStatus === 'error'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {connectionStatus === 'connected' ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span className="text-sm capitalize">{connectionStatus}</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grabación y Conexión */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Control de Grabación</h3>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConnectionToggle}
                className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                  isConnected
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isConnected ? (
                  <>
                    <Square className="h-5 w-5" />
                    <span>Detener y Desconectar</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Conectar y Grabar</span>
                  </>
                )}
              </motion.button>

              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center space-x-2 text-red-400"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-2 bg-red-500 rounded-full"
                  />
                  <span className="text-sm">Grabando...</span>
                </motion.div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Modelos Disponibles</h4>
              {observationModels.map((model) => (
                <div
                  key={model.id}
                  className={`p-3 rounded-lg border ${model.bgColor} ${model.borderColor}`}
                >
                  <div className="flex items-center space-x-2">
                    <model.icon className={`h-4 w-4 ${model.color}`} />
                    <span className="text-sm font-medium text-white">{model.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transcripción en Tiempo Real */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Transcripción en Tiempo Real</h3>
              {isRecording && (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">Activo</span>
                </div>
              )}
            </div>
            
            <textarea
              value={transcriptionText}
              onChange={(e) => setTranscriptionText(e.target.value)}
              placeholder="La transcripción aparecerá aquí cuando inicies la grabación..."
              className="w-full h-32 bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Observaciones del Docente</h4>
              <textarea
                value={observationText}
                onChange={(e) => setObservationText(e.target.value)}
                placeholder="Agrega tus observaciones manuales aquí..."
                className="w-full h-24 bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Galería de Observaciones Críticas */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Incidentes Críticos de Trampa</h3>
            <p className="text-gray-400 mt-1">Observaciones de alta prioridad - Uso de celular en exámenes</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
              {observationsData.length} Casos Críticos
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {observationsData.map((obs, index) => (
            <motion.div
              key={obs.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-red-500/30 rounded-xl p-5 hover:border-red-400/50 transition-all duration-300"
            >
              {/* Header del estudiante */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">{obs.studentAvatar}</div>
                <div>
                  <h4 className="font-semibold text-white">{obs.studentName}</h4>
                  <p className="text-sm text-gray-400">{obs.date} • {obs.time}</p>
                </div>
                <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(obs.severity)}`}>
                  CRÍTICO
                </div>
              </div>

              {/* Contexto y detalles */}
              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 font-medium text-sm mb-1">🚨 {obs.context}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{obs.behaviorDescription}</p>
                </div>

                {/* Video Player */}
                {obs.videoFile && (
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Play className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-400 font-rajdhani font-medium">
                        📹 Video de Evidencia - {formatDuration(obs.duration)}
                      </span>
                    </div>
                    <video 
                      controls 
                      className="w-full h-32 bg-gray-900 rounded-lg object-cover"
                      poster="/images/video-placeholder.jpg"
                    >
                      <source src={obs.videoFile} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                )}

                {/* Transcripción */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mic className="w-3 h-3 text-blue-400" />
                    <span className="text-gray-400 text-xs">Audio Transcrito:</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-3">{obs.audioTranscription}</p>
                </div>

                {/* Palabras ofensivas detectadas */}
                {obs.hasOffensiveContent && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-orange-400 text-xs mb-2">Lenguaje detectado:</p>
                    <div className="flex flex-wrap gap-1">
                      {obs.offensiveWords.slice(0, 3).map((word, idx) => (
                        <span key={idx} className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">
                          "{word}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Información del audio */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>🎵 {formatDuration(obs.duration)}</span>
                  <span>Score: {obs.behaviorScore}/5</span>
                </div>

                {/* Notas del docente */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-400 text-xs mb-1">Notas del docente:</p>
                  <p className="text-gray-300 text-xs line-clamp-2">{obs.teacherNotes}</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex space-x-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Ver Detalles
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Tomar Acción
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

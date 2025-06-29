import { motion } from 'framer-motion';
import { FileText, Mic, Play, Square, Wifi, WifiOff, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

interface TranscriptionUpdate {
  text: string;
  classification: string;
  timestamp: number;
  full_text: string;
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

export default function ObservacionesViewAdvanced() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [observationText, setObservationText] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [classification, setClassification] = useState<string>('Normal');
  const [useWebSocket, setUseWebSocket] = useState(true);
  
  // Configuración del servidor Flask
  const FLASK_SERVER_URL = 'http://localhost:5000';
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const transcriptionRef = useRef<HTMLTextAreaElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

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

  // Función para agregar logs de debug
  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLog(prev => [...prev.slice(-4), `[${timestamp}] ${message}`]);
    console.log(`[DEBUG] ${message}`);
  };

  // Inicializar WebSocket
  const initWebSocket = () => {
    if (!useWebSocket) return;
    
    try {
      addDebugLog('🔌 Conectando WebSocket...');
      
      // Cerrar conexión anterior si existe
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      wsRef.current = new WebSocket('ws://localhost:5000/socket.io/?EIO=4&transport=websocket');
      
      wsRef.current.onopen = () => {
        addDebugLog('✅ WebSocket conectado');
        setConnectionStatus('connected');
        
        // Enviar handshake de Socket.IO
        wsRef.current?.send('40'); // Socket.IO handshake
      };
      
      wsRef.current.onmessage = (event) => {
        const data = event.data;
        
        if (data.startsWith('42')) {
          // Socket.IO event message
          try {
            const jsonData = data.substring(2);
            const [eventName, eventData] = JSON.parse(jsonData);
            
            if (eventName === 'transcription_update') {
              handleTranscriptionUpdate(eventData as TranscriptionUpdate);
            } else if (eventName === 'status') {
              addDebugLog(`📊 Estado: ${JSON.stringify(eventData)}`);
            }
          } catch (e) {
            addDebugLog(`⚠️ Error parsing WebSocket: ${e}`);
          }
        }
      };
      
      wsRef.current.onclose = () => {
        addDebugLog('🔌 WebSocket desconectado');
        if (connectionStatus === 'connected') {
          setConnectionStatus('error');
        }
        
        // Intentar reconectar después de 3 segundos si estamos grabando
        if (isRecording && useWebSocket) {
          setTimeout(() => {
            initWebSocket();
          }, 3000);
        }
      };
      
      wsRef.current.onerror = (error) => {
        addDebugLog(`❌ Error WebSocket: ${error}`);
        setConnectionStatus('error');
      };
      
    } catch (error) {
      addDebugLog(`❌ Error inicializando WebSocket: ${error}`);
      setConnectionStatus('error');
    }
  };

  // Manejar actualización de transcripción desde WebSocket
  const handleTranscriptionUpdate = (data: TranscriptionUpdate) => {
    addDebugLog(`📝 WS Update: "${data.text.substring(0, 30)}..." [${data.classification}]`);
    
    setTranscriptionText(data.full_text);
    setClassification(data.classification);
    setLastUpdate(new Date(data.timestamp * 1000));
    setIsUpdating(true);
    
    // Auto-scroll
    setTimeout(() => {
      if (transcriptionRef.current) {
        transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
      }
    }, 10);
    
    // Quitar efecto de actualización
    setTimeout(() => setIsUpdating(false), 500);
  };

  // Función de test de conexión (REST)
  const testConnection = async () => {
    addDebugLog('🔄 Probando conexión REST...');
    
    try {
      const response = await fetch(`${FLASK_SERVER_URL}/status`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        addDebugLog(`✅ REST OK: ${data.message}`);
        
        if (!useWebSocket) {
          setConnectionStatus('connected');
        }
        
        return true;
      } else {
        addDebugLog(`❌ REST Error: ${response.status}`);
        setConnectionStatus('error');
        return false;
      }
    } catch (error: any) {
      addDebugLog(`❌ REST Error: ${error.message}`);
      setConnectionStatus('error');
      return false;
    }
  };

  // Función para obtener transcripción (fallback REST)
  const fetchTranscription = async () => {
    if (useWebSocket && wsRef.current?.readyState === WebSocket.OPEN) {
      return; // No hacer polling si WebSocket está activo
    }
    
    try {
      const response = await fetch(`${FLASK_SERVER_URL}/get_transcription`);
      
      if (response.ok) {
        const data = await response.json();
        const newTranscription = data.transcription || '';
        
        if (newTranscription !== transcriptionText) {
          setTranscriptionText(newTranscription);
          setClassification(data.classification || 'Normal');
          setLastUpdate(new Date());
          setIsUpdating(true);
          
          setTimeout(() => {
            if (transcriptionRef.current) {
              transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
            }
          }, 10);
          
          setTimeout(() => setIsUpdating(false), 500);
        }
        
        if (connectionStatus !== 'connected') {
          setConnectionStatus('connected');
        }
      }
    } catch (error: any) {
      addDebugLog(`❌ Error fetch: ${error.message}`);
      setConnectionStatus('error');
    }
  };

  // Función para iniciar/detener grabación
  const handleRecordToggle = async () => {
    try {
      if (!isRecording) {
        // === CONECTAR Y VERIFICAR SERVIDOR PRIMERO ===
        addDebugLog('🎯 Iniciando proceso de conexión...');
        setConnectionStatus('disconnected'); // Reset status
        
        // Conectar según el modo
        if (useWebSocket) {
          addDebugLog('🔌 Iniciando conexión WebSocket...');
          initWebSocket();
          
          // Esperar un momento para que se conecte
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          if (connectionStatus !== 'connected') {
            addDebugLog('❌ WebSocket no se conectó - intentando REST...');
            setUseWebSocket(false);
            const connectionOk = await testConnection();
            if (!connectionOk) {
              addDebugLog('❌ No se pudo conectar con ningún método');
              return;
            }
          }
        } else {
          const connectionOk = await testConnection();
          if (!connectionOk) {
            addDebugLog('❌ No se pudo conectar vía REST');
            return;
          }
        }
        
        // === INICIAR GRABACIÓN ===
        addDebugLog('🎤 Iniciando grabación...');
        
        const response = await fetch(`${FLASK_SERVER_URL}/start_recording`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          const responseData = await response.json();
          addDebugLog(`✅ Grabación iniciada: ${responseData.message || 'OK'}`);
          
          setIsRecording(true);
          setTranscriptionText('');
          setClassification('Normal');
          setLastUpdate(null);
          
          // Si no usa WebSocket, iniciar polling
          if (!useWebSocket) {
            pollingInterval.current = setInterval(fetchTranscription, 200);
            addDebugLog('🔄 Polling REST iniciado cada 200ms');
          } else {
            addDebugLog('🔌 Usando WebSocket para updates en tiempo real');
          }
        } else {
          const errorData = await response.text();
          addDebugLog(`❌ Error al iniciar grabación: ${response.status} - ${errorData}`);
          setConnectionStatus('error');
        }
        
      } else {
        // === DETENER GRABACIÓN ===
        addDebugLog('🛑 Deteniendo grabación...');
        
        // Detener polling
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
          addDebugLog('🔄 Polling detenido');
        }
        
        try {
          const response = await fetch(`${FLASK_SERVER_URL}/stop_recording`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            addDebugLog('✅ Grabación detenida correctamente');
          } else {
            addDebugLog(`⚠️ Error al detener (${response.status}) pero continuamos`);
          }
        } catch (error) {
          addDebugLog(`⚠️ Error al detener grabación: ${error}`);
        }
        
        setIsRecording(false);
        addDebugLog('🏁 Grabación finalizada');
      }
    } catch (error: any) {
      addDebugLog(`❌ Error general: ${error.message}`);
      setConnectionStatus('error');
      setIsRecording(false);
      
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
        pollingInterval.current = null;
      }
    }
  };

  // Función para limpiar transcripción
  const clearTranscription = async () => {
    try {
      await fetch(`${FLASK_SERVER_URL}/clear_transcription`, { method: 'POST' });
      setTranscriptionText('');
      setClassification('Normal');
    } catch (error) {
      console.error('Error clearing transcription:', error);
    }
  };

  // Función para agregar texto de prueba
  const addTestText = async () => {
    try {
      const response = await fetch(`${FLASK_SERVER_URL}/add_test_text`, { method: 'POST' });
      if (response.ok) {
        addDebugLog('✅ Texto de prueba agregado');
      }
    } catch (error) {
      addDebugLog(`❌ Error agregando texto: ${error}`);
    }
  };

  // Efectos
  useEffect(() => {
    addDebugLog('🚀 Iniciando ObservacionesView Avanzado...');
    addDebugLog('💡 Presiona el botón del micrófono para conectar y grabar');
    
    // Limpiar al desmontar
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      addDebugLog('🛑 Componente desmontado');
    };
  }, []);

  const models: AIObservationModel[] = [
    {
      id: 'transcription',
      name: 'Transcripción de Audio Avanzada',
      description: 'Whisper AI + BERT para clasificación en tiempo real',
      placeholder: 'Presiona "Grabar" para comenzar la transcripción con IA...',
      icon: Mic,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'observation',
      name: 'Análisis de Observaciones',
      description: 'Genera observaciones pedagógicas inteligentes',
      placeholder: 'Describe la situación o comportamiento del estudiante...',
      icon: FileText,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold font-orbitron gradient-text-accent">
            Observaciones IA Avanzado
          </h2>
          <p className="text-gray-400 mt-1 font-rajdhani">
            Whisper + BERT + WebSocket para transcripción en tiempo real
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Toggle WebSocket/REST */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setUseWebSocket(!useWebSocket)}
              className={`p-2 rounded-lg transition-all ${
                useWebSocket ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {useWebSocket ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </button>
            <span className="text-xs font-rajdhani text-gray-400">
              {useWebSocket ? 'WebSocket' : 'REST'}
            </span>
          </div>
          
          {/* Estado del servidor */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' :
              connectionStatus === 'error' ? 'bg-red-400' :
              'bg-yellow-400 animate-pulse'
            }`}></div>
            <span className={`text-sm font-rajdhani ${
              connectionStatus === 'connected' ? 'text-green-400' :
              connectionStatus === 'error' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              {connectionStatus === 'connected' ? 'Servidor Conectado' :
               connectionStatus === 'error' ? 'Error de Conexión' :
               'Conectando...'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Modelos de IA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`glass-effect rounded-xl p-6 cyber-border ${model.bgColor} ${model.borderColor} hover:bg-opacity-20 transition-all`}
          >
            {/* Header del modelo */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${model.bgColor} ${model.borderColor} border rounded-xl flex items-center justify-center`}>
                  <model.icon className={`w-6 h-6 ${model.color}`} />
                </div>
                <div>
                  <h3 className="font-bold font-orbitron text-lg text-white">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-rajdhani">
                    {model.description}
                  </p>
                </div>
              </div>

              {/* Controles para transcripción */}
              {model.id === 'transcription' && (
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: connectionStatus !== 'disconnected' && connectionStatus !== 'error' ? 1.05 : 1.02 }}
                    whileTap={{ scale: connectionStatus !== 'disconnected' && connectionStatus !== 'error' ? 0.95 : 0.98 }}
                    onClick={handleRecordToggle}
                    className={`px-4 py-3 rounded-xl transition-all font-rajdhani font-medium text-sm flex items-center space-x-2 border ${
                      isRecording 
                        ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-lg shadow-red-500/20' 
                        : connectionStatus === 'connected'
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30'
                          : connectionStatus === 'disconnected'
                            ? 'bg-green-500/10 border-green-500/30 text-green-300 hover:bg-green-500/20'
                            : connectionStatus === 'error'
                              ? 'bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20'
                              : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300 opacity-60'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-4 h-4" />
                        <span>Detener Grabación</span>
                      </>
                    ) : connectionStatus === 'connected' ? (
                      <>
                        <Mic className="w-4 h-4" />
                        <span>Iniciar Grabación</span>
                      </>
                    ) : connectionStatus === 'disconnected' ? (
                      <>
                        <Mic className="w-4 h-4" />
                        <span>Conectar y Grabar</span>
                      </>
                    ) : connectionStatus === 'error' ? (
                      <>
                        <WifiOff className="w-4 h-4" />
                        <span>Reconectar</span>
                      </>
                    ) : (
                      <>
                        <Wifi className="w-4 h-4 animate-pulse" />
                        <span>Conectando...</span>
                      </>
                    )}
                  </motion.button>
                  
                  {/* Botón de test solo cuando está grabando */}
                  {isRecording && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={addTestText}
                      className="px-3 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-all font-rajdhani font-medium text-sm"
                    >
                      + Test
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Área de texto */}
            <div className="space-y-4">
              <textarea
                ref={model.id === 'transcription' ? transcriptionRef : undefined}
                value={model.id === 'transcription' ? transcriptionText : observationText}
                onChange={(e) => {
                  if (model.id === 'transcription') {
                    setTranscriptionText(e.target.value);
                  } else {
                    setObservationText(e.target.value);
                  }
                }}
                placeholder={model.placeholder}
                className={`w-full h-40 p-4 bg-gray-950/70 border rounded-xl focus:border-blue-500 focus:outline-none transition-all font-rajdhani text-gray-100 resize-none placeholder-gray-500 ${
                  model.id === 'transcription' && isRecording ? 'cursor-not-allowed opacity-80' : ''
                } ${
                  model.id === 'transcription' && isUpdating ? 'border-blue-400 shadow-lg shadow-blue-500/20' : 'border-gray-700/50'
                }`}
                disabled={model.id === 'transcription' && isRecording}
              />

              {/* Clasificación */}
              {model.id === 'transcription' && classification && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-rajdhani text-gray-400">Clasificación:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-rajdhani font-medium ${
                    classification === 'Ofensivo' ? 'bg-red-500/20 text-red-400' :
                    classification === 'Normal' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {classification}
                  </span>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    className={`px-4 py-2 ${model.bgColor} ${model.borderColor} border rounded-lg ${model.color} hover:bg-opacity-30 transition-all font-rajdhani font-medium flex items-center space-x-2`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>Analizar con IA</span>
                  </button>
                  
                  {model.id === 'transcription' && transcriptionText && (
                    <button
                      onClick={clearTranscription}
                      className="px-3 py-2 bg-gray-500/20 border border-gray-500/50 rounded-lg text-gray-400 hover:bg-gray-500/30 transition-all font-rajdhani font-medium text-sm"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="text-xs text-gray-500 font-rajdhani">
                  {model.id === 'transcription' ? (
                    <div className="flex items-center space-x-3">
                      <span>{transcriptionText.length} caracteres</span>
                      {lastUpdate && (
                        <span className="text-blue-400">
                          • {lastUpdate.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    `${observationText.length} caracteres`
                  )}
                </div>
              </div>
            </div>

            {/* Indicador de estado mejorado */}
            <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-rajdhani">
                  Estado del sistema:
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' 
                      ? isRecording ? 'bg-red-400 animate-pulse' : 'bg-green-400'
                      : connectionStatus === 'disconnected' ? 'bg-gray-400'
                      : connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
                  }`}></div>
                  <span className={`text-xs font-rajdhani font-medium ${
                    connectionStatus === 'connected' 
                      ? isRecording ? 'text-red-400' : 'text-green-400'
                      : connectionStatus === 'disconnected' ? 'text-gray-400'
                      : connectionStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {connectionStatus === 'connected' 
                      ? isRecording ? '🎤 GRABANDO EN TIEMPO REAL' : '✅ LISTO PARA GRABAR'
                      : connectionStatus === 'disconnected' ? '💡 PRESIONA MICRÓFONO PARA CONECTAR'
                      : connectionStatus === 'error' ? '❌ SERVIDOR DESCONECTADO' : '🔄 CONECTANDO AL SERVIDOR...'
                    }
                  </span>
                </div>
              </div>
              
              <div className="mt-2 text-xs font-rajdhani">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    {useWebSocket ? '🔌 WebSocket' : '📡 REST'} • {FLASK_SERVER_URL}
                  </span>
                  {isRecording && connectionStatus === 'connected' && (
                    <span className="text-blue-400 animate-pulse">
                      ⚡ {useWebSocket ? 'Tiempo Real WebSocket' : 'Polling cada 200ms'}
                    </span>
                  )}
                </div>
                
                {/* Instrucciones contextuales */}
                {!isRecording && (
                  <div className="mt-1">
                    {connectionStatus === 'connected' ? (
                      <span className="text-green-400 text-xs">
                        💡 Presiona "Iniciar Grabación" para comenzar la transcripción con IA
                      </span>
                    ) : connectionStatus === 'error' ? (
                      <span className="text-red-400 text-xs">
                        🔧 Verifica que el servidor Flask esté ejecutándose en puerto 5000
                      </span>
                    ) : (
                      <span className="text-yellow-400 text-xs">
                        ⏳ Estableciendo conexión con el servidor de IA...
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Galería de Observaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-6 cyber-border"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold font-orbitron gradient-text-accent">
            📱 Trampas con Celular - Casos Críticos
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-red-400 font-rajdhani">
              {observationsData.length} casos de trampa con celular registrados
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all font-rajdhani text-sm"
            >
              Ver Detalles
            </motion.button>
          </div>
        </div>

        {/* Grid de Observaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {observationsData.map((observation, index) => (
            <motion.div
              key={observation.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                observation.severity === 'high' 
                  ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50' 
                  : observation.severity === 'medium'
                  ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50'
                  : 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
              }`}
            >
              {/* Header de la tarjeta */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{observation.studentAvatar}</div>
                  <div>
                    <h4 className="font-bold text-white font-orbitron text-sm">
                      {observation.studentName}
                    </h4>
                    <p className="text-xs text-gray-400 font-rajdhani">
                      {observation.context}
                    </p>
                  </div>
                </div>
                
                {/* Indicador de severidad */}
                <div className={`w-3 h-3 rounded-full ${
                  observation.severity === 'high' ? 'bg-red-400 animate-pulse' :
                  observation.severity === 'medium' ? 'bg-yellow-400' :
                  'bg-green-400'
                }`}></div>
              </div>

              {/* Contenido de la observación */}
              <div className="space-y-2">
                <p className="text-sm text-gray-200 font-rajdhani line-clamp-3">
                  {observation.behaviorDescription}
                </p>

                {/* Video Player */}
                {observation.videoFile && (
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Play className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-400 font-rajdhani font-medium">
                        📹 Video de Evidencia - {Math.floor(observation.duration / 60)}:{(observation.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <video 
                      controls 
                      className="w-full h-32 bg-gray-900 rounded-lg object-cover"
                      poster="/images/video-placeholder.jpg"
                    >
                      <source src={observation.videoFile} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                )}
                
                {/* Transcripción de audio si existe */}
                {observation.audioTranscription && (
                  <div className="p-2 bg-gray-800/50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center space-x-2 mb-1">
                      <Mic className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400 font-rajdhani font-medium">
                        Audio Transcrito
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-rajdhani italic line-clamp-2">
                      "{observation.audioTranscription}"
                    </p>
                  </div>
                )}

                {/* Palabras ofensivas si las hay */}
                {observation.hasOffensiveContent && (
                  <div className="flex flex-wrap gap-1">
                    {observation.offensiveWords.map((word, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-red-900/50 border border-red-700/50 rounded-full text-xs text-red-300 font-rajdhani"
                      >
                        ⚠️ {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer de la tarjeta */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/30">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-rajdhani">
                    {observation.date} • {observation.time}
                  </span>
                  <div className={`px-2 py-1 rounded-full text-xs font-rajdhani font-medium ${
                    observation.severity === 'high' 
                      ? 'bg-red-900/50 text-red-300 border border-red-700/50' 
                      : observation.severity === 'medium'
                      ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'
                      : 'bg-green-900/50 text-green-300 border border-green-700/50'
                  }`}>
                    Score: {observation.behaviorScore}/10
                  </div>
                </div>

                {/* Botón de reproducir audio */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Play className="w-3 h-3" />
                </motion.button>
              </div>

              {/* Duración del audio */}
              {observation.duration && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded-lg">
                  <span className="text-xs text-gray-300 font-rajdhani">
                    {Math.floor(observation.duration / 60)}:{(observation.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Indicador de contenido ofensivo */}
              {observation.hasOffensiveContent && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">!</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Estadísticas de trampas con celular */}
        {observationsData.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-red-900/20 rounded-lg border border-red-700/30">
              <div className="text-2xl font-bold text-red-400 font-orbitron">
                {observationsData.length}
              </div>
              <div className="text-xs text-red-300 font-rajdhani">Trampas con Celular</div>
            </div>
            <div className="text-center p-3 bg-orange-900/20 rounded-lg border border-orange-700/30">
              <div className="text-2xl font-bold text-orange-400 font-orbitron">
                {observationsData.filter(obs => obs.offensiveWords.length > 0).length}
              </div>
              <div className="text-xs text-orange-300 font-rajdhani">Con Lenguaje Ofensivo</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded-lg border border-purple-700/30">
              <div className="text-2xl font-bold text-purple-400 font-orbitron">
                {observationsData.filter(obs => obs.audioTranscription).length}
              </div>
              <div className="text-xs text-purple-300 font-rajdhani">Con Audio</div>
            </div>
            <div className="text-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
              <div className="text-2xl font-bold text-yellow-400 font-orbitron">
                {Math.round(observationsData.reduce((acc, obs) => acc + obs.behaviorScore, 0) / observationsData.length)}
              </div>
              <div className="text-xs text-yellow-300 font-rajdhani">Score Promedio</div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Panel de Debug */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-xl p-4 cyber-border border-yellow-500/30"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold font-orbitron text-yellow-400">
            🐛 Debug Panel Avanzado
          </h3>
          <div className="text-xs text-gray-500 font-rajdhani">
            {useWebSocket ? '🔌 WebSocket Mode' : '📡 REST Mode'}
          </div>
        </div>
        
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {debugLog.map((log, index) => (
            <div key={index} className="text-xs text-gray-300 font-rajdhani bg-gray-900/30 p-1 rounded">
              {log}
            </div>
          ))}
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-gray-500 font-rajdhani">
            Logs: {debugLog.length}/5 • Clasificación: {classification}
          </div>
          <button
            onClick={() => setDebugLog([])}
            className="text-xs text-gray-400 hover:text-yellow-400 transition-colors font-rajdhani"
          >
            Limpiar logs
          </button>
        </div>
      </motion.div>
    </div>
  );
}

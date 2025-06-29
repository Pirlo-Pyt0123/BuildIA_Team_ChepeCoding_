import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Mic, MicOff, Trash2, Volume2, Wifi, WifiOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Observation {
  id: string;
  studentName: string;
  category: 'academic' | 'behavioral' | 'social' | 'positive';
  content: string;
  timestamp: Date;
  audioTranscription?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

const FLASK_SERVER_URL = 'http://localhost:5000';

const ObservacionesViewRobust: React.FC = () => {
  // Estados principales
  const [observations, setObservations] = useState<Observation[]>([]);
  const [newObservation, setNewObservation] = useState({
    studentName: '',
    category: 'academic' as const,
    content: ''
  });
  
  // Estados de transcripción de audio
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [hasTemporaryErrors, setHasTemporaryErrors] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Estados de debug y logs
  const [debugLog, setDebugLog] = useState<string[]>(['Sistema iniciado']);
  const [showLogs, setShowLogs] = useState(false);
  
  // Referencias
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const transcriptionRef = useRef<HTMLTextAreaElement>(null);
  const errorTimeout = useRef<NodeJS.Timeout | null>(null);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
      if (errorTimeout.current) {
        clearTimeout(errorTimeout.current);
      }
    };
  }, []);

  // Función para agregar logs de debug
  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLog(prev => [...prev.slice(-4), `[${timestamp}] ${message}`]);
    console.log(`[ObservacionesRobust] ${message}`);
  };

  // Función simplificada para verificar conexión
  const checkConnection = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(`${FLASK_SERVER_URL}/status`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      });
      
      clearTimeout(timeout);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Función robusta para obtener transcripción
  const fetchTranscription = async () => {
    try {
      const response = await fetch(`${FLASK_SERVER_URL}/get_transcription`, {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        const newTranscription = data.transcription || '';
        
        // Solo actualizar si cambió
        if (newTranscription !== transcriptionText) {
          setTranscriptionText(newTranscription);
          setLastUpdate(new Date());
          setIsUpdating(true);
          
          setTimeout(() => setIsUpdating(false), 500);
          
          // Auto-scroll
          setTimeout(() => {
            if (transcriptionRef.current) {
              transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
            }
          }, 50);
          
          if (newTranscription.length > 0 && Math.random() < 0.2) {
            addDebugLog(`📝 Transcripción: ${newTranscription.length} chars`);
          }
        }
        
        // Limpiar errores temporales
        if (hasTemporaryErrors) {
          setHasTemporaryErrors(false);
          if (errorTimeout.current) {
            clearTimeout(errorTimeout.current);
            errorTimeout.current = null;
          }
        }
        
        // Mantener conexión como conectada mientras grabamos
        if (connectionStatus !== 'connected' && isRecording) {
          setConnectionStatus('connected');
        }
      } else {
        // Manejar errores sin interrumpir grabación
        handleTranscriptionError(response.status);
      }
    } catch (error) {
      // Error de red - continuar si estamos grabando
      handleTranscriptionError(0);
    }
  };

  // Función para manejar errores de transcripción sin interrumpir
  const handleTranscriptionError = (statusCode: number) => {
    if (!isRecording) {
      setConnectionStatus('error');
      return;
    }

    // Durante grabación, mostrar advertencia temporal
    if (!hasTemporaryErrors) {
      const errorMsg = statusCode === 404 
        ? '⚠️ Endpoint no encontrado - continuando grabación'
        : statusCode === 0 
        ? '🔄 Error de conexión temporal - continuando grabación'
        : `⚠️ Error ${statusCode} - continuando grabación`;
      
      addDebugLog(errorMsg);
      setHasTemporaryErrors(true);
      
      // Auto-limpiar error después de 8 segundos
      if (errorTimeout.current) clearTimeout(errorTimeout.current);
      errorTimeout.current = setTimeout(() => {
        setHasTemporaryErrors(false);
        errorTimeout.current = null;
      }, 8000);
    }
  };

  // Función principal para manejar grabación
  const handleRecordToggle = async () => {
    if (connectionStatus === 'connecting') {
      addDebugLog('⚠️ Operación en curso, esperando...');
      return;
    }

    try {
      if (!isRecording) {
        // === INICIAR GRABACIÓN ===
        addDebugLog('🔌 Conectando al servidor...');
        setConnectionStatus('connecting');
        
        // Verificar conexión
        const isConnected = await checkConnection();
        if (!isConnected) {
          addDebugLog('❌ No se puede conectar al servidor Flask');
          setConnectionStatus('error');
          return;
        }
        
        addDebugLog('🎤 Iniciando grabación...');
        
        // Iniciar grabación en servidor
        const response = await fetch(`${FLASK_SERVER_URL}/start_recording`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          // Limpiar estado y iniciar
          setTranscriptionText('');
          setLastUpdate(null);
          setHasTemporaryErrors(false);
          setIsRecording(true);
          setConnectionStatus('connected');
          
          // Iniciar polling cada 2 segundos
          pollingInterval.current = setInterval(fetchTranscription, 2000);
          
          addDebugLog('✅ Grabación iniciada');
          addDebugLog('💡 La grabación continuará aunque haya errores temporales');
        } else {
          const errorData = await response.text();
          addDebugLog(`❌ Error al iniciar: ${response.status} - ${errorData}`);
          setConnectionStatus('error');
        }
      } else {
        // === DETENER GRABACIÓN ===
        addDebugLog('🛑 Deteniendo grabación...');
        
        // Cambiar estado inmediatamente
        setIsRecording(false);
        setHasTemporaryErrors(false);
        
        // Limpiar timeouts
        if (errorTimeout.current) {
          clearTimeout(errorTimeout.current);
          errorTimeout.current = null;
        }
        
        // Detener polling
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
        
        // Intentar detener en servidor
        try {
          const response = await fetch(`${FLASK_SERVER_URL}/stop_recording`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            addDebugLog('✅ Grabación detenida correctamente');
            // Obtener transcripción final
            await fetchTranscription();
          } else {
            addDebugLog('⚠️ Error al detener en servidor - detenida localmente');
          }
        } catch (error) {
          addDebugLog('⚠️ Error de conexión al detener - detenida localmente');
        }
      }
    } catch (error: any) {
      addDebugLog(`❌ Error: ${error.message}`);
      
      // Limpiar todo en caso de error
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
        pollingInterval.current = null;
      }
      if (errorTimeout.current) {
        clearTimeout(errorTimeout.current);
        errorTimeout.current = null;
      }
      
      setIsRecording(false);
      setHasTemporaryErrors(false);
      setConnectionStatus('error');
    }
  };

  // Función para limpiar transcripción
  const clearTranscription = async () => {
    try {
      await fetch(`${FLASK_SERVER_URL}/clear_transcription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setTranscriptionText('');
      setLastUpdate(null);
      addDebugLog('🗑️ Transcripción limpiada');
    } catch (error) {
      addDebugLog('⚠️ Error al limpiar - limpiado localmente');
      setTranscriptionText('');
      setLastUpdate(null);
    }
  };

  // Función para agregar observación
  const addObservation = () => {
    if (!newObservation.content.trim()) return;
    
    const observation: Observation = {
      id: Date.now().toString(),
      ...newObservation,
      timestamp: new Date(),
      audioTranscription: transcriptionText || undefined,
    };
    
    setObservations(prev => [observation, ...prev]);
    setNewObservation({ studentName: '', category: 'academic', content: '' });
    addDebugLog(`📋 Observación agregada para ${observation.studentName}`);
  };

  // Función para obtener color de estado
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return hasTemporaryErrors ? 'text-yellow-400' : 'text-green-400';
      case 'connecting': return 'text-blue-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Función para obtener icono de estado
  const getStatusIcon = () => {
    if (hasTemporaryErrors) return <AlertTriangle className="w-4 h-4" />;
    switch (connectionStatus) {
      case 'connected': return <Wifi className="w-4 h-4" />;
      case 'connecting': return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      case 'error': return <WifiOff className="w-4 h-4" />;
      default: return <WifiOff className="w-4 h-4" />;
    }
  };

  // Función para obtener texto del botón
  const getButtonText = () => {
    if (connectionStatus === 'connecting') return 'Conectando...';
    if (isRecording) return 'Detener Grabación';
    return 'Conectar y Grabar';
  };

  // Función para obtener mensaje de estado
  const getStatusMessage = () => {
    if (hasTemporaryErrors && isRecording) return 'Advertencia temporal - Grabación continúa';
    switch (connectionStatus) {
      case 'connected': return isRecording ? 'Grabando audio en tiempo real' : 'Conectado al servidor Flask';
      case 'connecting': return 'Estableciendo conexión...';
      case 'error': return 'Error de conexión - Verificar servidor Flask';
      default: return 'Desconectado - Presionar para conectar';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sistema de Observaciones - Versión Robusta
          </h1>
          <p className="text-gray-400">
            Transcripción de audio en tiempo real con manejo robusto de errores
          </p>
        </div>

        {/* Panel de Control de Audio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-400" />
            Transcripción de Audio
          </h2>

          {/* Estado de Conexión */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="font-medium">
                  {getStatusMessage()}
                </span>
              </div>
              {lastUpdate && (
                <span className="text-xs text-gray-500">
                  Última actualización: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
            
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              {showLogs ? 'Ocultar' : 'Ver'} Logs
            </button>
          </div>

          {/* Logs de Debug */}
          <AnimatePresence>
            {showLogs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-black/30 rounded-lg border border-gray-700"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-2">Logs del Sistema:</h4>
                <div className="space-y-1 text-xs font-mono">
                  {debugLog.map((log, index) => (
                    <div key={index} className="text-gray-400">{log}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex gap-3 mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRecordToggle}
              disabled={connectionStatus === 'connecting'}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${isRecording 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : connectionStatus === 'connecting'
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {getButtonText()}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearTranscription}
              disabled={isRecording}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg font-medium transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar
            </motion.button>
          </div>

          {/* Transcripción */}
          <div className="relative">
            <textarea
              ref={transcriptionRef}
              value={transcriptionText}
              onChange={(e) => !isRecording && setTranscriptionText(e.target.value)}
              placeholder={isRecording ? "La transcripción aparecerá aquí..." : "Sin transcripción disponible"}
              className={`
                w-full h-32 p-3 bg-gray-800/50 border border-gray-700 rounded-lg
                text-white placeholder-gray-400 resize-none transition-all
                ${isRecording ? 'cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-400 focus:border-transparent'}
                ${isUpdating ? 'ring-2 ring-green-400' : ''}
              `}
              readOnly={isRecording}
            />
            {isUpdating && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            )}
          </div>
        </motion.div>

        {/* Formulario de Nueva Observación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Nueva Observación</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre del estudiante"
              value={newObservation.studentName}
              onChange={(e) => setNewObservation(prev => ({ ...prev, studentName: e.target.value }))}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            
            <select
              value={newObservation.category}
              onChange={(e) => setNewObservation(prev => ({ ...prev, category: e.target.value as any }))}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="academic">Académico</option>
              <option value="behavioral">Comportamental</option>
              <option value="social">Social</option>
              <option value="positive">Positivo</option>
            </select>
          </div>
          
          <textarea
            placeholder="Descripción de la observación..."
            value={newObservation.content}
            onChange={(e) => setNewObservation(prev => ({ ...prev, content: e.target.value }))}
            className="w-full h-24 p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-4"
          />
          
          {transcriptionText && (
            <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
              <p className="text-sm text-blue-300 mb-1">Transcripción de audio disponible:</p>
              <p className="text-xs text-gray-300 italic">{transcriptionText.substring(0, 100)}...</p>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addObservation}
            disabled={!newObservation.content.trim()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-lg font-medium transition-all"
          >
            Agregar Observación
          </motion.button>
        </motion.div>

        {/* Lista de Observaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Historial de Observaciones ({observations.length})
          </h2>
          
          <div className="space-y-4">
            <AnimatePresence>
              {observations.map((obs) => (
                <motion.div
                  key={obs.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-blue-300">{obs.studentName}</span>
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${obs.category === 'positive' ? 'bg-green-900 text-green-200' :
                          obs.category === 'academic' ? 'bg-blue-900 text-blue-200' :
                          obs.category === 'behavioral' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-purple-900 text-purple-200'}
                      `}>
                        {obs.category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {obs.timestamp.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-200 mb-2">{obs.content}</p>
                  
                  {obs.audioTranscription && (
                    <div className="mt-2 p-2 bg-gray-700/50 rounded border-l-4 border-blue-500">
                      <p className="text-xs text-blue-300 mb-1">🎤 Transcripción de audio:</p>
                      <p className="text-xs text-gray-300 italic">{obs.audioTranscription}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {observations.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No hay observaciones registradas</p>
                <p className="text-sm mt-1">Agrega tu primera observación para comenzar</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ObservacionesViewRobust;

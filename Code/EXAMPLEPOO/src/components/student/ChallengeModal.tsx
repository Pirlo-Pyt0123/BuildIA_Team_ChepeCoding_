import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Coins, Play, Star, Trophy, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Challenge } from './types';

interface ChallengeModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onStartChallenge: (challengeId: string) => void;
}

export default function ChallengeModal({ challenge, isOpen, onClose, onStartChallenge }: ChallengeModalProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Reset modal state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setIsStarting(false);
      setTimeLeft(30);
      setCurrentQuestion(0);
      setScore(0);
      setIsSimulating(false);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [isOpen]);

  // Timer effect for simulation
  useEffect(() => {
    if (isSimulating && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSimulating && timeLeft === 0) {
      handleNextQuestion();
    }
  }, [isSimulating, timeLeft]);

  if (!challenge) return null;

  // Simulated questions based on subject
  const getQuestions = () => {
    switch (challenge.subject) {
      case 'Matemáticas':
        return [
          {
            question: "Resuelve: 2x + 8 = 16",
            options: ["x = 4", "x = 6", "x = 8", "x = 12"],
            correct: 0
          },
          {
            question: "¿Cuál es el área de un círculo con radio 5cm?",
            options: ["25π cm²", "10π cm²", "15π cm²", "20π cm²"],
            correct: 0
          },
          {
            question: "Factoriza: x² - 9",
            options: ["(x-3)(x-3)", "(x+3)(x-3)", "(x+9)(x-1)", "x(x-9)"],
            correct: 1
          }
        ];
      case 'Ciencias':
        return [
          {
            question: "¿Cuál es el símbolo químico del oro?",
            options: ["Go", "Au", "Ag", "Or"],
            correct: 1
          },
          {
            question: "¿Cuántos protones tiene el carbono?",
            options: ["4", "6", "8", "12"],
            correct: 1
          },
          {
            question: "¿Qué gas respiramos principalmente?",
            options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"],
            correct: 1
          }
        ];
      case 'Historia':
        return [
          {
            question: "¿En qué año comenzó la Edad Media?",
            options: ["476 d.C.", "500 d.C.", "600 d.C.", "800 d.C."],
            correct: 0
          },
          {
            question: "¿Quién fue el emperador del Sacro Imperio Romano Germánico?",
            options: ["Julio César", "Carlomagno", "Napoleón", "Alejandro Magno"],
            correct: 1
          },
          {
            question: "¿Qué evento marcó el fin del Imperio Romano de Occidente?",
            options: ["Batalla de Hastings", "Caída de Constantinopla", "Deposición de Rómulo Augústulo", "Coronación de Carlomagno"],
            correct: 2
          }
        ];
      case 'Geografía':
        return [
          {
            question: "¿Cuál es la capital de Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2
          },
          {
            question: "¿Qué océano está al oeste de América?",
            options: ["Atlántico", "Pacífico", "Índico", "Ártico"],
            correct: 1
          },
          {
            question: "¿Cuál es el río más largo del mundo?",
            options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
            correct: 1
          }
        ];
      default:
        return [
          {
            question: `Pregunta de ${challenge.subject}`,
            options: ["Opción A", "Opción B", "Opción C", "Opción D"],
            correct: 0
          }
        ];
    }
  };

  const questions = getQuestions();

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getDifficultyText = () => {
    switch (challenge.difficulty) {
      case 'easy': return 'FÁCIL';
      case 'medium': return 'MEDIO';
      case 'hard': return 'DIFÍCIL';
      default: return 'NORMAL';
    }
  };

  const getSubjectIcon = () => {
    switch (challenge.subject) {
      case 'Matemáticas': return '🧮';
      case 'Ciencias': return '🔬';
      case 'Historia': return '📜';
      case 'Lengua': return '📝';
      case 'Geografía': return '🌍';
      case 'Física': return '⚡';
      case 'Arte': return '🎨';
      case 'Inglés': return '🇬🇧';
      case 'Biología': return '🧬';
      case 'Educación Física': return '🏃';
      default: return '📚';
    }
  };

  const handleStartSimulation = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsSimulating(true);
      setIsStarting(false);
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
      setIsSimulating(false);
    }
  };

  const handleFinishChallenge = () => {
    onStartChallenge(challenge.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-700/50">
              <div className={`absolute inset-0 bg-gradient-to-r ${getDifficultyColor()} opacity-10`}></div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getDifficultyColor()} flex items-center justify-center text-2xl shadow-lg`}>
                    {getSubjectIcon()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-orbitron">
                      {challenge.title || challenge.subject}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {challenge.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-2 bg-gradient-to-r ${getDifficultyColor()} text-white`}>
                      {getDifficultyText()}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isStarting && !isSimulating && !showResult && (
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/30">
                      <Coins className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                      <div className="text-2xl font-bold text-yellow-300">{challenge.coins}</div>
                      <div className="text-xs text-gray-400">Monedas</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/30">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                      <div className="text-2xl font-bold text-blue-300">{challenge.time}</div>
                      <div className="text-xs text-gray-400">Duración</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/30">
                      <Users className="w-6 h-6 mx-auto mb-2 text-green-400" />
                      <div className="text-2xl font-bold text-green-300">{challenge.participants}</div>
                      <div className="text-xs text-gray-400">Participantes</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                    <h3 className="font-bold text-white mb-2">Sobre este desafío:</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={handleStartSimulation}
                      className={`flex-1 bg-gradient-to-r ${getDifficultyColor()} text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2`}
                    >
                      <Play className="w-5 h-5" />
                      <span>Iniciar Simulación</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Starting Animation */}
              {isStarting && (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${getDifficultyColor()} flex items-center justify-center text-4xl`}
                  >
                    {getSubjectIcon()}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Preparando desafío...</h3>
                  <p className="text-gray-400">¡Prepárate para demostrar tus conocimientos!</p>
                </div>
              )}

              {/* Simulation */}
              {isSimulating && (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Pregunta {currentQuestion + 1} de {questions.length}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-300 font-bold">{timeLeft}s</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getDifficultyColor()} transition-all duration-300`}
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Question */}
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {questions[currentQuestion].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                            selectedAnswer === index
                              ? `bg-gradient-to-r ${getDifficultyColor()} text-white shadow-lg`
                              : 'bg-gray-700/30 text-gray-300 hover:bg-gray-600/50'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Next Button */}
                  {selectedAnswer !== null && (
                    <button
                      onClick={handleNextQuestion}
                      className={`w-full bg-gradient-to-r ${getDifficultyColor()} text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-200`}
                    >
                      {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar'}
                    </button>
                  )}
                </div>
              )}

              {/* Results */}
              {showResult && (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">¡Simulación Completada!</h3>
                  <p className="text-gray-400 mb-6">
                    Obtuviste {score} de {questions.length} respuestas correctas
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    {[...Array(questions.length)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-6 h-6 ${
                          index < score ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleFinishChallenge}
                      className={`flex-1 bg-gradient-to-r ${getDifficultyColor()} text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200`}
                    >
                      Comenzar Desafío Real
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

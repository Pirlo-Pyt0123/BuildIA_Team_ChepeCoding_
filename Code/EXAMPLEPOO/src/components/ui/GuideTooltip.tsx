import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, HelpCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GuideStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  highlight?: boolean;
}

interface GuideTooltipProps {
  steps: GuideStep[];
  isActive: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function GuideTooltip({ steps, isActive, onClose, onComplete }: GuideTooltipProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && steps.length > 0) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      if (element && steps[currentStep].highlight) {
        element.classList.add('guide-highlight');
      }
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove('guide-highlight');
      }
    };
  }, [currentStep, isActive, steps, targetElement]);

  const nextStep = () => {
    if (targetElement) {
      targetElement.classList.remove('guide-highlight');
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
      onClose();
    }
  };

  const prevStep = () => {
    if (targetElement) {
      targetElement.classList.remove('guide-highlight');
    }
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTooltipPosition = () => {
    if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const rect = targetElement.getBoundingClientRect();
    const position = steps[currentStep].position;

    switch (position) {
      case 'top':
        return {
          top: rect.top - 10,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: rect.bottom + 10,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - 10,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + 10,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: rect.bottom + 10,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, 0)'
        };
    }
  };

  if (!isActive || steps.length === 0) return null;

  const currentGuideStep = steps[currentStep];
  const tooltipStyle = getTooltipPosition();

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed z-50 max-w-sm"
          style={tooltipStyle}
        >
          <div className="guide-tooltip glass-effect rounded-xl p-4 border border-blue-500/30 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-3 h-3 text-white" />
                </div>
                <h3 className="font-bold text-white font-orbitron text-sm">
                  {currentGuideStep.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-300 text-sm mb-4 font-rajdhani leading-relaxed">
              {currentGuideStep.content}
            </p>

            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-rajdhani">
                {currentStep + 1} de {steps.length}
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between space-x-2">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-rajdhani text-sm"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Anterior</span>
              </button>

              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all font-rajdhani text-sm"
              >
                <span>{currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className={`absolute w-3 h-3 bg-gray-900 border-l border-t border-blue-500/30 transform rotate-45 ${
            currentGuideStep.position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' :
            currentGuideStep.position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-[225deg]' :
            currentGuideStep.position === 'left' ? 'left-full top-1/2 -translate-y-1/2 translate-x-1/2 rotate-[135deg]' :
            'right-full top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-[315deg]'
          }`} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Hook personalizado para manejar guías
export function useGuide(storageKey: string) {
  const [isGuideActive, setIsGuideActive] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(`guide-${storageKey}`);
    if (!seen) {
      setIsGuideActive(true);
    } else {
      setHasSeenGuide(true);
    }
  }, [storageKey]);

  const startGuide = () => {
    setIsGuideActive(true);
  };

  const closeGuide = () => {
    setIsGuideActive(false);
    localStorage.setItem(`guide-${storageKey}`, 'true');
    setHasSeenGuide(true);
  };

  const resetGuide = () => {
    localStorage.removeItem(`guide-${storageKey}`);
    setHasSeenGuide(false);
    setIsGuideActive(true);
  };

  return {
    isGuideActive,
    hasSeenGuide,
    startGuide,
    closeGuide,
    resetGuide
  };
}

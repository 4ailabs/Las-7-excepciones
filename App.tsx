import React, { useState, useMemo, useEffect } from 'react';
import { sections, getSectionTitle, screeningData } from './constants/testData';
import { Header } from './components/Header';
import { Introduction } from './components/Introduction';
import { Screening } from './components/Screening';
import { ExceptionModule } from './components/ExceptionModule';
import { Results } from './components/Results';
import type { Scores } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [clientInfo, setClientInfo] = useState({ name: '', date: new Date().toISOString().split('T')[0], symptom: '', duration: '' });
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totalSteps = sections.length + 2; // Intro + Screening + 7 modules + Results

  // Check for saved progress on initial load
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('testProgress');
      if (savedProgress) {
        setHasSavedProgress(true);
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  // Save progress whenever it changes, but only after starting and before finishing
  useEffect(() => {
    if (step > 0 && step < totalSteps - 1) {
      try {
        const progress = { step, scores, clientInfo };
        localStorage.setItem('testProgress', JSON.stringify(progress));
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    }
  }, [step, scores, clientInfo, totalSteps]);

  // Clear progress when the results page is reached
  useEffect(() => {
    if (step === totalSteps - 1) {
      try {
        localStorage.removeItem('testProgress');
      } catch (error) {
        console.error("Error removing from localStorage", error);
      }
    }
  }, [step, totalSteps]);


  const handleStart = () => {
    setStep(1);
  };
  
  const handleResume = () => {
    try {
      const savedProgress = localStorage.getItem('testProgress');
      if (savedProgress) {
        const { step: savedStep, scores: savedScores, clientInfo: savedClientInfo } = JSON.parse(savedProgress);
        setStep(savedStep);
        setScores(savedScores);
        setClientInfo(savedClientInfo);
        setHasSavedProgress(false);
      }
    } catch (error) {
       console.error("Failed to parse saved progress, starting new.", error);
       handleStartNew();
    }
  };
  
  const handleStartNew = () => {
    try {
      localStorage.removeItem('testProgress');
    } catch (error) {
       console.error("Error removing from localStorage", error);
    }
    setStep(0);
    setScores({});
    setClientInfo({ name: '', date: new Date().toISOString().split('T')[0], symptom: '', duration: '' });
    setHasSavedProgress(false);
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    }
  };
  
  // Validación: verificar si la pantalla actual está completa
  const isCurrentStepComplete = useMemo(() => {
    // Intro no requiere validación adicional (botón ya deshabilitado ahí)
    if (step === 0) return true;
    // Screening: todas las preguntas de screeningData deben tener respuesta válida
    if (step === 1) {
      const allQuestions = screeningData.series.flatMap(s => s.questions);
      return allQuestions.every(q => {
        if (q.type === 'radio' || q.type === 'select') {
          return typeof scores[q.id] === 'number';
        }
        if (q.type === 'checkbox-group') {
          // Para checkbox group, no forzamos al menos uno. Siempre "completo".
          return true;
        }
        if (q.type === 'table') {
          // Cada fila requiere selección en ambas columnas
          return (q.rows || []).every(row => {
            const idS = `${row.id}-satisface`;
            const idA = `${row.id}-alternativa`;
            return typeof scores[idS] === 'number' && typeof scores[idA] === 'number';
          });
        }
        return true;
      });
    }
    // Módulos: validar preguntas visibles del section actual
    if (step > 1 && step < totalSteps - 1) {
      const sectionIndex = step - 2;
      const section = sections[sectionIndex];
      const allQuestions = section.series.flatMap(s => s.questions);
      return allQuestions.every(q => {
        if (q.type === 'radio' || q.type === 'select') {
          return typeof scores[q.id] === 'number';
        }
        if (q.type === 'checkbox-group') {
          return true;
        }
        if (q.type === 'table') {
          return (q.rows || []).every(row => {
            const idS = `${row.id}-satisface`;
            const idA = `${row.id}-alternativa`;
            return typeof scores[idS] === 'number' && typeof scores[idA] === 'number';
          });
        }
        return true;
      });
    }
    return true;
  }, [step, totalSteps, scores]);
  
  const pendingRequiredCount = useMemo(() => {
    let count = 0;
    const countForQuestions = (questions: any[]) => {
      questions.forEach((q) => {
        if (q.type === 'radio' || q.type === 'select') {
          if (typeof scores[q.id] !== 'number') count += 1;
        } else if (q.type === 'table') {
          (q.rows || []).forEach((row: any) => {
            const idS = `${row.id}-satisface`;
            const idA = `${row.id}-alternativa`;
            if (typeof scores[idS] !== 'number') count += 1;
            if (typeof scores[idA] !== 'number') count += 1;
          });
        }
      });
    };
    if (step === 1) {
      const qs = screeningData.series.flatMap(s => s.questions);
      countForQuestions(qs);
    } else if (step > 1 && step < totalSteps - 1) {
      const section = sections[step - 2];
      const qs = section.series.flatMap(s => s.questions);
      countForQuestions(qs);
    }
    return count;
  }, [step, totalSteps, scores]);

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const updateScore = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const currentSection = useMemo(() => {
    if (step === 0) return 'Introducción';
    if (step === 1) return 'PARTE 1: SCREENING INICIAL';
    if (step > 1 && step < totalSteps - 1) return getSectionTitle(step - 2);
    return 'Resultados';
  }, [step, totalSteps]);

  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step, totalSteps]);

  const renderStep = () => {
    if (step === 1) {
      return <Screening scores={scores} updateScore={updateScore} />;
    }
    if (step > 1 && step < totalSteps - 1) {
      const sectionIndex = step - 2;
      return <ExceptionModule section={sections[sectionIndex]} scores={scores} updateScore={updateScore} />;
    }
    return null;
  };
  
  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <p className="text-slate-600 text-lg">Cargando...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl ring-1 ring-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200/70">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">{currentSection}</h2>
            <div className="mt-4">
              <div className="bg-slate-200/70 rounded-full h-2.5 overflow-hidden">
                <div className="h-2.5 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-right text-sm text-slate-500 mt-1">Paso {step + 1} de {totalSteps}</p>
            </div>
          </div>

          <div className="p-6">
             {step === 0 ? (
                <Introduction 
                    onStart={handleStart} 
                    clientInfo={clientInfo} 
                    setClientInfo={setClientInfo}
                    hasSavedProgress={hasSavedProgress}
                    onResume={handleResume}
                    onStartNew={handleStartNew}
                />
            ) : (
                step < totalSteps - 1 ? renderStep() : <Results scores={scores} clientInfo={clientInfo} />
            )}
          </div>

          <div className="p-6 bg-slate-50/80 border-t border-slate-200/70 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex gap-3 order-2 sm:order-1">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="px-6 py-3 sm:py-2 bg-white border border-slate-300 rounded-md text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-sm w-full sm:w-auto"
              >
                Anterior
              </button>
            </div>
            {step < totalSteps - 1 && (
              <div className="flex items-center gap-3 order-1 sm:order-2">
                {!isCurrentStepComplete && (
                  <span className="text-sm text-red-600 font-medium">
                    Completa {pendingRequiredCount} {pendingRequiredCount === 1 ? 'pendiente' : 'pendientes'}
                  </span>
                )}
                <button
                  onClick={handleNext}
                  disabled={!isCurrentStepComplete}
                  aria-disabled={!isCurrentStepComplete}
                  title={!isCurrentStepComplete ? `Faltan ${pendingRequiredCount} por completar` : undefined}
                  className="px-6 py-3 sm:py-2 rounded-md font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 hover:shadow w-full sm:w-auto"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

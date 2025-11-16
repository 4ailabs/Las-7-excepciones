import React, { useState, useMemo, useEffect } from 'react';
import { sections, getSectionTitle } from './constants/testData';
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
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-700">{currentSection}</h2>
            <div className="mt-4">
              <div className="bg-slate-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
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

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="px-6 py-2 bg-white border border-slate-300 rounded-md text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            {step < totalSteps - 1 && (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

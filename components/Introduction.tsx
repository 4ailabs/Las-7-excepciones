import React from 'react';

interface ClientInfo {
  name: string;
  date: string;
  symptom: string;
  duration: string;
}

interface IntroductionProps {
  onStart: () => void;
  clientInfo: ClientInfo;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfo>>;
  hasSavedProgress: boolean;
  onResume: () => void;
  onStartNew: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onStart, clientInfo, setClientInfo, hasSavedProgress, onResume, onStartNew }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const canStart = clientInfo.name && clientInfo.symptom && clientInfo.duration;

  if (hasSavedProgress) {
    return (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Evaluación en Progreso Detectada</h3>
            <p className="mb-6 text-slate-600">Hemos encontrado una evaluación que no fue completada. ¿Deseas continuar donde la dejaste o prefieres comenzar una nueva?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                    onClick={onResume} 
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                    Continuar Evaluación
                </button>
                <button 
                    onClick={onStartNew} 
                    className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors"
                >
                    Comenzar de Nuevo
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="prose max-w-none">
      <h3 className="text-lg font-semibold text-slate-800">Bienvenido al Sistema Diagnóstico</h3>
      <p>
        Este test maestro proporciona un sistema algorítmico exhaustivo para detectar cuándo un síntoma no puede ser eliminado directamente porque cumple funciones protectoras o está entrelazado con dinámicas más profundas.
      </p>
      <p>
        La administración completa toma aproximadamente 90-120 minutos. Las respuestas deben ser lo más honestas posible para garantizar la precisión del diagnóstico.
      </p>
      
      <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="text-md font-semibold mb-4 text-slate-700">Información del Caso</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-600">Nombre del Cliente</label>
            <input type="text" name="name" id="name" value={clientInfo.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-600">Fecha de Evaluación</label>
            <input type="date" name="date" id="date" value={clientInfo.date} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="symptom" className="block text-sm font-medium text-slate-600">Síntoma Principal</label>
            <input type="text" name="symptom" id="symptom" value={clientInfo.symptom} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-600">Duración del Síntoma</label>
            <input type="text" name="duration" id="duration" value={clientInfo.duration} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button 
          onClick={onStart} 
          disabled={!canStart}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {canStart ? 'Comenzar Evaluación' : 'Complete la información para comenzar'}
        </button>
      </div>
    </div>
  );
};

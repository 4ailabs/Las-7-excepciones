
import React from 'react';
import type { Scores } from '../types';
import { sections } from '../constants/testData';
import { calculateSectionScore } from '../utils/scoring';

interface ClientInfo {
  name: string;
  date: string;
  symptom: string;
  duration: string;
}

interface ResultsProps {
  scores: Scores;
  clientInfo: ClientInfo;
}

const getInterpretation = (score: number) => {
    if (score <= 10) return "Ausente";
    if (score <= 25) return "Presente";
    if (score <= 40) return "Significativa";
    return "Profunda";
};

const getInterpretationClass = (level: string) => {
    switch(level) {
        case "Ausente": return "bg-green-100 text-green-800";
        case "Presente": return "bg-yellow-100 text-yellow-800";
        case "Significativa": return "bg-orange-100 text-orange-800";
        case "Profunda": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
    }
}

export const Results: React.FC<ResultsProps> = ({ scores, clientInfo }) => {
  const exceptionScores = sections.map(section => {
    const totalScore = calculateSectionScore(section, scores);
    return {
      id: section.id,
      title: section.title,
      score: totalScore,
      level: getInterpretation(totalScore)
    };
  });

  const primaryExceptions = exceptionScores.filter(e => e.score >= 26);

  const getPronostic = () => {
    const highSeverityCount = exceptionScores.filter(e => e.level === "Significativa" || e.level === "Profunda").length;
    if (primaryExceptions.length <= 2 && highSeverityCount < 2) return "EXCELENTE: 1-2 excepciones de severidad moderada. Pronóstico de reducción de síntoma 70-90% en 3-6 meses.";
    if (primaryExceptions.length <= 3 || highSeverityCount <= 2) return "BUENO: 2-3 excepciones o 1-2 de severidad alta. Pronóstico de reducción de síntoma 50-70% en 6-9 meses.";
    if (primaryExceptions.length <= 4 || highSeverityCount > 2) return "MODERADO: 3-4 excepciones o múltiples de severidad alta. Pronóstico de reducción de síntoma 40-60% en 9-12 meses.";
    return "RESERVADO: 5+ excepciones o severidad muy alta en múltiples. Trabajo complejo y prolongado. Pronóstico de mejoría significativa posible pero requerirá 12-18+ meses de trabajo sistemático.";
  }

  return (
    <div className="prose max-w-none">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold text-slate-800">Reporte de Resultados</h2>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors">Imprimir Reporte</button>
      </div>
      <hr className="my-4"/>

      <div id="report-content">
        <h3 className="text-xl font-semibold">PARTE 4: REPORTES Y RECOMENDACIONES</h3>
        <h4>RESUMEN EJECUTIVO DEL CASO</h4>
        <ul>
          <li><strong>Cliente:</strong> {clientInfo.name}</li>
          <li><strong>Fecha de evaluación:</strong> {clientInfo.date}</li>
          <li><strong>Síntoma principal:</strong> {clientInfo.symptom}</li>
          <li><strong>Duración del síntoma:</strong> {clientInfo.duration}</li>
        </ul>

        <h4>MATRIZ DE SCORES TOTALES</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 my-4">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Excepción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Severidad</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {exceptionScores.map(e => (
                    <tr key={e.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.title.split('(')[0].replace('EVALUACIÓN DE', '').trim()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.score} / 50</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getInterpretationClass(e.level)}`}>{e.level}</span></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


        <h4>EXCEPCIONES PRIMARIAS IDENTIFICADAS (Score ≥ 26)</h4>
        {primaryExceptions.length > 0 ? (
          <ul>
            {primaryExceptions.map(e => (
              <li key={e.id}><strong>{e.title.split('(')[0].replace('EVALUACIÓN DE', '').trim()}:</strong> (Score: {e.score}/50)</li>
            ))}
          </ul>
        ) : (
          <p>No se identificaron excepciones primarias con score ≥ 26.</p>
        )}

        <h4>FORMULACIÓN DINÁMICA</h4>
        <p>El síntoma de <strong>{clientInfo.symptom}</strong> está siendo mantenido por <strong>{primaryExceptions.length}</strong> excepciones interrelacionadas.
           {primaryExceptions.length > 0 ? ` Principalmente, ${primaryExceptions.map(e => `${e.title.split('(')[0].replace('EVALUACIÓN DE', '').trim()} (score ${e.score})`).join(', ')}, lo que sugiere que...` : ' No parece haber dinámicas subyacentes complejas manteniendo el síntoma.'}
           (Formulación detallada debe ser completada por el clínico).
        </p>

        <h4>PLAN DE TRATAMIENTO RECOMENDADO</h4>
        <p>(El plan de tratamiento debe ser elaborado por el clínico basado en el algoritmo de priorización y los scores obtenidos).</p>
        <ol>
          <li><strong>FASE 1:</strong> ...</li>
          <li><strong>FASE 2:</strong> ...</li>
          <li><strong>FASE 3:</strong> ...</li>
        </ol>

        <h4>PRONÓSTICO</h4>
        <p>{getPronostic()}</p>
      </div>

    </div>
  );
};

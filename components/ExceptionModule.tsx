
import React from 'react';
import type { Section, Scores, Series } from '../types';
import { QuestionCard } from './QuestionCard';
import { calculateSeriesScore, calculateSectionScore } from '../utils/scoring';

interface ExceptionModuleProps {
  section: Section;
  scores: Scores;
  updateScore: (id: string, value: number) => void;
}

const getInterpretation = (score: number) => {
    if (score <= 10) return "Ausente o mínima";
    if (score <= 25) return "Presente pero no dominante";
    if (score <= 40) return "Significativa, requiere intervención";
    return "Profunda, central al mantenimiento del síntoma";
};

const getInterpretationColor = (score: number) => {
    if (score <= 10) return "text-green-700 bg-green-50 border-green-500";
    if (score <= 25) return "text-yellow-700 bg-yellow-50 border-yellow-500";
    if (score <= 40) return "text-orange-700 bg-orange-50 border-orange-500";
    return "text-red-700 bg-red-50 border-red-500";
};

const SeriesScore: React.FC<{ series: Series; scores: Scores }> = ({ series, scores }) => {
  const seriesScore = calculateSeriesScore(series, scores);

  return (
    <div className="mt-6 p-3 bg-slate-100 rounded-lg text-right">
      <span className="font-semibold text-slate-600">Subscore Serie {series.id.split('.')[2]}: </span>
      <span className="font-bold text-lg text-slate-800">{seriesScore} / {series.maxScore} puntos</span>
    </div>
  );
};

export const ExceptionModule: React.FC<ExceptionModuleProps> = ({ section, scores, updateScore }) => {
  const totalScore = calculateSectionScore(section, scores);

  const interpretation = getInterpretation(totalScore);
  const colorClasses = getInterpretationColor(totalScore);

  return (
    <div className="space-y-10">
      {section.series.map((series) => (
        <div key={series.id} className="p-4 border border-slate-200 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-800 border-b-2 border-blue-200 pb-2 mb-4">{series.title}</h3>
          {series.description && <p className="mb-4 text-slate-600" dangerouslySetInnerHTML={{ __html: series.description }}></p>}
          <div className="space-y-6">
            {series.questions.map((question) => (
              <QuestionCard key={question.id} question={question} score={scores[question.id]} scores={scores} updateScore={updateScore} />
            ))}
          </div>
          <SeriesScore series={series} scores={scores} />
        </div>
      ))}
      <div className={`mt-8 p-4 border-l-4 rounded-r-lg ${colorClasses}`}>
        <h4 className="font-bold">Score Total Excepción #{section.id.slice(1)}</h4>
        <p className="text-3xl font-bold mt-2">{totalScore} / {section.maxScore} puntos</p>
        <p className="mt-1 font-semibold">Interpretación: {interpretation}</p>
      </div>
    </div>
  );
};

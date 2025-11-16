
import React from 'react';
import type { Question, Scores } from '../types';

interface QuestionCardProps {
  question: Question;
  score?: number;
  scores?: Scores;
  updateScore: (id: string, value: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, score, scores, updateScore }) => {
  const renderQuestionType = () => {
    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option.value} className="flex items-start p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={score === option.value}
                  onChange={() => updateScore(question.id, option.value)}
                  aria-describedby={option.description ? `${question.id}-opt-${option.value}-desc` : undefined}
                  className="mt-1 h-5 w-5 md:h-4 md:w-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                />
                <div className="ml-3 text-sm">
                  <span className="font-semibold text-slate-800">{option.label}</span>
                  {option.description && <p id={`${question.id}-opt-${option.value}-desc`} className="text-slate-600 mt-1 whitespace-pre-wrap">{option.description}</p>}
                </div>
              </label>
            ))}
          </div>
        );
      case 'checkbox-group':
        const subTotal = question.options?.reduce((acc, opt) => acc + (scores?.[(opt.id || opt.label)] || 0), 0) || 0;
        return (
            <div>
                 <div className="space-y-3">
                    {question.options?.map((option) => (
                    <label key={(option.id || option.label)} className="flex items-start p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                        type="checkbox"
                        name={(option.id || option.label)}
                        checked={scores?.[(option.id || option.label)] === option.value}
                        onChange={(e) => updateScore((option.id || option.label), e.target.checked ? option.value : 0)}
                        className="mt-1 h-5 w-5 md:h-4 md:w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        />
                        <span className="ml-3 text-sm text-slate-700">{option.label}</span>
                    </label>
                    ))}
                </div>
                <div className="mt-2 text-right text-sm font-semibold text-slate-500">Subtotal: {subTotal} / {question.maxScore}</div>
            </div>
        );
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Necesidad Real</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">¿Síntoma Satisface?</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">¿Alternativa sin Síntoma?</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {question.rows?.map((row) => {
                  const idSatisface = `${row.id}-satisface`;
                  const idAlternativa = `${row.id}-alternativa`;
                  const satisfaceValue = scores?.[idSatisface] || 0;
                  const alternativaValue = scores?.[idAlternativa] || 0;

                  return (
                    <tr key={row.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.label}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex gap-4">
                            <label className="flex items-center"><input aria-describedby={`${row.id}-desc`} type="radio" name={idSatisface} value={1} checked={satisfaceValue === 1} onChange={() => { const newSatisface = 1; updateScore(idSatisface, newSatisface); }} className="h-5 w-5 md:h-4 md:w-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"/> <span className="ml-2">SÍ</span></label>
                            <label className="flex items-center"><input aria-describedby={`${row.id}-desc`} type="radio" name={idSatisface} value={0} checked={satisfaceValue === 0} onChange={() => { const newSatisface = 0; updateScore(idSatisface, newSatisface); }} className="h-5 w-5 md:h-4 md:w-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"/> <span className="ml-2">NO</span></label>
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex gap-4">
                            <label className="flex items-center"><input aria-describedby={`${row.id}-desc`} type="radio" name={idAlternativa} value={1} checked={alternativaValue === 1} onChange={() => { const newAlternativa = 1; updateScore(idAlternativa, newAlternativa); }} className="h-5 w-5 md:h-4 md:w-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"/> <span className="ml-2">SÍ</span></label>
                            <label className="flex items-center"><input aria-describedby={`${row.id}-desc`} type="radio" name={idAlternativa} value={0} checked={alternativaValue === 0} onChange={() => { const newAlternativa = 0; updateScore(idAlternativa, newAlternativa); }} className="h-5 w-5 md:h-4 md:w-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"/> <span className="ml-2">NO</span></label>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      case 'select':
        return (
          <div>
            <select
                name={question.id}
                value={score}
                onChange={(e) => updateScore(question.id, parseInt(e.target.value, 10))}
                aria-describedby={question.options?.find(o => o.value === score)?.description ? `${question.id}-select-desc` : undefined}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            >
                <option>Seleccione una opción</option>
                {question.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div id={`${question.id}-select-desc`} className="mt-2 text-sm text-slate-500">{question.options?.find(o => o.value === score)?.description}</div>
          </div>
        );
      default:
        return <p>Tipo de pregunta no soportado: {question.type}</p>;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 p-5 rounded-xl border border-slate-200/70 shadow transition-all hover:shadow-lg hover:-translate-y-0.5">
      <h4 className="font-semibold text-md text-slate-900 tracking-tight">{question.id}: {question.title}</h4>
      {question.description && <p className="text-sm text-slate-600 mt-1 mb-4" dangerouslySetInnerHTML={{ __html: question.description }}></p>}
      <div className="mt-4 space-y-2">
        {renderQuestionType()}
      </div>
    </div>
  );
};

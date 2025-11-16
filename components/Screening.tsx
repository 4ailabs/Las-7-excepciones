
import React from 'react';
import type { Scores } from '../types';
import { screeningData } from '../constants/testData';
import { QuestionCard } from './QuestionCard';

interface ScreeningProps {
    scores: Scores;
    updateScore: (id: string, value: number) => void;
}

export const Screening: React.FC<ScreeningProps> = ({ scores, updateScore }) => {
    
    const confirmationQuestions = screeningData.series[1].questions;
    const confirmationScore = confirmationQuestions.reduce((acc, q) => acc + (scores[q.id] || 0), 0);
    
    let scoreInterpretation = '';
    if (confirmationScore >= 3) {
        scoreInterpretation = 'Baja probabilidad de excepciones. Proceder con protocolo estándar de eliminación de síntoma.';
    } else if (confirmationScore >= 0) {
        scoreInterpretation = 'Zona gris. Proceder a Parte 2 por precaución.';
    } else {
        scoreInterpretation = 'Alta probabilidad de excepciones. Proceder inmediatamente a Parte 2.';
    }
    
    return (
        <div className="space-y-8">
            {screeningData.series.map((series) => (
                <div key={series.id}>
                    <h3 className="text-xl font-semibold text-slate-800 border-b-2 border-blue-200 pb-2 mb-4">{series.title}</h3>
                    {series.description && <p className="mb-4 text-slate-600" dangerouslySetInnerHTML={{ __html: series.description }}></p>}
                    <div className="space-y-6">
                        {series.questions.map((question) => (
                            <QuestionCard key={question.id} question={question} score={scores[question.id]} updateScore={updateScore} />
                        ))}
                    </div>
                </div>
            ))}
            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h4 className="font-bold text-blue-800">Scoring de Confirmación</h4>
                <p className="text-2xl font-bold text-blue-700 mt-2">{confirmationScore} puntos</p>
                <p className="mt-1 text-blue-700">{scoreInterpretation}</p>
            </div>
        </div>
    );
};

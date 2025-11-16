
import type { Series, Scores, Section } from '../types';

export const calculateSeriesScore = (series: Series, scores: Scores): number => {
  const questionScores = series.questions.map(q => {
    if (q.type === 'checkbox-group') {
      return q.options?.reduce((subTotal, opt) => subTotal + (scores[(opt.id || opt.label)] || 0), 0) || 0;
    }
    if (q.type === 'table') {
        // Derivado: +2 si satisface (1) y no hay alternativa (0)
        return q.rows?.reduce((tableTotal, row) => {
          const idSatisface = `${row.id}-satisface`;
          const idAlternativa = `${row.id}-alternativa`;
          const satisfaceValue = scores[idSatisface] || 0;
          const alternativaValue = scores[idAlternativa] || 0;
          const rowScore = (satisfaceValue === 1 && alternativaValue === 0) ? 2 : 0;
          return tableTotal + rowScore;
        }, 0) || 0;
    }
    return (scores[q.id] || 0);
  });

  let rawScore = 0;
  if (series.scoreCalculation === 'max') {
      rawScore = Math.max(0, ...questionScores);
  } else { // default to sum
      rawScore = questionScores.reduce((total, score) => total + score, 0);
  }

  return rawScore * (series.scoreMultiplier || 1);
};

export const calculateSectionScore = (section: Section, scores: Scores): number => {
    return section.series.reduce((total, series) => {
        return total + calculateSeriesScore(series, scores);
    }, 0);
}

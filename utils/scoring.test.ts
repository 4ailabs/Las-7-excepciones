import { describe, it, expect } from 'vitest';
import { calculateSeriesScore, calculateSectionScore } from './scoring';
import type { Series, Section, Scores } from '../types';

describe('scoring', () => {
  it('sums radio answers in a series', () => {
    const series: Series = {
      id: 'x.y.A',
      title: 'Test',
      maxScore: 10,
      questions: [
        { id: 'Q1', title: 'q1', type: 'radio', options: [{ label: 'a', value: 2 }] },
        { id: 'Q2', title: 'q2', type: 'radio', options: [{ label: 'b', value: 3 }] }
      ]
    };
    const scores: Scores = { Q1: 2, Q2: 3 };
    expect(calculateSeriesScore(series, scores)).toBe(5);
  });

  it('uses stable ids for checkbox-group', () => {
    const series: Series = {
      id: 's.c.A',
      title: 'Check',
      maxScore: 10,
      questions: [
        {
          id: 'CG1',
          title: 'cg',
          type: 'checkbox-group',
          maxScore: 10,
          options: [
            { id: 'opt1', label: 'L1', value: 1 },
            { id: 'opt2', label: 'L2', value: 1 }
          ]
        }
      ]
    };
    const scores: Scores = { opt1: 1, opt2: 0 };
    expect(calculateSeriesScore(series, scores)).toBe(1);
  });

  it('derives table row scores from satisface/alternativa responses', () => {
    const series: Series = {
      id: 't.a.A',
      title: 'Table',
      maxScore: 10,
      questions: [
        {
          id: 'T1',
          title: 'table',
          type: 'table',
          rows: [{ id: 'descanso', label: 'Descanso' }, { id: 'atencion', label: 'Atención' }]
        }
      ]
    };
    const scores: Scores = {
      'descanso-satisface': 1,
      'descanso-alternativa': 0,
      'atencion-satisface': 0,
      'atencion-alternativa': 0
    };
    // descanso suma 2, atención 0
    expect(calculateSeriesScore(series, scores)).toBe(2);
  });

  it('sums series for section score', () => {
    const section: Section = {
      id: 'E1',
      title: 'Sec',
      maxScore: 50,
      series: [
        {
          id: 's1',
          title: 's1',
          maxScore: 10,
          questions: [{ id: 'Q1', title: 'q1', type: 'radio', options: [{ label: 'a', value: 2 }] }]
        },
        {
          id: 's2',
          title: 's2',
          maxScore: 10,
          questions: [{ id: 'Q2', title: 'q2', type: 'radio', options: [{ label: 'b', value: 3 }] }]
        }
      ]
    };
    const scores: Scores = { Q1: 2, Q2: 3 };
    expect(calculateSectionScore(section, scores)).toBe(5);
  });
});


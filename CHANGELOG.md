## v0.1.1 - UX refresh, mobile optimization, accessibility, scoring fixes

Highlights:
- Modern UI: gradientes, glass effect, botones mejorados, tarjetas con hover.
- Mobile-first: botones apilados y targets táctiles más grandes.
- Accesibilidad: foco visible, `aria-describedby`, validación con contador de pendientes.
- Datos/Scoring: ids estables en checkbox-group; scoring de tablas derivado; `maxScore` dinámico.
- Tooling: Tailwind local (PostCSS/purge), ESLint + Prettier, Vitest con pruebas de scoring.
- Contenido: descripciones enriquecidas para opciones y series clave.

Archivos principales tocados:
- `App.tsx`, `components/*`, `constants/testData.ts`, `utils/scoring.ts`
- Configuración: `tailwind.config.js`, `postcss.config.cjs`, `index.css`
- Calidad: `.eslintrc.cjs`, `.prettierrc`, `utils/scoring.test.ts`

# Changelog

## v0.1.0
- UX modernizada: gradientes, glass, botones y tarjetas mejoradas
- Optimización móvil: botones apilados y targets táctiles más grandes
- Accesibilidad: foco visible, aria-describedby, validación y bloqueo de avance
- Scoring: ids estables, tablas con score derivado, totales dinámicos
- Tooling: Tailwind local (PostCSS), ESLint/Prettier, Vitest con pruebas de scoring
- Contenido: descripciones ampliadas para opciones y series

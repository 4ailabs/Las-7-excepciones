
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white sticky top-0 z-20 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Test Maestro de Identificación de Excepciones</h1>
        <p className="text-slate-300/90 mt-1 text-sm md:text-base">Sistema Diagnóstico Algorítmico Integral</p>
      </div>
    </header>
  );
};

import { useState } from 'react';
import { CriptoParola } from './components/CriptoParola';
import { CriptoFrase } from './components/CriptoFrase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'parola' | 'frase'>('parola');

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
            CrittoGiochi
          </h1>
          <nav className="flex bg-neutral-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('parola')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'parola'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Cripto Parola
            </button>
            <button
              onClick={() => setActiveTab('frase')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'frase'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Cripto Frase
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        {activeTab === 'parola' ? <CriptoParola /> : <CriptoFrase />}
      </main>
    </div>
  );
}

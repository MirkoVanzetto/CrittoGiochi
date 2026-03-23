import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

function caesarCipher(text: string, shift: number) {
  return text.toUpperCase().replace(/[A-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  });
}

export function CriptoFrase() {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [targetPhrase, setTargetPhrase] = useState('');
  const [encryptedPhrase, setEncryptedPhrase] = useState('');
  const [shift, setShift] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won'>('playing');
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/frasi.json')
      .then((res) => res.json())
      .then((data: string[]) => {
        const validPhrases = data.map((p) => p.toUpperCase());
        setPhrases(validPhrases);
        startNewGame(validPhrases);
      })
      .catch((err) => {
        console.error('Failed to load phrases', err);
        const fallback = [
          'IL MATTINO HA L ORO IN BOCCA',
          'CHI DORME NON PIGLIA PESCI',
          'LA VITA E BELLA',
        ];
        setPhrases(fallback);
        startNewGame(fallback);
      });
  }, []);

  const startNewGame = (phraseList: string[] = phrases) => {
    if (phraseList.length === 0) return;
    const randomPhrase = phraseList[Math.floor(Math.random() * phraseList.length)];
    const randomShift = Math.floor(Math.random() * 25) + 1; // 1 to 25
    
    setTargetPhrase(randomPhrase);
    setShift(randomShift);
    setEncryptedPhrase(caesarCipher(randomPhrase, randomShift));
    setUserInput('');
    setGameStatus('playing');
    setIsError(false);
    
    // Focus input on new game
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (gameStatus !== 'playing') return;

    // Normalize input: remove extra spaces, uppercase
    const normalizedInput = userInput.trim().toUpperCase().replace(/\s+/g, ' ');
    const normalizedTarget = targetPhrase.trim().toUpperCase().replace(/\s+/g, ' ');

    if (normalizedInput === normalizedTarget) {
      setGameStatus('won');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 600);
    }
  };

  if (!targetPhrase) return <div className="flex-1 flex items-center justify-center">Caricamento...</div>;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto flex-1 py-8">
      <div className="text-center mb-12">
        <h2 className="text-lg font-medium text-neutral-500 mb-2 uppercase tracking-wider">
          Decifra la frase
        </h2>
        <p className="text-sm text-neutral-400 mb-8">
          La frase è stata cifrata con un Cifrario di Cesare. Trova la chiave e decifrala!
        </p>
        
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-neutral-200 mb-8">
          <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-indigo-900 tracking-widest leading-relaxed break-words">
            {encryptedPhrase}
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <motion.div
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={gameStatus === 'won'}
              placeholder="Scrivi la frase decifrata qui..."
              className={`w-full px-6 py-4 text-xl sm:text-2xl rounded-xl border-2 outline-none transition-colors ${
                isError
                  ? 'border-red-500 bg-red-50 text-red-900'
                  : gameStatus === 'won'
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-neutral-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
              }`}
              autoComplete="off"
              spellCheck="false"
            />
          </motion.div>

          {gameStatus === 'playing' ? (
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Verifica
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <div className="text-2xl font-bold text-green-600">
                Esatto! La chiave era {26 - shift} (o -{shift}).
              </div>
              <button
                type="button"
                onClick={() => startNewGame()}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-xl shadow-md hover:bg-green-700 active:scale-95 transition-all"
              >
                Prossima Frase
              </button>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}

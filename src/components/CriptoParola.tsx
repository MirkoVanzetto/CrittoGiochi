import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Keyboard } from './Keyboard';

const MAX_GUESSES = 6;

export function CriptoParola() {
  const [words, setWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [invalidWord, setInvalidWord] = useState(false);

  useEffect(() => {
    fetch('/parole.json')
      .then((res) => res.json())
      .then((data: string[]) => {
        const validWords = data.map((w) => w.toUpperCase()).filter((w) => w.length >= 5 && w.length <= 9);
        setWords(validWords);
        startNewGame(validWords);
      })
      .catch((err) => {
        console.error('Failed to load words', err);
        // Fallback
        const fallback = ['GATTO', 'CANE', 'ALBERO', 'COMPUTER', 'TASTIERA'];
        setWords(fallback);
        startNewGame(fallback);
      });
  }, []);

  const startNewGame = (wordList: string[] = words) => {
    if (wordList.length === 0) return;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setInvalidWord(false);
  };

  const onKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== 'playing') return;

      if (key === 'ENTER') {
        if (currentGuess.length !== targetWord.length) {
          // Not enough letters
          setInvalidWord(true);
          setTimeout(() => setInvalidWord(false), 500);
          return;
        }
        
        // In a real app, we might check if it's a valid dictionary word.
        // For now, any combination of correct length is accepted.
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        if (currentGuess === targetWord) {
          setGameStatus('won');
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } else if (newGuesses.length >= MAX_GUESSES) {
          setGameStatus('lost');
        }
      } else if (key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < targetWord.length) {
          setCurrentGuess((prev) => prev + key);
        }
      }
    },
    [currentGuess, gameStatus, guesses, targetWord]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onKeyPress('ENTER');
      else if (e.key === 'Backspace') onKeyPress('BACKSPACE');
      else {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) onKeyPress(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  if (!targetWord) return <div className="flex-1 flex items-center justify-center">Caricamento...</div>;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto flex-1">
      <div className="flex-1 flex flex-col justify-center w-full mb-6">
        <Grid
          targetWord={targetWord}
          guesses={guesses}
          currentGuess={currentGuess}
          invalidWord={invalidWord}
        />
      </div>

      {gameStatus !== 'playing' && (
        <div className="mb-6 text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-xl font-bold mb-2">
            {gameStatus === 'won' ? 'Hai Vinto!' : `Hai Perso! La parola era: ${targetWord}`}
          </p>
          <button
            onClick={() => startNewGame()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-lg"
          >
            Prossima Parola
          </button>
        </div>
      )}

      <Keyboard onKeyPress={onKeyPress} guesses={guesses} targetWord={targetWord} />
    </div>
  );
}

function getColors(guess: string, target: string) {
  const colors = Array(guess.length).fill('bg-neutral-500 text-white border-neutral-500');
  const targetChars = target.split('');
  const guessChars = guess.split('');

  // Greens
  for (let i = 0; i < guess.length; i++) {
    if (guessChars[i] === targetChars[i]) {
      colors[i] = 'bg-green-500 text-white border-green-500';
      targetChars[i] = null as any;
      guessChars[i] = null as any;
    }
  }

  // Yellows
  for (let i = 0; i < guess.length; i++) {
    if (guessChars[i] !== null) {
      const targetIndex = targetChars.indexOf(guessChars[i]);
      if (targetIndex !== -1) {
        colors[i] = 'bg-yellow-500 text-white border-yellow-500';
        targetChars[targetIndex] = null as any;
      }
    }
  }

  return colors;
}

function Grid({
  targetWord,
  guesses,
  currentGuess,
  invalidWord,
}: {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  invalidWord: boolean;
}) {
  const rows = Array.from({ length: MAX_GUESSES });
  const cols = targetWord.length;

  return (
    <div className="grid gap-2 mx-auto" style={{ gridTemplateRows: `repeat(${MAX_GUESSES}, minmax(0, 1fr))` }}>
      {rows.map((_, rowIndex) => {
        const isCurrentRow = rowIndex === guesses.length;
        const guess = isCurrentRow ? currentGuess : guesses[rowIndex] || '';
        const isSubmitted = rowIndex < guesses.length;
        const colors = isSubmitted ? getColors(guess, targetWord) : [];

        return (
          <motion.div
            key={rowIndex}
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            animate={isCurrentRow && invalidWord ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {Array.from({ length: cols }).map((_, colIndex) => {
              const letter = guess[colIndex] || '';
              const colorClass = isSubmitted
                ? colors[colIndex]
                : letter
                ? 'border-neutral-400 text-neutral-900'
                : 'border-neutral-200 bg-white';

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase border-2 rounded-sm transition-colors duration-300 ${colorClass}`}
                >
                  {letter}
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}

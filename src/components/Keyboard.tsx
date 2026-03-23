import { CornerDownLeft, Delete } from 'lucide-react';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export function Keyboard({
  onKeyPress,
  guesses,
  targetWord,
}: {
  onKeyPress: (key: string) => void;
  guesses: string[];
  targetWord: string;
}) {
  const keyColors: Record<string, string> = {};

  guesses.forEach((guess) => {
    const targetChars = targetWord.split('');
    const guessChars = guess.split('');
    const colors = Array(guess.length).fill('gray');

    for (let i = 0; i < guess.length; i++) {
      if (guessChars[i] === targetChars[i]) {
        colors[i] = 'green';
        targetChars[i] = null as any;
        guessChars[i] = null as any;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (guessChars[i] !== null) {
        const targetIndex = targetChars.indexOf(guessChars[i]);
        if (targetIndex !== -1) {
          colors[i] = 'yellow';
          targetChars[targetIndex] = null as any;
        }
      }
    }

    for (let i = 0; i < guess.length; i++) {
      const char = guess[i];
      const color = colors[i];
      if (color === 'green') {
        keyColors[char] = 'bg-green-500 text-white';
      } else if (color === 'yellow' && keyColors[char] !== 'bg-green-500 text-white') {
        keyColors[char] = 'bg-yellow-500 text-white';
      } else if (
        color === 'gray' &&
        keyColors[char] !== 'bg-green-500 text-white' &&
        keyColors[char] !== 'bg-yellow-500 text-white'
      ) {
        keyColors[char] = 'bg-neutral-500 text-white';
      }
    }
  });

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-2 pb-4">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 sm:gap-2">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
            const colorClass = keyColors[key] || 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300';

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`flex items-center justify-center rounded-md font-bold text-sm sm:text-base transition-colors active:scale-95 select-none ${
                  isSpecial ? 'px-3 sm:px-4 py-4' : 'w-8 sm:w-10 md:w-12 py-4'
                } ${colorClass}`}
              >
                {key === 'ENTER' ? (
                  <CornerDownLeft className="w-5 h-5" />
                ) : key === 'BACKSPACE' ? (
                  <Delete className="w-5 h-5" />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

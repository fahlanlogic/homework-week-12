
import * as React from 'react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null)); // DATA SQUARES, KONDISI AWAL NULL
  const [nextValue, setNextValue] = React.useState(calculateNextValue(squares)); // DATA GILIRAN PEMAIN/SQUARES BERIKUTNYA
  // NOTE: nextValue(true) = X/GENAP  /  nextValue(false) = O/GANJIL
  const [status, setStatus] = React.useState(null); // DATA STATUS UNTUK useEffect

  const winner = calculateWinner(squares); // PEMENANG DITENTUKAN

  // RENDER STATE STATUS
  React.useEffect(() => {
    const stat = calculateStatus(winner, squares, nextValue);
    setStatus(stat);
  }, [winner, squares, nextValue]);

  function selectSquare(square) {
    //    MENGANALISA PEMENANG   OR MENGAMBIL NILAI SQUARE < PARAMS < renderSquare < DOM
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const newSquares = squares.slice(); // SALINAN STATE SQUARES AGAR TIDAK MERUBAH NILAI ASLINYA
    newSquares[square] = nextValue ? "X" : "O"; // SQUARE BARU SEKALIGUS SQUARE SELANJUTNYA
    setSquares(newSquares); // MENYIMPAN SQUARE BARU KEDALAM STATE SQUARES
    setNextValue(!nextValue); // MENYIMPAN SQUARE SELANJUTNYA O LALU X dst..
  }

  function restart() {
    setSquares(Array(9).fill(null)); // KEMBALIKAN DATA SQUARES KE AWAL = NULL
    setNextValue(true); // MENYIMPAN SQUARE X LALU O dst..
  }

  function renderSquare(i) {
    return (
      // JIKA DI CLICK MENJALANKAN FUNGSI selectSquare()
      <button
        className="square text-6xl text-slate-700 font-semibold border border-slate-400 rounded-lg h-24 bg-white w-24"
        onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="mx-auto justify-center">
      <div className="text-center text-slate-700 text-5xl mb-12 font-black">
        Tic Tac Toe
      </div>
      <h1 className="text-xl font-semibold text-center mb-4">{status}</h1>
      <div className="p-4 border rounded-xl shadow-lg">
        <div className="flex gap-2 mb-2">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex gap-2 mb-2">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex gap-2">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button
        className="font-semibold text-xl mt-8 w-full py-2 bg-slate-700 text-white rounded-xl shadow-lg hover:bg-white hover:text-slate-700 transition duration-500"
        onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full items-center justify-center">
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner} 🥳`
    : squares.every(Boolean)
    ? `Scratch: Cat's game 🤜🏻🤛🏻`
    : `Next player: ${nextValue ? "X" : "O"}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;

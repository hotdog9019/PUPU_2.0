import React, { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    if (board[i] || winner) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Крестики — Нолики
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="mb-4 text-center">
            {winner ? (
              <div className="text-lg font-bold">
                {winner === "Ничья" ? "Ничья" : `Победитель: ${winner}`}
              </div>
            ) : (
              <div className="text-lg">Ход: {xIsNext ? "X" : "O"}</div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {board.map((cell, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className="h-20 md:h-24 flex items-center justify-center 
                           text-2xl md:text-4xl font-bold 
                           bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {cell}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-2 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Новая игра
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every(Boolean)) return "Ничья";
  return null;
}

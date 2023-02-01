import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants.js'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetStorage } from './index.js'
import { TurnSquare } from './components/TurnSquare'

function App() {

  // creamos el tablero, con un valor por defecto de 9 objetos vacíos
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board');
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  });

  // por defecto el primer turno va a ser del jugador X
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn');
    return turnFromLocalStorage ?? TURNS.X // mira si es null o undefined
  });

    const [winner, setWinner] = useState(null);
    
  const checkBoard = (boardToCheck) => {
    if (!boardToCheck.includes(null)) {
      return false
    } else {
      for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
          boardToCheck[a] && 
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
      } 
    }
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetStorage();
  }

  const updateBoard = (index) => {
 
    if (board[index] || winner) return 

    const newBoard = [ ... board];
    
    newBoard[index] = turn;

    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; 

    setTurn(newTurn); 

    saveGameToStorage({board: newBoard, turn: newTurn});

    const newWinner = checkBoard(newBoard);

    if (newWinner !== null && newWinner !== undefined) {
      confetti();
      setWinner(newWinner);
    } 
    
  }

  return (
    <main className='board'>
      <h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className='game'> 
        {
          board.map((_, index) => {
            return(
              <Square  
                key={index} 
                index={index}
                updateBoard={updateBoard} 
                >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <TurnSquare turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}
export default App

import { useState } from 'react'
import './App.css'

// declaramos los turnos, que indicarán de qué jugador será el turno
const TURNS = {
  X : 'X',
  O : 'O'
}

// creamos el componente que será cada uno de los cuadrados donde 
// se efectuará el juego
const Square = ({ children, isSelected, index, updateBoard }) => {

  // hacemos un renderizado condicional determinando si el elemento está seleccionado o no para saber de quién es el turno
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  }
  return( 
    <div className={className}  onClick={handleClick}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const EndOfGameMessage = ({ winner, restartGame, end }) => {
  const className = `end ${winner & 'winner'}`
  const text = 'El ganador es ' + winner
  winner ? console.log('winner') : null
  winner ? console.log(end) : null
  return(
    <section className={className}>
      <span className='text'>
        {text}
      </span>
    </section>       
  )
}

function App() {

  // creamos el tablero, con un valor por defecto de 9 objetos vacíos
  const [board, setBoard] = useState(Array(9).fill(null));

  // por defecto el primer turno va a ser del jugador X
  const [turn, setTurn] = useState(TURNS.X);

  
  // por defecto no hay ganador
  // con un false, se puede declarar un empate,
  // después intentar que el jugador ponga su nombre, 
  // y que pueda elegir si jugará con 'x' u 'o'
  // y en base a ese nombre será nombrado ganador o no
  // que la máquina también pueda ser nombrada ganadora
  // con un sistema como este se puede almacenar el nombre del usuario
  // y el nombre de la máquina
  // para así poder determinar de una manera más gráfica el ganador
  // const TURNS = {
    // X : 'X',
    // O : 'O'
    const [winner, setWinner] = useState(null);
    
    
    const [end, setEnd] = useState(false);


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
  
  const checkEnd = (winner, end) => {
    console.log('hay ganador')
    console.log(winner);
    console.log(end)
    
  }

  const updateBoard = (index) => {
    
    
    // si el cuadrado seleccionado contiene algo (es distinto a null)
    // finalizamos la ejecución de la función con el 'return'
    // por lo tanto no actualizamos el tablero
    //        O
    // si hay un ganador, no se puede seguir jugando
    if (board[index] || winner || end) return 

    // si el cuadrado seleccionado está vacío (o su valor es null), sigue la función

    // se crea una nueva variable del tablero
    // utilizando el spread operator para copiar el objeto indicado
    // esto se hace para no utilizar el board directamente,
    // y para no modificarlo
    // recordemos que las props deben ser inmutables, no se pueden modificar
    const newBoard = [ ... board];
    // actualizamos el valor del cuadrado que el usuario toca
    // dándole el valor del turno actual
    newBoard[index] = turn;
    // con el useState actualizamos el tablero
    setBoard(newBoard);
    // creamos un nuevo turno, que va a ser distinto al turno actual
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; 
    // hacemos el cambio de turno
    setTurn(newTurn); 
    // se crea una variable con el valor el jugador ganador
    const newWinner = checkBoard(newBoard);
    // si se encuentra un ganador, se cambia el estado
    if (newWinner) {
      setWinner(newWinner)
      const newEnd = true
      setEnd(newEnd)
      checkEnd(newWinner, newEnd)
    } else if (newWinner === false) {
      setWinner(false)
      const newEnd = true
      setEnd(newEnd)
      checkEnd(newWinner, newEnd)
    }

  }

  return (
    <main className='board'>
      <h1>Tic-tac-toe</h1>
      <section className='game'> {/* sección para mostrar el tablero de juego */}
        {
          // hacemos un map para desplegar todos los valores que tiene dentro
          // el array 'board' que es el tablero
          board.map((_, index) => {
            return(
              <Square  
                key={index} 
                index={index}
                updateBoard={updateBoard} // le pasamos la función, pero sin su ejecución
                >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'> {/* sección para mostrar los turnos */}
        {/* la prop 'isSelected' determina de quién es el turno */}
        <Square isSelected={turn === TURNS.X} > 
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {/* agregar funcionalidad de agregar cartel que diga quien es el ganador, si hay */}
      <EndOfGameMessage winner={winner} checkEnd={checkEnd} />
    </main>
  )
}
export default App

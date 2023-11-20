// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from './02'

const initialSquares = Array(9).fill(null)
const initialHistory = Array(1).fill(initialSquares)
const initialMoveNo = 0

function Board() {
  const [squares, setSquares] = useLocalStorageState('squares', initialSquares)
  const [history, setHistory] = useLocalStorageState('history', initialHistory)
  const [moveNo, setMoveNo] = useLocalStorageState('moveNo', initialMoveNo)
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    const historyCopy = [...history]

    squaresCopy[square] = nextValue
    historyCopy[squaresCopy.filter(Boolean).length] = squaresCopy
    setSquares(squaresCopy)
    setHistory(historyCopy)
    setMoveNo(moveNo+1)
  }

  const selectHistory = (move, index) => {
    setSquares(move)
    setMoveNo(index)
  }

  function restart() {
    setSquares(initialSquares)
    setHistory(initialHistory)
    setMoveNo(initialMoveNo)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <ol>
        {history
          .map((move, index) => {
            const disabled = index === moveNo
            const child = disabled ? `Go to move #${index} (current)` : `Go to move #${index}` 
            return <button 
              key={move} 
              onClick={() => selectHistory(move, index)}
              disabled={disabled}
            >
              {child}
            </button>
          })
        }
      </ol>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App

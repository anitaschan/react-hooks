// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useState, useEffect} from 'react'

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState('')
  const [nextValue, setNextValue] = useState(calculateNextValue(squares))
  const [status, setStatus] = useState(
    calculateStatus(winner, squares, nextValue),
  )
  console.log('status', status)
  console.log('nextValue', nextValue)
  function selectSquare(square) {
    if (calculateWinner(squares) !== null) {
      setWinner(calculateWinner(squares))
      console.log(winner)
      setStatus(calculateStatus(winner, squares, nextValue))
      return ''
    } else {
      const squaresCopy = [...squares]
      squaresCopy[square] = nextValue
      setNextValue(calculateNextValue(squares))
      setSquares(squaresCopy)
      setWinner(calculateWinner(squares))
      setNextValue(calculateNextValue(squares))
    }
  }

  useEffect(() => {
    return () => {
      setStatus(calculateStatus(winner, squares, nextValue))
    }
  }, [winner, nextValue, squares])

  function restart() {
    setSquares(Array(9).fill(null))
    setWinner('')
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

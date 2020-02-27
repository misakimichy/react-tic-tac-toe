import React from 'react'
import Result from './Result'
import GameBoard from './GameBoard'

const App = () => {
  return (
    <div className="App">
    <h1>Tic Tac Toe</h1>
      <Result />
      <GameBoard />
    </div>
  )
}

export default App

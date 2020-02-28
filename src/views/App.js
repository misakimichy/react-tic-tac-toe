import React from 'react'
import PropTypes, { number } from 'prop-types'
import { connect } from 'react-redux'
import{ gameOperations } from './../state/ducks/game'

const App = ({ player, switchTurn }) => {
  const handleClick = () => {
    switchTurn(player, 0 ,1)
  }
  return (
    <div className="App">
    <h1>Tic Tac Toe</h1>
      <p>Current player is: {player}</p>
      <button onClick={handleClick}>Make a move</button>
    </div>
  )
}

App.propTypes = {
  player: PropTypes.number.isRequired,
  switchTurn: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { gameState } = state
  return {
    player: gameState.player,
    winner: gameState.winner
  }
}

const mapDispatchToProps = {
  switchTurn: gameOperations.switchTurn
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

import { newGame, gameover, switchPlayer, winner, movePlayer } from './actions'
import { isWinner, isDraw } from './../../utils/game'

// Check if a plyer win or players are draw
const checkWinner = (board, player) => dispatch => {
    if(isWinner(board, player)) {
        dispatch(winner(player))
        dispatch(gameover())
    } else if(isDraw(board)) {
        dispatch(winner(0))
        dispatch(gameover())
    }
}

// Argument: player - current player
const switchTurn = (player, row, col) => dispatch => {
    let nextPlayer
    switch(player) {
        case 1 :
            nextPlayer = 2
            break;
        case 2 :
            nextPlayer = 1
            break;
    }
    dispatch(movePlayer(player, row, col))
    dispatch(switchPlayer(nextPlayer))
}

export {
    newGame,
    checkWinner,
    switchTurn
}
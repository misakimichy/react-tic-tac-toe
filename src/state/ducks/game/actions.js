import * as types from './types'

export const newGame = () => ({
    types: types.NEW_GAME
})

export const gameover = () => ({
    type: types.GAMEOVER
})

export const movePlayer = (player, row, col) => ({
    types: types.MOVE,
    payload: { player, row, col }
})

export const switchPlayer = player => ({
    type: types.PLAYER,
    payload: player
})

export const winner = player => ({
    type: types.WINNER,
    payload: player
})
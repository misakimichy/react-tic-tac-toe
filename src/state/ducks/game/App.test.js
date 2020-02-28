import React from 'react'
import { render } from '@testing-library/react'
import App from './../../../views/App'
import reducer from './reducers'
import * as actions from './actions'
import * as operations from './operations'

describe('Game Deck', () => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  
  const drawBoard = [
    [2, 2, 1],
    [1, 1, 2],
    [2, 1, 1,]
  ]

  const player1Win = [
    [2, 2, 0],
    [1, 1, 1],
    [2, 2, 0,]
  ]
  const player2Win = [
    [2, 2, 2],
    [1, 1, 0],
    [1, 1, 0,]
  ]

  describe('Reducers', () => {
    it('should have an initial state', () => {
      const expectedState = {
        board: [[]],
        gameStatus: false,
        player: 1,
        winner: -1
      }
      const action = { type: 'NOT_GAME_TYPE' }
      const result= reducer(undefined, action)

      expect(result).toEqual(expectedState)
    })
    

    it('should start a new game', () => {
      const state = {
        board: emptyBoard,
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: emptyBoard.slice(),
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const action = actions.newGame()
      const result = reducer(state, action)

      expect(result).toEqual(expectedState)
    })

    it('should end a game', () => {
      const state = {
        board: emptyBoard,
        gameStatus: true,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: emptyBoard,
        gameStatus: true,
        player: 1,
        winner: -1
      }

      const action = actions.gameover()
      const result = reducer(state, action)

      expect(result).toEqual(expectedState)
    })

    it('should update the board when a player makes a move', () => {
      const state = {
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ],
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ],
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const player = 1
      const row = 2
      const col = 2

      const action = actions.movePlayer(player, row, col)
      const result = reducer(state, action)

      expect(result).toEqual(expectedState)
    })


    it('should win a game', () => {
      const state = {
        board: player1Win,
        gameStatus: true,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: player1Win,
        gameStatus: true,
        player: 1,
        winner: 1
      }

      const action = actions.winner(1)
      const result = reducer(state, action)

      expect(result).toEqual(expectedState)
    })

    it('should siwtch players', () => {
      const state = {
        board: emptyBoard,
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: emptyBoard,
        gameStatus: false,
        player: 2,
        winner: -1
      }

      const action = actions.switchPlayer(2)
      const result = reducer(state, action)

      expect(result).toEqual(expectedState)
      
      const state2 = {...expectedState}
      const expectedState2 = {
        board: emptyBoard,
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const action2 = actions.switchPlayer(1)
      const result2 = reducer(state2, action2)
      
      expect(result2).toEqual(expectedState2)
    })
  })
  
  describe('operations', () => {
    const { checkWinner, switchTurn } = operations
    
    it('should dispatch a winner', () => {
      const dispatch = jest.fn()
      const board = player1Win
      const player = 1
      const winnerAction = actions.winner(1)
      const gameoverAction = actions.gameover()

      checkWinner(board, player)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction)
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction)
    })
    
    it('should dispatch a draw', () => {
      const dispatch = jest.fn()
      const board = drawBoard
      const player = 1

      const winnerAction = actions.winner(0)
      const gameoverAction = actions.gameover()

      checkWinner(board, player)(dispatch)
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction)
      expect(dispatch.mock.calls[0][0]).toEqual(gameoverAction)
    })

    it('should not dispatch if game is in progress', () => {
      const dispatch = jest.fn()
      const board = emptyBoard
      const player = 1

      checkWinner(board, player)(dispatch)

      expect(dispatch).not.toHaveBeenCalled()
    })

    it('should play a turn', () => {
      const dispatch = jest.fn()

      let player = 1
      let row = 0
      let col = 0

      const move1 = actions.movePlayer(player, row, col)
      const switch1 = actions.switchPlayer(2)

      switchTurn(player, row, col)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(move1)
      expect(dispatch.mock.calls[1][0]).toEqual(switch1)

      player = 2
      row = 1
      col = 1

      const move2 = actions.movePlayer(player, row, col)
      const switch2 = actions.switchPlayer(1)

      switchTurn(player, row, col)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(4)
      expect(dispatch.mock.calls[2][0]).toEqual(move2)
      expect(dispatch.mock.calls[3][0]).toEqual(switch2)
    })
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import App from '../../components/App'
import reducer from './reducers'
import * as actions from './actions'
import * as operations from './operations'

describe('Game Deck', () => {
  const board = [
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
        board: board,
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: board.slice(),
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
        board: board,
        gameStatus: true,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: board,
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
        board: board,
        gameStatus: false,
        player: 1,
        winner: -1
      }

      const expectedState = {
        board: board,
        gameStatus: false,
        player: 2,
        winner: -1
      }

      const action = actions.switchPlayer(2)
      const result = reducer(state, action)

      expect(result).toEqual(expectedState)
      
      const state2 = {...expectedState}
      const expectedState2 = {
        board: board,
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
      const dispatch = jest.fn()
      const board = player1WinBoard
      const player = 1
      const winnerAction = actions.winner(1)
      const gameoverAction = actions.gameover()

      CheckWinner(board, player)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction)
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction)
  })
})

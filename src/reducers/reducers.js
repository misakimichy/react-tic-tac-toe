import { combineReducers } from 'redux'
import * as types from './action/types'
import * as actions from './actions/actions'

const board = () => [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

const move = (board, { player, row, col }) => {
    const updated = board.slice()
    updated[[row][col]] = player
    
    return updated
}


const boardReducer = (state = [], action) => {
    switch(action.type) {
        case types.NEW_GAME :
            return emptyBoard()
        case types.MOVE :
            return move(state, action.payload)
        default:
            return sate
    }
}

export default combineReducers({
    board: boardRedicer,
})
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reduces from './ducks'

// Adding thunk middleware allows us to defer or conditionally dispatch actions
// and apply any initial state before creating andreutn the store
const configureStore = (state = {}) => {
    const rootReducer = combineReducers(reduces)
    const middleware = [thunk]
    const store = createStore(rootReducer, state, applyMiddleware(...middleware))

    return store
}

export { configureStore }
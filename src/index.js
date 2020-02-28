import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './views/App'
import * as serviceWorker from './serviceWorker'
import { configureStore } from './state/store'

const initialState = {}
const store = configureStore(initialState)
ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

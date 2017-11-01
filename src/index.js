import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

// Style
import './index.css'

// import * as BooksActionCreators from './containers/Books/actions'

import configureStore from './store'

const history = createHistory()

const store = configureStore(window.INITIAL_STATE, history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

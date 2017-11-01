import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

// Could also use localstorage
// npm un --save redux-persist
// import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from './reducers'

export default function configureStore (initialState = {}, history) {
  const logger = createLogger()

  const historyMiddleware = routerMiddleware(history)

  const middleware = [thunk, historyMiddleware, logger]

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  const enhancers = composeEnhancers(applyMiddleware(...middleware))

  const store = createStore(rootReducer, initialState, enhancers)

  return store
}

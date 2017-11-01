import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import bookReducers from './containers/BookList/reducers'
import cartReducers from './containers/Cart/reducers'
import bookFormReducers from './containers/BookForm/reducers'

export default combineReducers({
  books: bookReducers,
  cart: cartReducers,
  bookForm: bookFormReducers,
  router: routerReducer
})

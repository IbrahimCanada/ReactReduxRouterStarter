import * as CartActionTypes from './actionTypes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.GET_CART: {
      return [...action.payload.cart]
    }

    case CartActionTypes.ADD_TO_CART: {
    // Check if already in cart to increment quantity
      const bookIndex = state.findIndex(book => book.id === action.payload.book.id)
      if (bookIndex === -1) {
        return [...state, action.payload.book]
      }
      return state.map((book, index) => {
        if (index === bookIndex) {
          return {
            ...book,
            quantity: book.quantity + 1
          }
        }
        return book
      })
    }

    case CartActionTypes.ADD_TO_CART_REJECTED: {
      // Check if already in cart to increment quantity

      return state
    }

    case CartActionTypes.DELETE_FROM_CART:
      return state.filter(({ id }) => id !== action.payload.id)

    case CartActionTypes.UPDATE_BOOK_QUANTITY_IN_CART: {
      const bookIndex = state.findIndex(book => book.id === action.payload.book.id)
      return state.map((book, index) => {
        const newQuantity = book.quantity + action.payload.quantity

        if (newQuantity < 1) return book
        if (index === bookIndex) {
          return {
            ...book,
            quantity: book.quantity + action.payload.quantity
          }
        }
        return book
      })
    }

    default:
      return state
  }
}

export default reducer

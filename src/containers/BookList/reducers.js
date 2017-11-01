import * as BookActionTypes from './actionTypes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BookActionTypes.GET_BOOK_LIST:
      return [...action.payload.books]

    case BookActionTypes.POST_BOOK:
      return [...state, action.payload.book]

    case BookActionTypes.POST_BOOK_REJECTED:
      return state

    case BookActionTypes.DELETE_BOOK:
      return state.filter(book => book.id !== action.payload.id)

    case BookActionTypes.UPDATE_BOOK_TITLE: {
      const bookIndex = state.findIndex(book => book.id === action.payload.id)
      return state.map((book, index) => {
        if (index === bookIndex) {
          return {
            ...book,
            title: action.payload.title
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

import axios from 'axios'

import * as BookActionTypes from './actionTypes'
import * as BookFormActionTypes from '../../containers/BookForm/actionTypes'

export const getBooks = () => (dispatch) => {
  axios
    .get('/api/v1/books/')
    .then((response) => {
      dispatch({ type: BookActionTypes.GET_BOOK_LIST,
        payload: {
          books: response.data
        }
      })
    })
    .catch((err) => {
      dispatch({ type: BookActionTypes.GET_BOOK_LIST_REJECTED, payload: err })
    })
}

export const postBook = data => (dispatch) => {
  dispatch({ type: BookFormActionTypes.SAVE_BUTTON_PRESSED, payload: {} })
  axios
    .post('/api/v1/books/', data)
    .then((response) => {
      dispatch({ type: BookActionTypes.POST_BOOK,
        payload: {
          book: response.data
        }
      })
      dispatch({ type: BookFormActionTypes.SAVE_ACTION_ACCEPTED, payload: {} })
    })
    .catch((err) => {
      dispatch({ type: BookActionTypes.POST_BOOK_REJECTED, payload: {} })
      dispatch({ type: BookFormActionTypes.SAVE_ACTION_REJECTED, payload: err.response.data })
    })
}

export const deleteBook = id => (dispatch) => {
  axios
    .delete(`/api/v1/books/${id}`)
    .then((response) => {
      dispatch({ type: BookActionTypes.DELETE_BOOK,
        payload: {
          id
        }
      })
    })
    .catch((err) => {
      dispatch({ type: BookActionTypes.DELETE_BOOK_REJECTED, payload: err })
    })
}

export const updateBookTitle = book => ({
  type: BookActionTypes.UPDATE_BOOK_TITLE,
  payload: {
    id: book.id,
    title: book.title
  }
})

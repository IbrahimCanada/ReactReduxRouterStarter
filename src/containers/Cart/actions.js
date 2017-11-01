import axios from 'axios'

import * as CartActionTypes from './actionTypes'

export const getCart = () => (dispatch) => {
  axios
    .get('/api/v1/cart/')
    .then((response) => {
      dispatch({ type: CartActionTypes.GET_CART,
        payload: {
          cart: response.data.cart
        }
      })
    })
    .catch((err) => {
      dispatch({ type: CartActionTypes.GET_CART_REJECTED, payload: err })
    })
}

export const addToCart = book => (dispatch) => {
  axios
    .post('/api/v1/cart/', book)
    .then((response) => {
      dispatch({ type: CartActionTypes.ADD_TO_CART,
        payload: {
          book: response.data
        }
      })
    })
    .catch((err) => {
      dispatch({ type: CartActionTypes.ADD_TO_CART_REJECTED, payload: err })
    })
}

export const deleteFromCart = book => (dispatch) => {
  axios
    .delete(`/api/v1/cart/${book.id}`)
    .then((response) => {
      dispatch({ type: CartActionTypes.DELETE_FROM_CART,
        payload: {
          id: response.data.id
        }
      })
    })
    .catch((err) => {
      dispatch({ type: CartActionTypes.DELETE_FROM_CART_REJECTED, payload: err })
    })
}

export const updateBookQuantityInCart = (book, quantity) => (dispatch) => {
  axios
    .put('/api/v1/cart/', {
      book,
      quantity
    })
    .then((response) => {
      dispatch({ type: CartActionTypes.UPDATE_BOOK_QUANTITY_IN_CART,
        payload: {
          book: response.data.book,
          quantity: response.data.quantity
        }
      })
    })
    .catch((err) => {
      dispatch({ type: CartActionTypes.UPDATE_BOOK_QUANTITY_IN_CART_REJECTED, payload: err })
    })

  // type: CartActionTypes.UPDATE_BOOK_QUANTITY_IN_CART,
  // payload: {
  //   book,
  //   quantity
  // }
}

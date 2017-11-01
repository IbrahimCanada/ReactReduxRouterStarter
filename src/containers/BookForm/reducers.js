import * as BookFormActionTypes from './actionTypes'

const initialState = {
  isLoading: false,
  isBookSaved: false,
  saveButton: {
    isEnabled: true,
    style: 'primary',
    text: 'Save'
  },
  message: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BookFormActionTypes.SAVE_BUTTON_PRESSED: {
      return {
        ...state,
        isLoading: true,
        saveButton: {
          style: 'info',
          isEnabled: false,
          text: 'Saving...'
        }
      }
    }

    case BookFormActionTypes.SAVE_ACTION_ACCEPTED: {
      return {
        ...state,
        isLoading: false,
        isBookSaved: true,
        saveButton: {
          isEnabled: true,
          style: 'success',
          text: 'Saved!'
        },
        message: 'Book saved successfully.'
      }
    }

    case BookFormActionTypes.SAVE_ACTION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        isBookSaved: false,
        saveButton: {
          style: 'danger',
          text: 'Failed!'
        },
        message: action.payload.message
      }
    }

    case BookFormActionTypes.SAVE_BUTTON_RESET: {
      return initialState
    }

    default:
      return state
  }
}

export default reducer

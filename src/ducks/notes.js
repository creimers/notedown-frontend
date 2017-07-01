import { db } from 'utils/db'

export const getNotesRequest = () => {
  return {
    type: 'GET_NOTES_REQUEST'
  }
}

export const getNotesSuccess = (notes) => {
  return {
    type: 'GET_NOTES_SUCCESS',
    notes
  }
}

// TODO: dynamic sorting
export const getNotes = () => {
  return (dispatch, getState) => {
    dispatch(getNotesRequest())

    let selector = {
      created: {$gt: null},
    }
    let selectedTags = getState().tags.selectedTags
    if (selectedTags.length > 0) {
      selector.tags = {$all: selectedTags}
    }

    return db.find({
      selector,
      sort: [{created: 'desc'}]
    })
    .then(response => dispatch(getNotesSuccess(response.docs)))
    .catch(err => console.log(err))
  }
}

// ///////
// REDUCER
// ///////

let defaultState = {
  notes: [],
  isFetching: false
}

const notesReducer = (state=defaultState, action) => {

  switch (action.type) {
    case 'GET_NOTES_REQUEST':
      return {...state, isFetching: true}

    case 'GET_NOTES_SUCCESS':
      return {...state, isFetching: false, notes: action.notes}

    case 'TOGGLE_TAG':
      // do the querying here!
      return state

    case 'CLEAR_SELECTED_TAGS':
      return state

    default:
      return state
  }
}

export default notesReducer

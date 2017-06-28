import { persistentReducer } from 'redux-pouchdb'

export const addNote = note => {
  return {
    type: 'ADD_NOTE',
    note
  }  
}

// ///////
// REDUCER
// ///////

let defaultState = {
  notes: [],
  isFetchingNotes: false,
}

const notesReducer = (state = defaultState, action) => {
  switch (action.type) {

    case 'ADD_NOTE':
      return {...state, notes: [...state.notes, action.note]}

    default:
      return state
  }
}

export default persistentReducer(notesReducer, 'notes')

/* globals emit sum */

import { db } from 'utils/db'

export const extractTagsRequest = () => {
  return {
    type: 'EXTRACT_TAGS_REQUEST'
  }
}

export const extractTagsSuccess = (tags) => {
  return {
    type: 'EXTRACT_TAGS_SUCCESS',
    tags
  }
}

export const toggleTag = (tag) => {
  return {
    type: 'TOGGLE_TAG',
    tag
  }
}

export const clearSelectedTags = (tag) => {
  return {
    type: 'CLEAR_SELECTED_TAGS'
  }
}

export function extractTags() {
  return dispatch => {
    dispatch(extractTagsRequest())

    const map = (doc) => {
      if(doc.tags.length > 0) {
        doc.tags.forEach(tag => {emit(tag, 1)})
      }
    }    

    const reduce = (keys, values) => {
      return sum(values)
    }

    return db.query(
      {map, reduce},
      {reduce: true, group: true, group_leve: 1}
    )
    .then(response => dispatch(extractTagsSuccess(response.rows)))
    .catch(err => console.log(err))
  }
}

// ///////
// REDUCER
// ///////

let defaultState = {
  tags: [],
  selectedTags: [],
  isFetching: false
}

const appReducer = (state=defaultState, action) => {

  switch (action.type) {
    case 'EXTRACT_TAGS_REQUEST':
      return {...state, isFetching: true}

    case 'EXTRACT_TAGS_SUCCESS':
      return {...state, tags: action.tags, isFetching: false}

    case 'TOGGLE_TAG':
      let tagsSelected = [...state.selectedTags]
      if (!tagsSelected.includes(action.tag)) {
        tagsSelected.push(action.tag)
      }
      else {
        let i = tagsSelected.findIndex(t => t === action.tag)
        tagsSelected.splice(i, 1)
      }
      return {...state, selectedTags: tagsSelected}

    case 'CLEAR_SELECTED_TAGS':
      return {...state, selectedTags: []}

    default:
      return state
  }
}

export default appReducer

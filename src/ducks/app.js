export const toggleTagsMenu = () => {
  return {
    type: 'TOGGLE_TAGS_MENU'
  }
}

// ///////
// REDUCER
// ///////

let defaultState = {
  tagsMenuOpen: false
}

const appReducer = (state=defaultState, action) => {

  switch (action.type) {

    case 'TOGGLE_TAGS_MENU':
      return {...state, tagsMenuOpen: !state.tagsMenuOpen}

    default:
      return state
  }
}

export default appReducer

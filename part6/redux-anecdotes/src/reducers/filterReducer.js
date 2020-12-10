const filterReducer = (state = '', action) => {
  console.log('state now: filter ', state)
  console.log('action filter', action.filter)
    switch (action.type) {
      case 'SET_FILTER': {
        return action.filtered
      }
    default: // if none of the above matches, code comes here
    }
  return state
}

export const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    filtered: filter
  }
}

export default filterReducer
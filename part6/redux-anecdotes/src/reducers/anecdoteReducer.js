import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
    switch (action.type) {
      case 'VOTE': {
        const id = action.data.id
        const anecdoteToChange = state.find(anecdote => anecdote.id === id) // get anecdote to change
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }// increase vote by one
        return state.map(anecdote => 
          anecdote.id !== id 
          ? anecdote 
          : changedAnecdote)        
      }
      case 'UPDATE_ANECDOTE': {
        const id = action.data.id
        const changedAnecdote = action.data

        return state.map(anecdote => 
          anecdote.id !== id 
          ? anecdote 
          : changedAnecdote)
      }
      case 'ADD_ANECDOTE': {
        return state.concat(action.data)
      }
      case 'INIT_ANECDOTES': {
        return action.data
      }
    default: // if none of the above matches, code comes here
    }
  return state
}

// export const initialiseAnecdotes = (anecdotes) => {
//   return {
//     type: 'INIT_ANECDOTES',
//     data: anecdotes
//   }
// }
export const initialiseAnecdotes = () => {
  return async dispatch => { // action creators can return a function instead of action obj -  this funciton can dispatch actions as it receives dispatch method as its argument which can then be used to dispatch in the same way as a standard action creator
    const anecdotes = await anecdoteService.getAll() // redux thunk let's us use an impure function such as an api call
    dispatch({
          type: 'INIT_ANECDOTES',
          data: anecdotes
        })
  }
}

// export const increaseVote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }


export const increaseVote = (anecdote) => {
  return async dispatch => {
  await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const updateAnecdote = (updateAnecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(updateAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: updateAnecdote
    })
  }
}

// const getId = () => (100000 * Math.random()).toFixed(0)

// export const createAnecdote = (content) => {
//   return {
//     type: 'ADD_ANECDOTE',
//     data: {
//       content: content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }
export const createAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(newAnecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote
    })
  }
}


export default reducer
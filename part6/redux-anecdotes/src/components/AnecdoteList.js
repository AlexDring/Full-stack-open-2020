import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  // console.log('props', props);
  // console.log(props.increaseVote);
  // console.log(increaseVote);

  // const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes))
  // const filtered = useSelector(state => state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filtered.toLowerCase())))
  const anecdotes = props.anecdotes.sort((a,b) => b.votes - a.votes)
  const filtered = props.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(props.filtered.toLowerCase()))

  const showAnecdotes = filtered ? filtered : anecdotes

  // const dispatch = useDispatch()

  const vote = (anecdote) => {
    // dispatch(increaseVote(anecdote))
    // dispatch(setNotification(`you voted for ${anecdote.content}`, 5))
    
    props.increaseVote(anecdote)
    props.setNotification(`you voted for ${anecdote.content}`, 5)

    // const updateVote = { ...anecdote, votes: anecdote.votes + 1 }
    // dispatch(updateAnecdote(updateVote))
    // dispatch(setNotification(`you voted for ${anecdote.content}`))
  }
  
  return(
    <>
      {showAnecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote} 
          handleClick={() => vote(anecdote)} 
        />
      )}
    </>
  )}


  const mapStateToProps = (state) => ({
    anecdotes: state.anecdotes,
    filtered: state.filtered
  })

// export default AnecdoteList

const AnecdoteListConnect = connect(
  mapStateToProps,
  { increaseVote, setNotification } 
  )(AnecdoteList)
export default AnecdoteListConnect
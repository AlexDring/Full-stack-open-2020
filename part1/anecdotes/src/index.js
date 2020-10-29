import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({ content,votes }) => {
  return (
    <>
      <p>{content}
      <br />has {votes} votes</p>
    </>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const points = new Array(anecdotes.length).fill(0)
  const [votes, voteState] = useState(points)
  let votesMax = votes.indexOf(Math.max(...votes));

  function handleVoteClick () {
    let copy = [...votes]
    copy[selected] += 1
    voteState(copy) 
  }

  function randomNumber () {
    setSelected( Math.floor((Math.random() * anecdotes.length)))
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote content={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={randomNumber} text="next anecdote" />
      <h2>Anecdote with the most votes</h2>
      <Anecdote content={anecdotes[votesMax]} votes={votes[votesMax]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
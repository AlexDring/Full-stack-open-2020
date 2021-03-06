import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import { useField } from './hooks/index'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      {/* <a href='#' style={padding}>anecdotes</a> */}
      {/* <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a> */}
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}
const Notification = ({ notification }) => <p>{notification}</p>

const Anecdote = (props) => {
  console.log(props);
  const { anecdote } = props
  return(
    <div>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const AnecdoteList = (props) => {
  console.log(props);
  const { anecdotes } = props
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          // <li key={anecdote.id} >{anecdote.content}</li>
        <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li> 
        )}
      </ul>
    </div>
  )}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: contentReset, ...content } = useField('text') 
  const { reset: authorReset, ...author } = useField('text')
  const { reset: infoReset, ...info } = useField('text')// <-- destructuring to remove 'reset' from inputs. Details on assigning new name here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names 

  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const history = useHistory();

  // console.log('content', content);
  // console.log('content', author);
  // console.log('content', info);
  
  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content'
          //  name='content' value={content} onChange={(e) => setContent(e.target.value)} 
          // name='content' type={content.type} value={content.value} onChange={content.onChange}
          { ...content }
           />
        </div>
        <div>
          author
          <input name='author'
          // name='author' value={author} onChange={(e) => setAuthor(e.target.value)} 
          // name='author' type={author.type} value={author.value} onChange={author.onChange}
          { ...author }
          />
        </div>
        <div>
          url for more info
          <input name='info' 
          // name='info' value={info} onChange={(e)=> setInfo(e.target.value)} 
          // name='info' type={info.type} value={info.value} onChange={info.onChange}
          { ...info }
          />
        </div>
        <button type='submit'>create</button><input onClick={handleReset} type='reset' />
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    newNotification(`a new anecdote ${anecdote.content} has been created!`)
  }

  const newNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  let match = useRouteMatch("/anecdotes/:id"); //TODO Every time the component is rendered, so practically every time the browser's url changes, this following command is executed.
  const anecdote = match
    ? anecdotes.find(anecdote => {
      // console.log(anecdote.id === match.params.id);
      return Number(anecdote.id) === Number(match.params.id)
    }) //TODO If the url matches /notes/:id, the match variable will contain an object from which we can access the parametrized part of the path, the id of the note to be displayed, and we can then fetch the correct note to display.
    : null 

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      { notification ? <Notification notification={notification} /> : null }
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} /> 
          {/*//TODO if there's a match from useRouteMatch above then pass the found anecdote in as a prop. 
          */}
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
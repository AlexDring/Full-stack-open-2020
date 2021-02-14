import React, { useState } from 'react'
import { useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from '../queries'

const NewBook = ({ notify, show, setPage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  // const updateCache = (addedBook) => {
  //   const includedIn = (set, object) => 
  //   set.map(p => p.id).includes(object.id)  
    
  //   const dataInStore = client.readQuery({ query: ALL_BOOKS })
  //   console.log(dataInStore, 'dataInStore')
  //   // if(!dataInStore.allBooks.some(book => book.id === addedBook.id)) {
  //   if (!includedIn(dataInStore.allBooks, addedBook)) {
  //     client.writeQuery({
  //       query: ALL_BOOKS,
  //       data: { allBooks: dataInStore.allBooks.concat(addedBook) }
  //     })
  //   }
    
  //   const authorInStore = client.readQuery({ query: ALL_AUTHORS })
  //   console.log(authorInStore, 'authorInStore')
  //   // debugger
  //   console.log(addedBook.author)
  //   // if(!authorInStore.allAuthors.some(author => console.log(author.id, addedBook.author.id))) {
  //   if (!includedIn(authorInStore.allAuthors, addedBook.author)) {
  //     client.writeQuery({
  //       query: ALL_AUTHORS,
  //       data: { allAuthors: authorInStore.allAuthors.concat(addedBook.author) }
  //     })
  //   }
  // }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
    
    const authorInStore = client.readQuery({ query: ALL_AUTHORS })
    console.log(addedBook);
    if (!includedIn(authorInStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : authorInStore.allAuthors.concat(addedBook.author) }
      })
    }   
  }
   
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} by ${addedBook.author.name} has been added to the library.`)
      updateCacheWith(addedBook)
    }
  })

  const [ createBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
   })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres } })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(', ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
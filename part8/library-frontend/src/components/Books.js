import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
 
const Books = ({ show, books }) => {
  const [genreFilter, setGenreFilter] = useState('all genres')
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    }
  }, [result])
  
  if (!show) {
    return null
  }
  
  let genres = []
  books.forEach(book =>
    book.genres.forEach(genre => {
      if(!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  )

  const filterQuery = (filter) => {
    getBooks({ variables: { searchGenre: filter } }) 
    setGenreFilter(filter)
  }
  
  // const bookFilter = (genreFilter) => {
  //   if(genreFilter === "all genres") {
  //     return books
  //   } else {
  //     return books.filter(book => book.genres.includes(genreFilter))
  //   }
  // }
  

  // console.log(genres.data.allBooks)
  // genres.data.allBooks.filter((item, index) => {
  //     console.log(item.genres, index);
  //   })
  // console.log(result.data.allBooks)
  // let allGenres = []
  // result.data.allBooks.forEach(b => {
  //   allGenres.push(b.genres)
  // })
  // console.log('allGenres', allGenres);
  // let genres = [].concat.apply([], allGenres)
  // console.log('genres', genres)
  // let filtered = [... new Set(genres)]
  // console.log(filtered);
  // let filteredGenres = allGenres.filter()

  return (
    <div>
      <h2>books</h2>
      {filteredBooks ? <p>in genre <strong>{genreFilter}</strong></p> : <p><strong>all genres</strong></p> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {(filteredBooks ? filteredBooks : books).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setFilteredBooks(null)}>all genres</button>
        {genres.map(a => <button onClick={({ target }) => filterQuery(target.value)} value={a} key={a}>{a}</button> )}
        {/* {genres.map(a => <button onClick={({ target }) => setGenreFilter(target.value)} value={a} key={a}>{a}</button> )} */}
      </div>
    </div>
  ) 
}

export default Books
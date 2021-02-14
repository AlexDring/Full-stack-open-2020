import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommendation = ({ show, books }) => {
  const result = useQuery(ME)

  if(!show) {
    return null
  }

  if(result.loading) {
    return <div>loading recommendation...</div>
  }
  if(!result.data.me) {
    return <div>user login required.</div>
  }
  console.log(result.data.me)
  const favouriteGenre = result.data.me.favoriteGenre
  const filteredRecommendation = books.filter(book => book.genres.includes(favouriteGenre))
  return(
    <div>
      <h1>recommendations</h1>
      <p>books in your favourite genre <strong>{favouriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredRecommendation.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
} 

export default Recommendation

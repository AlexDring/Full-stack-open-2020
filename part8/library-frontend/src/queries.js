import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query findBooks($searchGenre: String) {
    allBooks(genre: $searchGenre) {
      id
      title
      published
      author {
        name
        id
      }
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const UPDATE_BIRTH_YEAR = gql`
  mutation updateBirthYear($name: String!, $born: String!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) { 
      name
      born
    }
  }
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: String, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  )  {
    title
    published
    genres
    id
    author {
      name
      born
      id
    }
  }
}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
        id
      }
      published
      genres
      id
    } 
  } 
`

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

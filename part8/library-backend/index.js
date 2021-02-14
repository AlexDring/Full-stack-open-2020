const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub();

mongoose.set('debug', true)

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
type Author {
  name: String
  born: Int
  bookCount: Int
  id: ID!
}
type Book {
  title: String!
  published: String
  author: Author!
  genres: [String!]!
  id: ID!
}
type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
    me: User
  }
type Mutation {
    addBook(
    title: String!,
    author: String!,
    published: String,
    genres: [String]
    ) : Book
    editAuthor(
      name: String!
      setBornTo: String!
    ) : Author
    createUser(
    username: String!
    favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`
const resolvers = {
  // Author: {
  //   bookCount: async (root) => {
  //     const bookCount = await Book.countDocuments({ author: { $in: root.id } }) // Look into this tomorrow!!!!
  //     return bookCount
  //   }
  // },
  Author: {
    bookCount: (root) => {
      return root.bookCount.length
    }
  },
  // Book: { // This didn't work as it was looking for book.name, book.born See if I can investigate/log this.
  //   author: (root) => { 
  //     return {
  //       name: root.name,
  //       born: root.born
  //     }
  //   }
  // },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    // bookCount: () => books.length,
    // authorCount: () => authors.length,
    allBooks: (root, args) => {
      if(args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }

      return Book.find({}).populate('author')

      // let filteredBooks = books
      // if(args.genre) {
      //   filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
      //   }
      // if(args.author) {
      //   filteredBooks = filteredBooks.filter(b => b.author === args.author) 
      // }
      // return filteredBooks
    },
    allAuthors: async () => {
      return Author.find({}).populate('bookCount')

      // const allAuthors = []
      // authors.forEach(author => {
      //   const countBooks = books.filter(b => b.author === author.name)
      //   const authorObject = {...author, bookCount: countBooks.length }
      //   allAuthors.push(authorObject)
      // })
      // return allAuthors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Please login to add a new book.")
      }

      // Find author
      let author = await Author.findOne({ name: args.author })
      // If no author, set let author to it above
      if(!author) {
        author = new Author({ name: args.author })
      }

      // Create new book
      const book = new Book({ ...args, author: author })
      // push book id into author for book count
      author.bookCount.push(book._id)
      try {
        await book.save()
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book

      // let authorExists = authors.find(a => a.name === args.author)
      // if(!authorExists) {
      //   const author = { name: args.author, id: uuid() }
      //   authors = authors.concat(author)
      // }
      // const book = {...args, id: uuid()}
      // books = books.concat(book)
    },
    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser) { 
        throw new AuthenticationError("Please login to add a edit an author.")
      }
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save() 

      // const author = authors.find(a => a.name === args.name)
      // const updatedAuthor = { ...author, born: args.setBornTo }
      // authors = authors.map(a => a.name === author.name ? updatedAuthor : a)
      // return updatedAuthor
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      // find user
      const user = await User.findOne({ username: args.username })

      // if user provide token
      if( !user || args.password !== 'P@ssword') {
        throw new UserInputError('wrong username or password')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) } // look at this again first thing
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if(auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscription path ${subscriptionsUrl}`);
})
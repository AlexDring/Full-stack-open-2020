const mongoose = require('mongoose')
const { Schema } = mongoose

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    if(returnedObject.likes === undefined) {
      returnedObject.likes = 0
    }
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
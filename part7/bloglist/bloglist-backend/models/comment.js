const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema ({
  comment: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => { // LOOK AT THIS AGAIN!!!!!
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment
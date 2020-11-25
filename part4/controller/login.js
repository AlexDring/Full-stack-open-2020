const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  // get request body
  const body = request.body

  // compare username
  const user = await User.findOne({ username: body.username })
  // console.log(user)
  // if user compare password with bcrypt
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  // get token
  // eslint-disable-next-line no-undef
  const token = jwt.sign({ username: user.username, id:user._id }, process.env.SECRET)


  response.status(200).send({ token, username: user.username, name:user.name })

})

module.exports = loginRouter
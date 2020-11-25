const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')

describe('api test', () => {
  test('it gets blogs JSON', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    // console.log('get blog', getBlogs)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs contain an id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      // console.log(blog)
      return expect(blog.id).toBeDefined()
    })
  })


  test('all blogs contain a likes property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      // console.log('likes', blog.likes)
      return expect(blog.likes).toBeDefined()
    })
  })
})

describe('adding and removing blog posts', () => {
  test('it successfully posts new blogs', async () => {
    const userlogin = await api
      .post('/api/login')
      .send({
        username: 'mluukkai',
        password: 'salainen'
      })


    const newBlog = {
      title: 'issa nu 1',
      author: 'alex da ledge',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 51,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${userlogin.body.token}`)
      .expect(201)
      .expect('content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body).toContainEqual(expect.objectContaining(newBlog))

  })

  test('return 400 Bad Request if title and/or url are missing', async () => {
    const userlogin = await api
      .post('/api/login')
      .send({
        username: 'mluukkai',
        password: 'salainen'
      })

    const newBlog = {
      author: 'alex da ledge',
      likes: 51,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${userlogin.body.token}`)
      .expect(400)

    const totalBlogs = await api.get('/api/blogs')
    expect(totalBlogs.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog posts can be successfully deleted', async () => {
    const userlogin = await api
      .post('/api/login')
      .send({
        username: 'mluukkai',
        password: 'salainen'
      })

    const newBlog = {
      title: 'delete me u betch',
      author: 'alex da ledge',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 51,
    }

    const postBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${userlogin.body.token}`)

    // console.log('post', postBlog.body)
    const deleteId = postBlog.body.id

    const beforeDB = await api
      .get('/api/blogs/')
      .set('Authorization', `bearer ${userlogin.body.token}`)
    // console.log(beforeDB.body)
    // console.log('bodyyasd', beforeDB.body)
    await api
      .delete(`/api/blogs/${deleteId}`)
      .set('Authorization', `bearer ${userlogin.body.token}`)
      .expect(202)

    const afterDB = await api.get('/api/blogs/').set('Authorization', `bearer ${userlogin.body.token}`)
    // console.log(afterDB.body)
    expect(afterDB.body).toHaveLength(beforeDB.body.length - 1)
  })

  test('blog posts can be successfully updated', async () => {
    // blog postUpdate details
    const postUpdate = {
      likes: 20098
    }
    const beforeDB = await api.get('/api/blogs/')
    const idToIUpdate = beforeDB.body[0].id

    // put postUpdate to the api object
    await api
      .put(`/api/blogs/${idToIUpdate}`)
      .send(postUpdate)
      .expect(200)

    const afterDB = await api.get('/api/blogs/')

    // compare altered blog post to postUpdate
    expect(afterDB.body[0]).toEqual(expect.objectContaining(postUpdate))
  })
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash
    })

    await user.save()
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    // console.log('before - ', usersAtStart)

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if password is under 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tart',
      name: 'tarty',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // console.log(result.body);
    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    // console.log('new', usersAtEnd)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

})



afterAll(() => {
  mongoose.connection.close()
})
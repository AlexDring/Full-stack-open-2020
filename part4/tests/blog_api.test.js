const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

describe('api test', () => {
  test('it gets blogs JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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

  test('it successfully posts new blogs', async () => {
    const newBlog = {
      title: 'issa nu 1',
      author: 'alex da ledge',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 51,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body).toContainEqual(expect.objectContaining(newBlog))

  })
  test('all blogs contain an likes property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      console.log('likes', blog.likes)
      return expect(blog.likes).toBeDefined()
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
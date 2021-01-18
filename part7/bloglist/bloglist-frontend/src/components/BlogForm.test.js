import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('the form should call the event handler it received as props with the correct details in, when a new blog is created', () => {
  const addBlog = jest.fn()

  let component = render(
    <BlogForm createBlog={addBlog} />
  )

  // const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'XmasXmas' }
  })
  fireEvent.change(author, {
    target: { value: 'Alex Dring' }
  })
  fireEvent.change(url, {
    target: { value: 'alex.dring.com' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0].title).toBe('XmasXmas')
  expect(addBlog.mock.calls[0][0].author).toBe('Alex Dring')
  expect(addBlog.mock.calls[0][0].url).toBe('alex.dring.com' )
  // component.debug()
})
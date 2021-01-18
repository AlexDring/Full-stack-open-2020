import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing testing 123',
    author: 'Test Me',
    likes: 0,
    url: 'testing.com',
    user: {
      username: 'testing',
      name: 'test',
    }
  }
  let component

  test('only the blog title and author is displayed by default', () => {
    component = render(<Blog blog={blog} />)

    expect(component.container.querySelector('.defaultView')).toHaveTextContent('Testing testing 123 Test Me')
    expect(component.container.querySelector('.hiddenView')).toHaveStyle('display: none;')
  })

  test('the blog\'s url and number of likes are shown when the show button is clicked', () => {
    component = render( <Blog blog={blog} /> )

    fireEvent.click(component.container.querySelector('.showButton'))
    expect(component.container.querySelector('.defaultView')).toHaveStyle('display: none;')
    expect(component.container.querySelector('.hiddenView')).toHaveStyle('')
    expect(component.container.querySelector('.hiddenView')).toHaveTextContent('likes:')
  })
  test('if the like button is clicked twice, the event handler is called twice', () => {
    const mockHandler = jest.fn()
    component = render( <Blog blog={blog} updateBlog={mockHandler} /> )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
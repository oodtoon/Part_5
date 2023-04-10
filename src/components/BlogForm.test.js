import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and call onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')

  const submitButton = screen.getByText('create')

  await user.type(inputTitle, 'test Title')
  await user.type(inputAuthor, 'test Author')
  await user.type(inputUrl, 'test Url')

  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('test Url')
})

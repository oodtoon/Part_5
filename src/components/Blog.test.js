import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog page', () => {
  const user = {
    username: 'goodtest',
    name: 'frank the tank',
  }

  const blog = {
    title: 'On my way',
    author: 'Johnny Goodman',
    user: {
      username: 'goodtest',
      name: 'frank the tank',
    },
    url: 'www.wedeeznuts.net',
    likes: 99,
  }

  test('renders title and author', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blog')
    const extraDiv = container.querySelector('.blog-details')
    expect(div).toHaveTextContent('On my way')
    expect(div).toHaveTextContent('Johnny Goodman')
    expect(extraDiv).toHaveStyle('display: none')
  })

  describe('toggle button click', () => {
    let container

    beforeEach(() => {
      container = render(
        <Blog buttonLabel="view" blog={blog} user={user}>
          <div className="blog-details"></div>
        </Blog>
      ).container
    })

    test('blog URL and Likes display after view button click', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const div = container.querySelector('.blog-details')
      expect(div).not.toHaveStyle('display: none')
    })
  })

  describe('like button click', () => {
    let container

    const mockHandler = jest.fn()

    beforeEach(() => {
      container = render(
        <Blog buttonLabel="view" blog={blog} user={user} addLike={mockHandler}>
          <div className="blog-details" ></div>
        </Blog>
      ).container
    })

    test('clicking like button twice increases calls addLikeTo twice', async () => {
      const userClick = userEvent.setup()
      const buttonView = screen.getByText('view')
      await userClick.click(buttonView)

      const userLike = userEvent.setup()
      const likeButton = container.querySelector('#like')
      await userLike.click(likeButton)
      await userLike.click(likeButton)

      expect(mockHandler.mock.calls).toHaveLength(2)
    })
  })
})

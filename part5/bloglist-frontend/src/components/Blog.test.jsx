import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'test blog',
    author: 'tester',
    url: 'http://test.com',
    likes: 0,
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog}>
        <div className='testDiv'>
          blog info
        </div>
      </Blog>
    ).container
  })
  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    // screen.debug()

    const title = screen.getByText('test blog', { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('tester', { exact: false })
    expect(author).toBeDefined()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

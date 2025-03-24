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
        <div className='testDiv'>blog info</div>
      </Blog>
    ).container
  })
  
  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    const title = screen.getByText('test blog', { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('tester', { exact: false })
    expect(author).toBeDefined()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button, url and likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    const user = userEvent.setup()
    const updateLikes = vi.fn()

    container = render(
      <Blog
        blog={blog}
        updateLikes={updateLikes}
      >
        <div className='testDiv'>blog info</div>
      </Blog>
    ).container

    screen.debug()
    const likeButton = container.querySelector('.likeButton')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})

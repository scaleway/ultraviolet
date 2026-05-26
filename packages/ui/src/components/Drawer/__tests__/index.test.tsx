import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Drawer } from '..'

describe('drawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders with default Props', () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={<button type="button">Test</button>} header="header">
        <div>test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders without disclosure', () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={undefined} header="header">
        <div>test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders without separator', () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={undefined} header="header" separator={false}>
        <div>test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with default Props and function children', async () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={<button type="button">Open</button>} header="header">
        {({ close }) => (
          <button onClick={close} type="button">
            Close
          </button>
        )}
      </Drawer>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with default Props and function children open', () => {
    const { asFragment } = renderWithTheme(
      <Drawer header="header" open>
        {() => <div>test</div>}
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with open={true}', () => {
    const { asFragment } = renderWithTheme(
      <Drawer header="header" open>
        <div>test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders custom size=medium', async () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={<button type="button">button</button>} header="header" size="medium">
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })
  it('renders custom size=large', async () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={<button type="button">button</button>} header="header" size="large">
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders custom size=small', async () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={<button type="button">button</button>} header="header" size="small">
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with custom classNames', () => {
    const { asFragment } = renderWithTheme(
      <Drawer className="test" header="header" open>
        <div>test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with disclosure', () => {
    const { asFragment } = renderWithTheme(
      <Drawer ariaLabel="drawer-test" disclosure={<button type="button">Test</button>} header="header" id="drawer-test">
        <div>drawer</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with disclosure and onClose', async () => {
    let count = 0
    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        data-testid="test"
        disclosure={<button type="button">Open drawer</button>}
        header="header"
        id="drawer-test"
        onClose={() => {
          count += 1
        }}
      >
        <div>drawer</div>
      </Drawer>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )

    await userEvent.click(screen.getByRole('button', { name: 'Open drawer' }))
    const closeButton = screen.getByRole('button', { name: 'close' })
    await userEvent.click(closeButton)
    expect(count).toBe(1)
    expect(asFragment()).toMatchSnapshot()
  })

  it('disclosure function render onClick props is called', async () => {
    const mockOnClick = vi.fn()

    renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={() => (
          <button onClick={mockOnClick} type="button">
            Open
          </button>
        )}
        header="header"
        id="drawer-test"
      >
        <div> test</div>
      </Drawer>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('disclosure function render onClick props is call with toggle', async () => {
    const mockOnClick = vi.fn()

    renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={({ toggle }) => (
          <button
            onClick={() => {
              toggle()
              mockOnClick()
            }}
            type="button"
          >
            Open
          </button>
        )}
        header="header"
        id="drawer-test"
      >
        <div> test</div>
      </Drawer>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it(`should call 'close' prop from render props`, async () => {
    const mockOnClick = vi.fn()

    renderWithTheme(
      <Drawer ariaLabel="drawer-test" header="header" id="drawer-test" open>
        {({ close }) => (
          <button
            onClick={() => {
              mockOnClick()
              close()
            }}
            type="button"
          >
            Close
          </button>
        )}
      </Drawer>,
    )
    const modalButton = screen.getByRole('button', { name: 'Close' })
    await userEvent.click(modalButton)
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('disclosure Component render onClick props is call', async () => {
    const mockOnClick = vi.fn()

    renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={
          <button onClick={mockOnClick} type="button">
            Open
          </button>
        }
        header="header"
        id="drawer-test"
      >
        <div> test</div>
      </Drawer>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)

    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('test hideOnEsc is true', async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Drawer ariaLabel="drawer-test" header="header" hideOnEsc id="drawer-test" onClose={mockOnClose} open>
        <div> test</div>
      </Drawer>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  it('function footer', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Open</button>}
        footer={({ close }) => (
          <button
            data-testid="buttonClose"
            onClick={() => {
              close()
              mockOnClick()
            }}
            type="button"
          >
            Close
          </button>
        )}
        header="header"
        id="drawer-test"
      >
        <div> test</div>
      </Drawer>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(asFragment()).toMatchSnapshot()
  })

  it('with footer', () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Open</button>}
        footer={<button type="button">A custom button that can close the drawer</button>}
        header="header"
        id="drawer-test"
      >
        <div> test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('custom header', () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Open</button>}
        footer="footer"
        header={<h1>Custom header</h1>}
        id="drawer-test"
        open
      >
        <div> test</div>
      </Drawer>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('function header', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Open</button>}
        footer="footer"
        header={({ close }) => (
          <button
            data-testid="buttonClose"
            onClick={() => {
              close()
              mockOnClick()
            }}
            type="button"
          >
            Close
          </button>
        )}
        id="drawer-test"
        isClosable={false}
      >
        <div> test</div>
      </Drawer>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with push', async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Open</button>}
        footer="footer"
        header={({ close }) => (
          <button
            data-testid="buttonClose"
            onClick={() => {
              close()
            }}
            type="button"
          >
            Close
          </button>
        )}
        id="drawer-test"
        push="body"
      >
        <div> test</div>
      </Drawer>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(asFragment()).toMatchSnapshot()
  })
})

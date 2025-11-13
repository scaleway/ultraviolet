import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchSnapshotWithPortal } from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Drawer } from '..'

describe('drawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test(`renders with default Props`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer disclosure={<button type="button">Test</button>} header="header">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders without disclosure`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer disclosure={undefined} header="header">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders without separator`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer disclosure={undefined} header="header" separator={false}>
        <div>test</div>
      </Drawer>,
    ))

  test(`renders with default Props and function children`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer disclosure={<button type="button">Open</button>} header="header">
        {({ close }) => (
          <button onClick={close} type="button">
            Close
          </button>
        )}
      </Drawer>,
    )

    await userEvent.click(screen.getByText('Open'))
    await userEvent.click(screen.getByText('Close'))

    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders with default Props and function children open`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer header="header" open>
        {() => <div>test</div>}
      </Drawer>,
    ))

  test(`renders with open={true}`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer header="header" open>
        <div>test</div>
      </Drawer>,
    ))

  test(`renders custom size=medium`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        disclosure={<button type="button">button</button>}
        header="header"
        size="medium"
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })
  test(`renders custom size=large`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        disclosure={<button type="button">button</button>}
        header="header"
        size="large"
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders custom size=small`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        disclosure={<button type="button">button</button>}
        header="header"
        size="small"
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders with custom classNames`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer className="test" header="header" open>
        <div>test</div>
      </Drawer>,
    ))

  test(`renders with disclosure`, () =>
    shouldMatchSnapshotWithPortal(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Test</button>}
        header="header"
        id="drawer-test"
      >
        <div>drawer</div>
      </Drawer>,
    ))

  test(`renders with disclosure and onClose`, async () => {
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

    await userEvent.click(screen.getByText('Open drawer'))
    const closeButton = screen.getByTestId('test-close-button')
    await userEvent.click(closeButton)
    expect(count).toBe(1)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`disclosure function render onClick props is called`, async () => {
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
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure function render onClick props is call with toggle`, async () => {
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
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`should call 'close' prop from render props`, async () => {
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
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure Component render onClick props is call`, async () => {
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

    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`test hideOnEsc is true`, async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        header="header"
        hideOnEsc
        id="drawer-test"
        onClose={mockOnClose}
        open
      >
        <div> test</div>
      </Drawer>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toBeCalledTimes(1)
  })

  test(`function footer`, async () => {
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

    await userEvent.click(screen.getByText('Open'))
    await userEvent.click(screen.getByText('Close'))

    expect(asFragment()).toMatchSnapshot()
  })

  test(`with footer`, () => {
    shouldMatchSnapshotWithPortal(
      <Drawer
        ariaLabel="drawer-test"
        disclosure={<button type="button">Open</button>}
        footer={
          <button type="button">
            A custom button that can close the drawer
          </button>
        }
        header="header"
        id="drawer-test"
      >
        <div> test</div>
      </Drawer>,
    )
  })

  test(`custom header`, () => {
    shouldMatchSnapshotWithPortal(
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
  })

  test(`function header`, async () => {
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
    await userEvent.click(screen.getByText('Open'))
    await userEvent.click(screen.getByText('Close'))

    expect(asFragment()).toMatchSnapshot()
  })
})

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Drawer } from '..'

describe('Drawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test(`renders with default Props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer disclosure={<button type="button">Test</button>} header="header">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders without disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer disclosure={undefined} header="header">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders without separator`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer disclosure={undefined} header="header" separator={false}>
        <div>test</div>
      </Drawer>,
    ))

  test(`renders with default Props and function children`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer header="header" disclosure={<button type="button">Open</button>}>
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
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer header="header" open>
        {() => <div>test</div>}
      </Drawer>,
    ))

  test(`renders with open={true}`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer open header="header">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders custom size=medium`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        header="header"
        size="medium"
        disclosure={<button type="button">button</button>}
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
        header="header"
        size="large"
        disclosure={<button type="button">button</button>}
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
        header="header"
        size="small"
        disclosure={<button type="button">button</button>}
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders with custom classNames`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer open header="header" className="test">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders with disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer
        ariaLabel="drawer-test"
        id="drawer-test"
        header="header"
        disclosure={<button type="button">Test</button>}
      >
        <div>drawer</div>
      </Drawer>,
    ))

  test(`renders with disclosure and onClose`, async () => {
    let count = 0
    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="drawer-test"
        id="drawer-test"
        header="header"
        disclosure={<button type="button">Open drawer</button>}
        data-testid="test"
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
        id="drawer-test"
        header="header"
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Open
          </button>
        )}
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
        header="header"
        ariaLabel="drawer-test"
        id="drawer-test"
        disclosure={({ toggle }) => (
          <button
            type="button"
            onClick={() => {
              toggle()
              mockOnClick()
            }}
          >
            Open
          </button>
        )}
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
      <Drawer ariaLabel="drawer-test" id="drawer-test" open header="header">
        {({ close }) => (
          <button
            type="button"
            onClick={() => {
              mockOnClick()
              close()
            }}
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
        header="header"
        ariaLabel="drawer-test"
        id="drawer-test"
        disclosure={
          <button type="button" onClick={mockOnClick}>
            Open
          </button>
        }
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
        header="header"
        ariaLabel="drawer-test"
        id="drawer-test"
        hideOnEsc
        open
        onClose={mockOnClose}
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
        id="drawer-test"
        header="header"
        disclosure={<button type="button">Open</button>}
        footer={({ close }) => (
          <button
            onClick={() => {
              close()
              mockOnClick()
            }}
            type="button"
            data-testid="buttonClose"
          >
            Close
          </button>
        )}
      >
        <div> test</div>
      </Drawer>,
    )

    await userEvent.click(screen.getByText('Open'))
    await userEvent.click(screen.getByText('Close'))

    expect(asFragment()).toMatchSnapshot()
  })

  test(`with footer`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer
        ariaLabel="drawer-test"
        id="drawer-test"
        header="header"
        disclosure={<button type="button">Open</button>}
        footer={
          <button type="button">
            A custom button that can close the drawer
          </button>
        }
      >
        <div> test</div>
      </Drawer>,
    )
  })

  test(`custom header`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer
        ariaLabel="drawer-test"
        id="drawer-test"
        footer="footer"
        disclosure={<button type="button">Open</button>}
        header={<h1>Custom header</h1>}
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
        id="drawer-test"
        isClosable={false}
        footer="footer"
        disclosure={<button type="button">Open</button>}
        header={({ close }) => (
          <button
            onClick={() => {
              close()
              mockOnClick()
            }}
            type="button"
            data-testid="buttonClose"
          >
            Close
          </button>
        )}
      >
        <div> test</div>
      </Drawer>,
    )
    await userEvent.click(screen.getByText('Open'))
    await userEvent.click(screen.getByText('Close'))

    expect(asFragment()).toMatchSnapshot()
  })
})

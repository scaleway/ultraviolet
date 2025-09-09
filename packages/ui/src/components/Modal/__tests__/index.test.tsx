import { css } from '@emotion/react'
import { renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Modal } from '..'
import illustration from '../__stories__/assets/illustration.webp'
import { useModal } from '../ModalProvider'

const customDialogBackdropStyles = css`
  background-color: aliceblue;
`
const customDialogStyles = css`
  background: radial-gradient(circle, #8b2fe6 0%, #4f0599 50%, #30015a 100%);
`

const mockOnClick = vi.fn()

describe('modal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test(`useModal() should throw error if not rendered in provider`, () => {
    expect(() => renderHook(() => useModal())).toThrow(
      'useModal must be used within a ModalProvider',
    )
  })

  test(`renders with default Props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal disclosure={<button type="button">Test</button>}>
        <div>test</div>
      </Modal>,
    ))

  test(`renders without disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal disclosure={undefined}>
        <div>test</div>
      </Modal>,
    ))

  test(`renders with default Props and function children`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal>{() => <div>test</div>}</Modal>,
    ))

  test(`renders with default Props and function children open`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal open>{() => <div>test</div>}</Modal>,
    ))

  test(`renders with open={true}`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal open>
        <div>test</div>
      </Modal>,
    ))

  test(`renders with open={true} and no close icon`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal isClosable={false} open>
        <div>test</div>
      </Modal>,
    ))

  test(`renders open custom size`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal open size="medium">
        <div>test</div>
      </Modal>,
    ))

  test(`renders with custom classNames`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal
        backdropClassName={customDialogBackdropStyles.name}
        className={customDialogStyles.name}
        open
      >
        <div>test</div>
      </Modal>,
    ))

  test(`renders with image`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal image={illustration} isClosable={false} open>
        <div>test</div>
      </Modal>,
    ))

  test(`renders with disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal
        ariaLabel="modal-test"
        disclosure={<button type="button">Test</button>}
        id="modal-test"
      >
        <div>modal</div>
      </Modal>,
    ))

  test(`renders with disclosure and onBeforeClose`, async () => {
    let count = 0
    const { asFragment } = renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        data-testid="test"
        disclosure={<button type="button">Open modal</button>}
        id="modal-test"
        onBeforeClose={() => {
          count += 1
        }}
      >
        <div>modal</div>
      </Modal>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )
    await userEvent.click(screen.getByText('Open modal'))
    const closeButton = screen.getByTestId('test-close-button')
    await userEvent.click(closeButton)
    expect(count).toBe(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders with disclosure and onClose`, async () => {
    let count = 0
    const { asFragment } = renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        data-testid="test"
        disclosure={<button type="button">Open modal</button>}
        id="modal-test"
        onClose={() => {
          count += 1
        }}
      >
        <div>modal</div>
      </Modal>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )

    await userEvent.click(screen.getByText('Open modal'))
    const closeButton = screen.getByTestId('test-close-button')
    await userEvent.click(closeButton)
    expect(count).toBe(1)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`disclosure function render onClick props is called`, async () => {
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        disclosure={() => (
          <button onClick={mockOnClick} type="button">
            Open
          </button>
        )}
        id="modal-test"
      >
        <div> test</div>
      </Modal>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure function render onClick props is call with toggle`, async () => {
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
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
        id="modal-test"
      >
        <div> test</div>
      </Modal>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`should call 'close' prop from render props`, async () => {
    renderWithTheme(
      <Modal ariaLabel="modal-test" id="modal-test" open>
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
      </Modal>,
    )
    const modalButton = screen.getByRole('button', { name: 'Close' })
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure Component render onClick props is call`, async () => {
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        disclosure={
          <button onClick={mockOnClick} type="button">
            Open
          </button>
        }
        id="modal-test"
      >
        <div> test</div>
      </Modal>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)

    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`test hideOnEsc is true`, async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        hideOnEsc
        id="modal-test"
        onBeforeClose={mockOnClose}
        open
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toBeCalledTimes(1)
  })

  test(`test hideOnEsc is false`, async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        hideOnEsc={false}
        id="modal-test"
        onBeforeClose={mockOnClose}
        open
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toBeCalledTimes(0)
  })

  test(`test hideOnClickOutside is true`, async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        data-testid="test"
        hideOnClickOutside
        id="modal-test"
        onBeforeClose={mockOnClose}
        open
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.click(screen.getByTestId('test-backdrop'))

    expect(mockOnClose).toBeCalledTimes(1)
  })

  test(`test hideOnClickOutside is false`, async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        data-testid="test"
        hideOnClickOutside={false}
        id="modal-test"
        onBeforeClose={mockOnClose}
        open
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.click(screen.getByTestId('test-backdrop'))

    expect(mockOnClose).toBeCalledTimes(0)
  })
})

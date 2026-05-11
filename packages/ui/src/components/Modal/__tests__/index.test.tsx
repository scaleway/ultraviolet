import { renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchSnapshotWithPortal } from '@utils/test'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { Modal } from '..'
import illustration from '../__stories__/assets/illustration.webp'
import { useModal } from '../ModalProvider'

import { customDialogBackdropStyles, customDialogStyles } from './testStyle.css'

const mockOnClick = vi.fn()

describe('modal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('useModal() should throw error if not rendered in provider', () => {
    expect(() => renderHook(() => useModal())).toThrow('useModal must be used within a ModalProvider')
  })

  it('renders with default Props', () =>
    shouldMatchSnapshotWithPortal(
      <Modal disclosure={<button type="button">Test</button>}>
        <div>test</div>
      </Modal>,
    ))

  it('renders without disclosure', () =>
    shouldMatchSnapshotWithPortal(
      <Modal disclosure={undefined}>
        <div>test</div>
      </Modal>,
    ))

  it('renders with default Props and function children', () =>
    shouldMatchSnapshotWithPortal(<Modal>{() => <div>test</div>}</Modal>))

  it('renders with default Props and function children open', () =>
    shouldMatchSnapshotWithPortal(<Modal open>{() => <div>test</div>}</Modal>))

  it('renders with open={true}', () =>
    shouldMatchSnapshotWithPortal(
      <Modal open>
        <div>test</div>
      </Modal>,
    ))

  it('renders with open={true} and no close icon', () =>
    shouldMatchSnapshotWithPortal(
      <Modal isClosable={false} open>
        <div>test</div>
      </Modal>,
    ))

  it('renders open custom size', () =>
    shouldMatchSnapshotWithPortal(
      <Modal open size="medium">
        <div>test</div>
      </Modal>,
    ))

  it('renders with custom classNames', () =>
    shouldMatchSnapshotWithPortal(
      <Modal backdropClassName={customDialogBackdropStyles} className={customDialogStyles} open>
        <div>test</div>
      </Modal>,
    ))

  it('renders with image', () =>
    shouldMatchSnapshotWithPortal(
      <Modal image={illustration} isClosable={false} open>
        <div>test</div>
      </Modal>,
    ))

  it('renders with disclosure', () =>
    shouldMatchSnapshotWithPortal(
      <Modal ariaLabel="modal-test" disclosure={<button type="button">Test</button>} id="modal-test">
        <div>modal</div>
      </Modal>,
    ))

  it('renders with disclosure and onBeforeClose', async () => {
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

  it('renders with disclosure and onClose', async () => {
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

  it('disclosure function render onClick props is called', async () => {
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
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('disclosure function render onClick props is call with toggle', async () => {
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
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it(`should call 'close' prop from render props`, async () => {
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
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('disclosure Component render onClick props is call', async () => {
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

    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('test hideOnEsc is true', async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Modal ariaLabel="modal-test" hideOnEsc id="modal-test" onBeforeClose={mockOnClose} open>
        <div> test</div>
      </Modal>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  it('test hideOnEsc is false', async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Modal ariaLabel="modal-test" hideOnEsc={false} id="modal-test" onBeforeClose={mockOnClose} open>
        <div> test</div>
      </Modal>,
    )
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('test hideOnClickOutside is true', async () => {
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

    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  it('test hideOnClickOutside is false', async () => {
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

    expect(mockOnClose).not.toHaveBeenCalled()
  })
})

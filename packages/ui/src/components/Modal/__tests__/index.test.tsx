import { css } from '@emotion/react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../../.jest/helpers'
import { TextInput } from '../../TextInput'

const customDialogBackdropStyles = css`
  background-color: aliceblue;
`
const customDialogStyles = css`
  background: radial-gradient(circle, #8b2fe6 0%, #4f0599 50%, #30015a 100%);
`

const mockOnClick = jest.fn()

describe('Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test(`renders with default Props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal>
        <div>test</div>
      </Modal>,
    ))

  test(`renders with opened={true}`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal opened>
        <div>test</div>
      </Modal>,
    ))

  test(`renders opened custom width`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal opened width="medium">
        <div>test</div>
      </Modal>,
    ))

  test(`renders opened custom size`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal opened size="medium">
        <div>test</div>
      </Modal>,
    ))

  test(`renders with customStyle`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal
        opened
        customDialogBackdropStyles={customDialogBackdropStyles}
        customDialogStyles={customDialogStyles}
      >
        <div>test</div>
      </Modal>,
    ))

  test(`renders with custom classNames`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal
        opened
        backdropClassName={customDialogBackdropStyles.name}
        className={customDialogStyles.name}
      >
        <div>test</div>
      </Modal>,
    ))

  test(`renders with disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={<button type="button">Test</button>}
      >
        <div>modal</div>
      </Modal>,
    ))

  test(`renders with disclosure and onBeforeClose`, () => {
    let count = 0

    return shouldMatchEmotionSnapshotWithPortal(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={dialog => (
          <button type="button">Test {dialog.modalId}</button>
        )}
        onBeforeClose={() => {
          count += 1
        }}
        data-testid="test"
        opened
      >
        <div>modal</div>
      </Modal>,
      {
        transform: async () => {
          const closeButton = screen.getByTestId('test-close-button')
          await userEvent.click(closeButton)
          expect(count).toBe(1)
        },
      },
    )
  })

  test(`renders with disclosure and onClose`, () => {
    let count = 0

    return shouldMatchEmotionSnapshotWithPortal(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={dialog => (
          <button type="button">Test {dialog.modalId}</button>
        )}
        data-testid="test"
        opened
        onClose={() => {
          count += 1
        }}
      >
        <div>modal</div>
      </Modal>,
      {
        transform: async () => {
          const closeButton = screen.getByTestId('test-close-button')
          await userEvent.click(closeButton)
          expect(count).toBe(1)
        },
      },
    )
  })

  test(`disclosure function render onClick props is call`, async () => {
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Open
          </button>
        )}
      >
        <div> test</div>
      </Modal>,
    )
    const modalButton = screen.getAllByRole('button')[0]
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure function render onClick props is call with toggle`, async () => {
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
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
      </Modal>,
    )
    const modalButton = screen.getAllByRole('button')[0]
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure Component render onClick props is call`, async () => {
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={
          <button type="button" onClick={mockOnClick}>
            Open
          </button>
        }
      >
        <div> test</div>
      </Modal>,
    )
    const modalButton = screen.getAllByRole('button')[1]
    await userEvent.click(modalButton)

    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`test hideOnEsc is true`, async () => {
    const mockOnClose = jest.fn()
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        hideOnEsc
        onBeforeClose={mockOnClose}
        disclosure={<button type="button">Open</button>}
        opened
      >
        <div> test</div>
        <TextInput data-testid="input" />
      </Modal>,
    )
    await userEvent.type(screen.getByRole('textbox'), 'test{Escape}')
    await userEvent.keyboard('{Escape}')
    expect(mockOnClose).toBeCalledTimes(0)
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toBeCalledTimes(1)
  })

  test(`test hideOnEsc is false`, async () => {
    const mockOnClose = jest.fn()
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        hideOnEsc={false}
        onBeforeClose={mockOnClose}
        disclosure={<button type="button">Open</button>}
        opened
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toBeCalledTimes(0)
  })

  test(`test hideOnClickOutside is true`, async () => {
    const mockOnClose = jest.fn()
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        hideOnClickOutside
        onBeforeClose={mockOnClose}
        disclosure={<button type="button">Open</button>}
        opened
        data-testid="test"
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.click(screen.getByTestId('test-backdrop'))

    expect(mockOnClose).toBeCalledTimes(1)
  })

  test(`test hideOnClickOutside is false`, async () => {
    const mockOnClose = jest.fn()
    renderWithTheme(
      <Modal
        ariaLabel="modal-test"
        id="modal-test"
        hideOnClickOutside={false}
        onBeforeClose={mockOnClose}
        disclosure={<button type="button">Open</button>}
        opened
        data-testid="test"
      >
        <div> test</div>
      </Modal>,
    )
    await userEvent.click(screen.getByTestId('test-backdrop'))

    expect(mockOnClose).toBeCalledTimes(0)
  })
})

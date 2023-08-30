import { css } from '@emotion/react'
import { afterAll, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../../.jest/helpers'

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
          <button type="button">Test {dialog?.baseId}</button>
        )}
        /* eslint-disable-next-line @typescript-eslint/require-await */
        onBeforeClose={async () => {
          count += 1
        }}
        data-testid="test"
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

  test(`renders with portal node (modal=false)`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Modal ariaLabel="modal-test" id="modal-test" modal={false}>
        <div> test</div>
      </Modal>,
    ))

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
    const modalButton = screen.getByRole('button')
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
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)

    expect(mockOnClick).toBeCalledTimes(1)
  })
})

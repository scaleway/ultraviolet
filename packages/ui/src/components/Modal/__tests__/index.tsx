import { css } from '@emotion/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../../.jest/helpers'

const customDialogBackdropStyles = css`
  background-color: aliceblue;
`
const customDialogStyles = css`
  background: radial-gradient(circle, #8b2fe6 0%, #4f0599 50%, #30015a 100%);
`

describe('Modal', () => {
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
      >
        <div>modal</div>
      </Modal>,
      {
        transform: async node => {
          const closeButton = node.getByTitle('close')
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
})

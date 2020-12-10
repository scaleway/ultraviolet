import React from 'react'
import { Modal } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Modal', () => {
  test(`renders with default Props`, () => {
    shouldMatchEmotionSnapshot(
      <Modal>
        <div>test</div>
      </Modal>,
    )
  })

  test(`renders with disclosure`, () => {
    shouldMatchEmotionSnapshot(
      <Modal
        ariaLabel="modal-test"
        baseId="modal-test"
        disclosure={() => <button type="button">Test</button>}
      >
        <div>modal</div>
      </Modal>,
    )
  })
  test(`renders with portal node (modal=false)`, () => {
    shouldMatchEmotionSnapshot(
      <Modal ariaLabel="modal-test" baseId="modal-test" modal={false}>
        <div> test </div>
      </Modal>,
    )
  })

  test(`renders with children function`, () => {
    shouldMatchEmotionSnapshot(
      <Modal ariaLabel="modal-test" baseId="modal-test" modal={false}>
        {({ baseId }) => <div>{baseId} </div>}
      </Modal>,
    )
  })
})

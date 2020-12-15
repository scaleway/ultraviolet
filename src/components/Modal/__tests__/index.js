import { css } from '@emotion/core'
import React from 'react'
import { Modal } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

const customDialogBackdropStyles = css`
  background-color: aliceblue;
`
const customDialogStyles = css`
  background: radial-gradient(circle, #8b2fe6 0%, #4f0599 50%, #30015a 100%);
`

describe('Modal', () => {
  test(`renders with default Props`, () => {
    shouldMatchEmotionSnapshot(
      <Modal>
        <div>test</div>
      </Modal>,
    )
  })

  test(`renders with opened={true}`, () => {
    shouldMatchEmotionSnapshot(
      <Modal opened>
        <div>test</div>
      </Modal>,
    )
  })

  test(`renders with customStyle`, () => {
    shouldMatchEmotionSnapshot(
      <Modal
        opened
        customDialogBackdropStyles={customDialogBackdropStyles}
        customDialogStyles={customDialogStyles}
      >
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
})

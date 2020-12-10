import React from 'react'
import { Modal } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Modal', () => {
  // portals are not supported in test
  test(`renders with modal=false`, () => {
    shouldMatchEmotionSnapshot(
      <Modal aria-label="test" modal={false} baseId="popover-test-1">
        {() => <div>test</div>}
      </Modal>,
    )
  })

  test(`renders with disclosure`, () => {
    shouldMatchEmotionSnapshot(
      <Modal
        aria-label="Custom popover with buttom"
        baseId="popover-test-2"
        disclosure={() => <button type="button">Test</button>}
        placement="auto"
        modal={false}
      >
        {({ placement }) => <div> {placement}</div>}
      </Modal>,
    )
  })
})

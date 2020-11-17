import React from 'react'
import { Popper } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Popper', () => {
  // portals are not supported in test
  test(`renders with modal=false`, () => {
    shouldMatchEmotionSnapshot(
      <Popper aria-label="test" modal={false} baseId="popover-test-1">
        {() => <div>test</div>}
      </Popper>,
    )
  })

  test(`renders with disclosure`, () => {
    shouldMatchEmotionSnapshot(
      <Popper
        aria-label="Custom popover with buttom"
        baseId="popover-test-2"
        disclosure={() => <button type="button">Test</button>}
        placement="auto"
        modal={false}
      >
        {({ placement }) => <div> {placement}</div>}
      </Popper>,
    )
  })
})

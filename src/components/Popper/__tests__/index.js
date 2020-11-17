import React from 'react'
import { Popper } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Popper', () => {
  // portals are not supported in test
  test(`renders with modal=false`, () => {
    shouldMatchEmotionSnapshot(
      <Popper modal={false}>{() => <div>test</div>}</Popper>,
    )
  })

  test(`renders with disclosure`, () => {
    shouldMatchEmotionSnapshot(
      <Popper
        aria-label="Custom popover with buttom"
        disclosure={() => <button type="button">Test</button>}
        placement="auto"
        modal={false}
      >
        {({ placement }) => <div> {placement}</div>}
      </Popper>,
    )
  })
})

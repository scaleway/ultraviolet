import React from 'react'
import { Tooltip } from '..'
import shouldMatchEmotionSnapshotWithPortal from '../../../helpers/shouldMatchEmotionSnapshotWithPortal'

describe('Tooltip', () => {
  test(`renders with visible=false`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip text="test" animated={0}>
        <button type="button">Test</button>
      </Tooltip>,
    )
  })

  test(`renders with visible=true`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip visible text="test" animated={0}>
        <button type="button">Test</button>
      </Tooltip>,
    )
  })
})

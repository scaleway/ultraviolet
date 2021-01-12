import React from 'react'
import { Tooltip } from '..'
import shouldMatchEmotionSnapshotWithPortal from '../../../helpers/shouldMatchEmotionSnapshotWithPortal'

describe('Tooltip', () => {
  test(`renders with visible=false`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip text="test" baseId="test">
        <button type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    )
  })

  test(`renders with visible=true`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip visible text="test" baseId="test">
        <button type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    )
  })
})

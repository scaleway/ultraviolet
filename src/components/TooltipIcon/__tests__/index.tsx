import React from 'react'
import TooltipIcon from '..'
import shouldMatchEmotionSnapshotWithPortal from '../../../helpers/shouldMatchEmotionSnapshotWithPortal'

describe('TooltipIcon', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <TooltipIcon tooltip="test" baseId="test" />,
    ))
})

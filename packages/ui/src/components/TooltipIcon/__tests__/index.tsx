import TooltipIcon from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../../.jest/helpers'

describe('TooltipIcon', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <TooltipIcon tooltip="test" baseId="test" />,
    ))
})

import TooltipIcon from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../helpers/jestHelpers'

describe('TooltipIcon', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <TooltipIcon tooltip="test" baseId="test" />,
    ))
})

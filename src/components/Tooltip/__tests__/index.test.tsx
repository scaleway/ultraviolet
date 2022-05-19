import Tooltip from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../helpers/jestHelpers'

describe('Tooltip', () => {
  test(`renders when tooltip is just a pass through`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip baseId="test">
        <button type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    ))

  test(`renders with visible=false`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip text="test" baseId="test">
        <button type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    ))

  test(`renders with visible=true`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip visible text="test" baseId="test">
        <button type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    ))

  test(`renders when child is a function`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip visible text="test" baseId="test">
        {() => (
          <button type="button" aria-describedby="test">
            Test
          </button>
        )}
      </Tooltip>,
    ))

  test(`renders when child is a string`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip visible text="test" baseId="test">
        Test
      </Tooltip>,
    ))

  test(`renders when child has a disabled props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip visible text="test" baseId="test">
        <button disabled type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    ))

  test(`render variant white`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tooltip variant="white" text="test" baseId="test">
        <button type="button" aria-describedby="test">
          Test
        </button>
      </Tooltip>,
    ))
})

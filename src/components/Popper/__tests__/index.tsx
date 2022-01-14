import Popper, { popperVariants } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../helpers/jestHelpers'

describe('Popper', () => {
  test(`renders with modal=false`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Popper
        aria-label="test"
        modal={false}
        baseId="popover-test-1"
        disclosure={() => <button type="button">modal=false</button>}
      >
        {() => <div>test</div>}
      </Popper>,
    ))

  test(`renders with disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Popper
        aria-label="Custom popover with button"
        baseId="popover-test-2"
        disclosure={<button type="button">Test</button>}
        placement="auto"
        modal={false}
      >
        {({ placement }) => <div> {placement}</div>}
      </Popper>,
    ))

  test.each(popperVariants)('renders correctly with type="%s"', variant =>
    shouldMatchEmotionSnapshotWithPortal(
      <Popper
        aria-label={variant}
        variant={variant}
        baseId={`popover-test-${variant}`}
        disclosure={() => <button type="button">{variant}</button>}
      >
        {() => <div>{variant}</div>}
      </Popper>,
    ),
  )
})

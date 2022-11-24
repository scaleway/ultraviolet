import NavigationStepper from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import jestMockMatchMedia from '../../../helpers/jestMockMatchMedia'
import { screens } from '../../../theme'

describe('NavigationStepper', () => {
  beforeAll(() => {
    jestMockMatchMedia({
      matches: false,
      media: `(max-width: ${screens.small}px)`,
    })
  })

  test('should render correctly', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper>
        <NavigationStepper.Step>First</NavigationStepper.Step>
        <NavigationStepper.Step>Second</NavigationStepper.Step>
        <NavigationStepper.Step>Third</NavigationStepper.Step>
      </NavigationStepper>,
    ))

  test('should render correctly with step prop', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper step={2}>
        <NavigationStepper.Step>First</NavigationStepper.Step>
        <NavigationStepper.Step>Second</NavigationStepper.Step>
        <NavigationStepper.Step>Third</NavigationStepper.Step>
      </NavigationStepper>,
    ))

  test('should render correctly with isLoading', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper step={2}>
        <NavigationStepper.Step isLoading>First</NavigationStepper.Step>
        <NavigationStepper.Step isLoading>Second</NavigationStepper.Step>
        <NavigationStepper.Step isLoading>Third</NavigationStepper.Step>
      </NavigationStepper>,
    ))

  test('should render correctly with condensed', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper condensed step={2}>
        <NavigationStepper.Step isLoading>First</NavigationStepper.Step>
        <NavigationStepper.Step>Second</NavigationStepper.Step>
        <NavigationStepper.Step>Third</NavigationStepper.Step>
      </NavigationStepper>,
    ))

  test('should render correctly with default condensed', async () => {
    jestMockMatchMedia({
      matches: true,
      media: `(max-width: ${screens.small}px)`,
    })

    return shouldMatchEmotionSnapshot(
      <NavigationStepper step={2}>
        <NavigationStepper.Step isLoading>First</NavigationStepper.Step>
        <NavigationStepper.Step>Second</NavigationStepper.Step>
        <NavigationStepper.Step>Third</NavigationStepper.Step>
      </NavigationStepper>,
    )
  })

  test('should render correctly with bad child', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper step={2}>
        <NavigationStepper.Step isLoading>First</NavigationStepper.Step>
        <NavigationStepper.Step isLoading>Second</NavigationStepper.Step>
        <NavigationStepper.Step isLoading>Third</NavigationStepper.Step>
        <div>WTF</div>
      </NavigationStepper>,
    ))

  test('should render correctly with bad child', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper step={2}>
        <NavigationStepper.Step>First</NavigationStepper.Step>
        {/* @ts-expect-error intended error type */}
        <NavigationStepper.Step>{() => 'wtf'}</NavigationStepper.Step>
        <NavigationStepper.Step>
          {/* @ts-expect-error intended error type */}
          {() => () => () => () => {}}
        </NavigationStepper.Step>
      </NavigationStepper>,
    ))

  test('should render correctly with only bad children', async () =>
    shouldMatchEmotionSnapshot(
      <NavigationStepper step={2}>
        <div>WTF</div>
        <div>WTF</div>
      </NavigationStepper>,
    ))
})

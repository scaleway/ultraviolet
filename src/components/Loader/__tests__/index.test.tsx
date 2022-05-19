import Loader from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { SENTIMENTS } from '../../../theme'

describe('Loader', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test(`renders default props`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" />))

  test(`renders active with default percentage`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" active />))

  test(`renders active with custom percentage`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" active />))

  test(`renders with percentage 75`, () =>
    shouldMatchEmotionSnapshot(
      <Loader label="Loading test" active percentage={75} />,
    ))

  test(`renders with color neutral and primary`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Loader label="Loading test" text="Colored text" color="neutral" />
        <Loader label="Loading test" text="Colored text" color="primary" />
      </>,
    ))

  test(`renders with inlined color`, () =>
    shouldMatchEmotionSnapshot(
      <Loader label="Loading test" text="Colored text" color="#ff0000" />,
    ))

  test(`renders with unknown inlined color`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" color="unknown" />))

  SENTIMENTS.slice(0, 5).forEach(color => {
    test(`renders with trailColor ${color}`, () =>
      shouldMatchEmotionSnapshot(
        <Loader label="Loading test" trailColor={color} />,
      ))
  })

  test(`renders with inlined trailColor`, () =>
    shouldMatchEmotionSnapshot(
      <Loader label="Loading test" trailColor="#ff0000" />,
    ))

  test(`renders with strokeWidth 25`, () =>
    shouldMatchEmotionSnapshot(
      <Loader label="Loading test" strokeWidth={25} />,
    ))

  test(`renders with text 100%`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" text="100%" />))

  test(`renders with custom size`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" size="100px" />))
})

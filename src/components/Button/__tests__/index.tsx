import Button, { buttonSizes, buttonVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

const SampleIcon = () => <>IconMock</>

describe('Button', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  describe('variant', () => {
    buttonVariants.forEach(variant => {
      test(`render ${variant}`, () =>
        shouldMatchEmotionSnapshot(
          <Button ariaLabel="test" variant={variant}>
            Hello
          </Button>,
        ))
    })
  })

  describe('size', () => {
    buttonSizes.forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchEmotionSnapshot(
          <Button ariaLabel="test" size={size}>
            Hello
          </Button>,
        ))
    })
  })

  test(`should render correctly when disabled`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" disabled>
        Hello
      </Button>,
    ))

  test(`should render correctly without a children`, () =>
    shouldMatchEmotionSnapshot(<Button ariaLabel="test" />))

  test(`should render correctly without a children and an icon`, () =>
    shouldMatchEmotionSnapshot(<Button ariaLabel="test" icon="check" />))

  test(`should render correctly with a custom Icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" icon={<SampleIcon />} />,
    ))

  test(`should render correctly when acting as Link`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" to="/">
        Hello
      </Button>,
    ))

  test(`should render correctly when acting as Link with disabled props`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" to="/" disabled>
        Hello
      </Button>,
    ))

  test(`should render correctly when acting as dom link`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" href="/">
        Hello
      </Button>,
    ))

  test(`should render correctly when extendable`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" extend>
        Hello
      </Button>,
    ))

  test(`should render correctly when extendable with an icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" extend icon="check">
        Hello
      </Button>,
    ))

  test(`should render correctly loading`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" progress>
        Hello
      </Button>,
    ))

  test(`should render correctly loading with an icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" progress icon="check" iconPosition="right">
        Hello
      </Button>,
    ))

  test(`should render correctly with an icon on the right`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" icon="check" iconPosition="right">
        Hello
      </Button>,
    ))

  test(`should render correctly with an action button`, () =>
    shouldMatchEmotionSnapshot(<Button ariaLabel="test" action icon="check" />))

  test(`should render correctly with a rounded action button`, () =>
    shouldMatchEmotionSnapshot(
      <Button ariaLabel="test" action="rounded" icon="check" />,
    ))

  test(`should render correctly with a tooltip`, () =>
    shouldMatchEmotionSnapshot(
      <Button
        ariaLabel="test"
        icon="check"
        tooltipBaseId="test"
        tooltip="world"
        aria-describedby="test"
      >
        Hello
      </Button>,
    ))
})

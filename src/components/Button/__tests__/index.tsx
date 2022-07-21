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
        shouldMatchEmotionSnapshot(<Button variant={variant}>Hello</Button>))
    })
  })

  describe('size', () => {
    buttonSizes.forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchEmotionSnapshot(<Button size={size}>Hello</Button>))
    })
  })

  test(`should render correctly when disabled`, () =>
    shouldMatchEmotionSnapshot(<Button disabled>Hello</Button>))

  test(`should render correctly without a children`, () =>
    shouldMatchEmotionSnapshot(<Button aria-label="no content" />))

  test(`should render correctly without a children and an icon`, () =>
    shouldMatchEmotionSnapshot(<Button icon="check" aria-label="check icon" />))

  test(`should render correctly with a custom Icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button icon={<SampleIcon />} aria-label="icon" />,
    ))

  test(`should render correctly when acting as Link`, () =>
    shouldMatchEmotionSnapshot(<Button to="/">Hello</Button>))

  test(`should render correctly when acting as Link with disabled props`, () =>
    shouldMatchEmotionSnapshot(
      <Button to="/" disabled>
        Hello
      </Button>,
    ))

  test(`should render correctly when acting as dom link`, () =>
    shouldMatchEmotionSnapshot(<Button href="/">Hello</Button>))

  test(`should render correctly when extendable`, () =>
    shouldMatchEmotionSnapshot(<Button extend>Hello</Button>))

  test(`should render correctly when extendable with an icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button extend icon="check">
        Hello
      </Button>,
    ))

  test(`should render correctly loading`, () =>
    shouldMatchEmotionSnapshot(<Button progress>Hello</Button>))

  test(`should render correctly loading with an icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button progress icon="check" iconPosition="right">
        Hello
      </Button>,
    ))

  test(`should render correctly with an icon on the right`, () =>
    shouldMatchEmotionSnapshot(
      <Button icon="check" iconPosition="right">
        Hello
      </Button>,
    ))

  test(`should render correctly with an action button`, () =>
    shouldMatchEmotionSnapshot(
      <Button action icon="check" aria-label="check" />,
    ))

  test(`should render correctly with a rounded action button`, () =>
    shouldMatchEmotionSnapshot(
      <Button action="rounded" icon="check" aria-label="check" />,
    ))

  test(`should render correctly with a tooltip`, () =>
    shouldMatchEmotionSnapshot(
      <Button
        icon="check"
        tooltipBaseId="test"
        tooltip="world"
        aria-describedby="test"
      >
        Hello
      </Button>,
    ))

  test('should render correctly with progress left and icon right', () =>
    shouldMatchEmotionSnapshot(
      <Button progress="left" icon="lock" iconPosition="right">
        Hello
      </Button>,
    ))

  test('should render correctly with progress right and icon left', () =>
    shouldMatchEmotionSnapshot(
      <Button progress="right" icon="lock" iconPosition="left">
        Hello
      </Button>,
    ))
})

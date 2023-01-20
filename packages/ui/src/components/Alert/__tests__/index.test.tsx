import { Alert } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Alert', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Alert>Sample Alert</Alert>))

  test('renders correctly with custom icon', () =>
    shouldMatchEmotionSnapshot(<Alert icon="eye">Sample Alert</Alert>))

  test('renders correctly with title', () =>
    shouldMatchEmotionSnapshot(<Alert title="title">Sample Alert</Alert>))

  test(`renders correctly unknown variant and fallback to standard`, () =>
    // @ts-expect-error "unknown" isn't part of the `variant` variant, but we need to test
    // the fallback to the `standard` variant in this case.
    shouldMatchEmotionSnapshot(<Alert variant="unknown">Sample Alert</Alert>))
  ;(['info', 'warning', 'danger', 'success'] as const).forEach(variant => {
    test(`renders correctly variant ${variant}`, () =>
      shouldMatchEmotionSnapshot(<Alert variant={variant}>Sample Alert</Alert>))
  })

  test(`renders correctly unknown theme variant and fallback to defaults`, () =>
    // @ts-expect-error "unknown" isn't part of the `variant` variant, but we need to test
    // the fallback to the `theme.colors` colors in this case.
    shouldMatchEmotionSnapshot(<Alert variant="unknown">Sample Alert</Alert>))
})

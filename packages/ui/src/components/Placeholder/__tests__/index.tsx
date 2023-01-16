import { Placeholder, placeholderTypes } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Placeholder', () => {
  test('renders default variant', () =>
    shouldMatchEmotionSnapshot(<Placeholder />))

  test.each(placeholderTypes)('renders correctly with type="%s"', type =>
    shouldMatchEmotionSnapshot(<Placeholder variant={type} />),
  )
})

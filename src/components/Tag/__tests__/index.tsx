import Tag from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Tag', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Tag>test</Tag>))

  test('renders correctly neutral', () =>
    shouldMatchEmotionSnapshot(<Tag variant="neutral">test</Tag>))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<Tag disabled>test</Tag>))

  test('renders correctly colored', () =>
    shouldMatchEmotionSnapshot(<Tag variant="primary">test</Tag>))
})

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

  test('renders correctly with icon', () =>
    shouldMatchEmotionSnapshot(<Tag icon="lock">test</Tag>))

  test('renders correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(<Tag isLoading>test</Tag>))

  test('renders correctly with onClose', () =>
    shouldMatchEmotionSnapshot(<Tag onClose={() => {}}>test</Tag>))
})

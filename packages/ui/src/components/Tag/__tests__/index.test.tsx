import { describe, test } from '@jest/globals'
import { Tag } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Tag', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Tag>test</Tag>))

  test('renders correctly neutral', () =>
    shouldMatchEmotionSnapshot(<Tag sentiment="neutral">test</Tag>))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<Tag disabled>test</Tag>))

  test('renders correctly colored', () =>
    shouldMatchEmotionSnapshot(<Tag sentiment="primary">test</Tag>))

  test('renders correctly with icon', () =>
    shouldMatchEmotionSnapshot(<Tag icon="lock">test</Tag>))

  test('renders correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(<Tag isLoading>test</Tag>))

  test('renders correctly with onClose', () =>
    shouldMatchEmotionSnapshot(<Tag onClose={() => {}}>test</Tag>))

  test('renders correctly with copiable', () =>
    shouldMatchEmotionSnapshot(<Tag copiable>test</Tag>))
})

import { LockIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Tag } from '..'

describe('tag', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Tag>test</Tag>))

  test('renders correctly neutral', () =>
    shouldMatchEmotionSnapshot(<Tag sentiment="neutral">test</Tag>))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<Tag disabled>test</Tag>))

  test('renders correctly colored', () =>
    shouldMatchEmotionSnapshot(<Tag sentiment="primary">test</Tag>))

  test('renders correctly with icon', () =>
    shouldMatchEmotionSnapshot(
      <Tag>
        <LockIcon />
        test
      </Tag>,
    ))

  test('renders correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(<Tag isLoading>test</Tag>))

  test('renders correctly with onClose', () =>
    shouldMatchEmotionSnapshot(<Tag onClose={() => {}}>test</Tag>))

  test('renders correctly with copiable', () =>
    shouldMatchEmotionSnapshot(<Tag copiable>test</Tag>))
})

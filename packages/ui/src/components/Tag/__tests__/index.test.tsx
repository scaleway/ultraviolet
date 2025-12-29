import { LockIcon } from '@ultraviolet/icons'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Tag } from '..'

describe('tag', () => {
  test('renders correctly', () => shouldMatchSnapshot(<Tag>test</Tag>))

  test('renders correctly neutral', () =>
    shouldMatchSnapshot(<Tag sentiment="neutral">test</Tag>))

  test('renders correctly disabled', () =>
    shouldMatchSnapshot(<Tag disabled>test</Tag>))

  test('renders correctly colored', () =>
    shouldMatchSnapshot(<Tag sentiment="primary">test</Tag>))

  test('renders correctly with icon', () =>
    shouldMatchSnapshot(
      <Tag>
        <LockIcon />
        test
      </Tag>,
    ))

  test('renders correctly with isLoading', () =>
    shouldMatchSnapshot(<Tag isLoading>test</Tag>))

  test('renders correctly with onClose', () =>
    shouldMatchSnapshot(<Tag onClose={() => {}}>test</Tag>))

  test('renders correctly with copiable', () =>
    shouldMatchSnapshot(<Tag copiable>test</Tag>))

  test('renders correctly with copiable and copy button', () =>
    shouldMatchSnapshot(
      <Tag copiable copyButton>
        test
      </Tag>,
    ))

  test('renders correctly with code variant', () =>
    shouldMatchSnapshot(<Tag variant="code">test</Tag>))
})

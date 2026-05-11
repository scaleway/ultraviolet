import { LockIcon } from '@ultraviolet/icons/LockIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { Tag } from '..'

describe('tag', () => {
  it('renders correctly', () => shouldMatchSnapshot(<Tag>test</Tag>))

  it('renders correctly neutral', () => shouldMatchSnapshot(<Tag sentiment="neutral">test</Tag>))

  it('renders correctly disabled', () => shouldMatchSnapshot(<Tag disabled>test</Tag>))

  it('renders correctly colored', () => shouldMatchSnapshot(<Tag sentiment="primary">test</Tag>))

  it('renders correctly with icon', () =>
    shouldMatchSnapshot(
      <Tag>
        <LockIcon />
        test
      </Tag>,
    ))

  it('renders correctly with isLoading', () => shouldMatchSnapshot(<Tag isLoading>test</Tag>))

  it('renders correctly with onClose', () => shouldMatchSnapshot(<Tag onClose={() => {}}>test</Tag>))

  it('renders correctly with copiable', () => shouldMatchSnapshot(<Tag copiable>test</Tag>))

  it('renders correctly with copiable and copy button', () =>
    shouldMatchSnapshot(
      <Tag copiable copyButton>
        test
      </Tag>,
    ))

  it('renders correctly with code variant', () => shouldMatchSnapshot(<Tag variant="code">test</Tag>))

  it('renders correctly with key-value variant', () =>
    shouldMatchSnapshot(<Tag keyValue={{ key: 'key', value: 'value' }} />))
})

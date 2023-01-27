import type { ReactNode } from 'react'
import { TagList } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

jest.mock('reakit/Tooltip', () => ({
  Tooltip: ({ children }: { children: ReactNode }) => children,
  TooltipArrow: () => null,
  TooltipReference: ({ children }: { children: ReactNode }) => children,
  useTooltipState: () => ({}),
}))

describe('TagList', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList tags={['scaleway', 'cloud']} />{' '}
      </div>,
    ))

  test('renders correctly with not tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList />
      </div>,
    ))

  test('renders correctly with custom threshold', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList threshold={2} tags={['scaleway', 'cloud']} />
      </div>,
    ))

  test('renders correctly with custom threshold and extra tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList threshold={2} tags={['scaleway', 'cloud', 'provider']} />
      </div>,
    ))

  test('renders correctly with custom threshold and extra tags and maxLength inferior to the combined size of tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          maxLength={10}
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    ))

  test('renders correctly with multiline', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          multiline
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    ))
})

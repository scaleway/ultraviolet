import type { ReactNode } from 'react'
import TagsPoplist from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

jest.mock('reakit/Tooltip', () => ({
  Tooltip: ({ children }: { children: ReactNode }) => children,
  TooltipArrow: () => null,
  TooltipReference: ({ children }: { children: ReactNode }) => children,
  useTooltipState: () => ({}),
}))

describe('TagsPoplist', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist tags={['scaleway', 'cloud']} />{' '}
      </div>,
    ))

  test('renders correctly with not tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist />
      </div>,
    ))

  test('renders correctly with custom threshold', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist threshold={2} tags={['scaleway', 'cloud']} />
      </div>,
    ))

  test('renders correctly with custom threshold and extra tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist threshold={2} tags={['scaleway', 'cloud', 'provider']} />
      </div>,
    ))

  test('renders correctly with custom threshold and extra tags and maxLength inferior to the combined size of tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist
          maxLength={10}
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    ))

  test('renders correctly with multiline', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist
          multiline
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    ))
})

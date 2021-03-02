import React from 'react'
import TagsPoplist from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

jest.mock('reakit/Tooltip', () => ({
  Tooltip: ({ children }) => children,
  TooltipArrow: () => null,
  TooltipReference: ({ children }) => children,
  useTooltipState: () => ({}),
}))

describe('TagsPoplist', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist tags={['scaleway', 'cloud']} />{' '}
      </div>,
    )
  })

  test('renders correctly with not tags', () => {
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist />
      </div>,
    )
  })

  test('renders correctly with custom threshold', () => {
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist threshold={2} tags={['scaleway', 'cloud']} />
      </div>,
    )
  })

  test('renders correctly with custom threshold and extra tags', () => {
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist threshold={2} tags={['scaleway', 'cloud', 'provider']} />
      </div>,
    )
  })

  test('renders correctly with custom threshold and extra tags and maxLength inferior to the combined size of tags', () => {
    shouldMatchEmotionSnapshot(
      <div>
        <TagsPoplist
          maxLength={10}
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    )
  })
})

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { TagList } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

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
        <TagList popoverTitle="Additional" tags={['scaleway', 'cloud']} />
      </div>,
    ))

  test('renders correctly with not tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList popoverTitle="Additional" />
      </div>,
    ))

  test('renders correctly with custom threshold', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          popoverTitle="Additional"
          threshold={2}
          tags={['scaleway', 'cloud']}
        />
      </div>,
    ))

  test('renders correctly with custom threshold and extra tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          popoverTitle="Additional"
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    ))

  test('renders correctly with custom threshold and extra tags and maxLength inferior to the combined size of tags', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          popoverTitle="Additional"
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
          popoverTitle="Additional"
          multiline
          threshold={2}
          tags={['scaleway', 'cloud', 'provider']}
        />
      </div>,
    ))

  test('renders correctly with copiable', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          popoverTitle="Additional"
          copiable
          threshold={2}
          tags={['scaleway', 'cloud']}
        />
      </div>,
    ))

  test('renders correctly with custom popover', () =>
    shouldMatchEmotionSnapshot(
      <div>
        <TagList
          popoverTitle="Custom title"
          copiable
          threshold={2}
          tags={['scaleway', 'cloud']}
        >
          {({ tags }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tags.map((tag, index) => (
                // useful when two tags are identical `${tag}-${index}`
                // eslint-disable-next-line react/no-array-index-key
                <span key={`${tag}-${index}`} style={{ color: 'black' }}>
                  Tag: {tag}
                </span>
              ))}
            </div>
          )}
        </TagList>
      </div>,
    ))

  test('renders correctly when clicking on popover', async () => {
    renderWithTheme(
      <TagList
        popoverTitle="Additional"
        threshold={1}
        tags={['scaleway', 'cloud']}
      />,
    )

    expect(screen.queryByText('Additional')).not.toBeInTheDocument()

    const plus = screen.getByTestId('taglist-open')
    await userEvent.click(plus)

    expect(screen.getByText('Additional')).toBeInTheDocument()

    const closeButton = screen.getByLabelText('close')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('Additional')).not.toBeInTheDocument()
    })
  })
})

import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { ExpandableCard } from '..'
import { Text } from '../../Text'

describe('ExpandableCard', () => {
  test('renders correctly with default values', () => {
    const { asFragment } = renderWithTheme(
      <ExpandableCard header="Title">Content</ExpandableCard>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with complex header', () => {
    const { asFragment } = renderWithTheme(
      <ExpandableCard
        header={
          <div>
            <ExpandableCard.Title>Title</ExpandableCard.Title>
            <Text as="p" variant="caption">
              Description
            </Text>
          </div>
        }
      >
        Content
      </ExpandableCard>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('works properly when clicked', async () => {
    renderWithTheme(<ExpandableCard header="Title">Content</ExpandableCard>)

    await userEvent.click(screen.getByText('Title'))
    expect(screen.getByText('Content')).toBeVisible()
  })

  test('works properly when disabled', async () => {
    renderWithTheme(
      <ExpandableCard header="Title" disabled>
        Content
      </ExpandableCard>,
    )

    await userEvent.click(screen.getByText('Title'))
    expect(screen.getByText('Content')).not.toBeVisible()
  })

  test('works properly when clicked', async () => {
    renderWithTheme(<ExpandableCard header="Title">Content</ExpandableCard>)

    await userEvent.click(screen.getByText('Title'))
    expect(screen.getByText('Content')).toBeVisible()
  })

  test('works properly draggable', async () => {
    const onDrop = vi.fn()
    renderWithTheme(
      ['card-1', 'card-2', 'card-3'].map(name => (
        <ExpandableCard
          key={name}
          header="Title"
          draggable
          value={name}
          onDrop={onDrop}
        >
          Content
        </ExpandableCard>
      )),
    )
    const draggableCard1 = screen.getByTestId('draggable-icon-card-1')
    const draggableCard2 = screen.getByTestId('draggable-icon-card-2')
    await userEvent.hover(draggableCard1)
    expect(draggableCard1).toBeVisible()
    expect(draggableCard2).not.toBeVisible()
  })

  test('works properly when controlled and open with key interaction', async () => {
    const onToggleExpand = vi.fn()
    renderWithTheme(
      <ExpandableCard
        header="Title"
        expanded={false}
        onToggleExpand={onToggleExpand}
        data-testid="expandablecard"
      >
        Content
      </ExpandableCard>,
    )

    await userEvent.click(screen.getByText('Title'))
    screen.getByTestId('expandablecard-summary').focus()
    await userEvent.keyboard('[Space]')
    await waitFor(() => {
      expect(onToggleExpand).toHaveBeenCalled()
    })
  })
})

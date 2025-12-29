import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Text } from '../../Text'
import { ExpandableCard } from '..'

describe('expandableCard', () => {
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
      <ExpandableCard disabled header="Title">
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
    const onKeyDown = vi.fn()
    const { asFragment } = renderWithTheme(
      ['card-1', 'card-2', 'card-3'].map((name, index) => (
        <ExpandableCard
          draggable
          header="Title"
          index={index}
          key={name}
          onDrop={onDrop}
          onKeyDown={onKeyDown}
          value={name}
        >
          Content
        </ExpandableCard>
      )),
    )
    const draggableCard1 = screen.getByTestId('draggable-icon-card-1')
    const draggableCard2 = screen.getByTestId('draggable-icon-card-2')
    const dropZone = screen.getByTestId('card-1-dropable-area')
    await userEvent.hover(draggableCard1)
    expect(draggableCard1).toBeVisible()

    const data = JSON.stringify({ value: 'card-2' })
    fireEvent.dragStart(draggableCard2, { dataTransfer: { setData: vi.fn() } })
    fireEvent.dragEnter(draggableCard1)
    fireEvent.dragLeave(draggableCard1)
    fireEvent.dragOver(dropZone)
    fireEvent.drop(dropZone, {
      dataTransfer: {
        getData: (type: string) => (type === 'text' ? data : ''),
      },
    })

    expect(onDrop).toHaveBeenCalledWith('card-1', 'card-2')

    fireEvent.focus(draggableCard1)
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')
    await userEvent.keyboard('[ArrowUp]')
    expect(onKeyDown).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('works properly when controlled and open with key interaction', async () => {
    const onToggleExpand = vi.fn()
    renderWithTheme(
      <ExpandableCard
        data-testid="expandablecard"
        expanded={false}
        header="Title"
        onToggleExpand={onToggleExpand}
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

  test('works properly when uncontrolled and open', async () => {
    renderWithTheme(
      <ExpandableCard data-testid="expandablecard" header="Title" open>
        Content
      </ExpandableCard>,
    )

    const title = screen.getByText('Title')
    const content = screen.getByText('Content')
    expect(content).toBeVisible()

    await userEvent.click(title)
    expect(content).not.toBeVisible()
  })
})

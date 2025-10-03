import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterAll, describe, expect, test, vi } from 'vitest'
import type { TagType } from '..'
import { TagList } from '..'

// - This function mocks the offsetWidth of DOM elements:
// as JSDOM ( used by testing-library ) only emulates the DOM elements
// so it does not render the elements in any way to be able to know their size or position.
// - These mocks are done in a way to follow the code execution,
// so if you change the code you might need to change this as well
const mockOffsetWidth = (tags: TagType[], customContainerWidth?: number) => {
  const TAGS_PARENT_WIDTH = 500
  const TAG_WIDTH = 100
  const POPOVER_TRIGGER_WIDTH = 50

  const containerWidth = customContainerWidth || TAGS_PARENT_WIDTH

  const mockOffsetWidthFunction = vi.spyOn(
    HTMLElement.prototype,
    'offsetWidth',
    'get',
  )

  mockOffsetWidthFunction.mockReturnValueOnce(containerWidth)
  tags.forEach(() => {
    mockOffsetWidthFunction.mockReturnValueOnce(TAG_WIDTH)
  })
  mockOffsetWidthFunction.mockReturnValueOnce(POPOVER_TRIGGER_WIDTH)
  mockOffsetWidthFunction.mockReturnValueOnce(TAG_WIDTH * tags.length)
  mockOffsetWidthFunction.mockReturnValueOnce(containerWidth)
}

describe('tagList', () => {
  afterAll(() => {
    vi.resetAllMocks()
  })

  test('renders correctly', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with no tags', () => {
    mockOffsetWidth([])

    const { asFragment } = renderWithTheme(
      <TagList popoverTitle="Additional" />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with placement', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList popoverPlacement="top" popoverTitle="Additional" tags={tags} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom threshold', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} threshold={2} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom threshold and extra tags', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} threshold={2} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly and ignore custom threshold as it does not fit the parent', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth(tags, 150)

    const { asFragment } = renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} threshold={2} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly and add ellipsis to the first tag as it too long', () => {
    const tags = ['scaleway is the best cloud provider ever invented']

    mockOffsetWidth(tags, 50)

    const { asFragment } = renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom threshold and extra tags and maxLength inferior to the combined size of tags', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList
        maxLength={10}
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiline', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList multiline popoverTitle="Additional" tags={tags} threshold={2} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with copiable', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList copiable popoverTitle="Additional" tags={tags} threshold={2} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with icons', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList copiable popoverTitle="Additional" tags={tags} threshold={4} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly when clicking on popover', async () => {
    const tags: TagType[] = [
      { icon: 'id', label: 'smooth' },
      'code',
      { icon: 'lock', label: 'hello' },
      { icon: 'plus', label: 'world' },
    ]

    mockOffsetWidth(tags)

    renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} threshold={1} />,
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

  test('renders correctly when clicking on popover via keyboard event', async () => {
    const tags: TagType[] = [
      { icon: 'id', label: 'smooth' },
      'code',
      { icon: 'lock', label: 'hello' },
      { icon: 'plus', label: 'world' },
    ]

    mockOffsetWidth(tags)

    renderWithTheme(
      <TagList popoverTitle="Additional" tags={tags} threshold={1} />,
    )

    expect(screen.queryByText('Additional')).not.toBeInTheDocument()

    const plus = screen.getByTestId('taglist-open')
    plus.focus()
    await userEvent.keyboard(' ')

    expect(screen.getByText('Additional')).toBeInTheDocument()

    const closeButton = screen.getByLabelText('close')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('Additional')).not.toBeInTheDocument()
    })
  })

  test('renders correctly a scrollable popover with non default popoverMaxHeight', async () => {
    const tags: TagType[] = [
      'very',
      ...new Array<string>(50).fill('item'),
      'tooltip',
      'scaleway',
      'paris',
      'cloud',
    ]

    mockOffsetWidth(tags)

    const { asFragment } = renderWithTheme(
      <TagList
        popoverMaxHeight="100px"
        popoverTitle="Additional"
        tags={tags}
        threshold={5}
      />,
    )

    expect(screen.queryByText('Additional')).not.toBeInTheDocument()

    const plus = screen.getByTestId('taglist-open')
    await userEvent.click(plus)

    await waitFor(() => {
      expect(screen.getByText('Additional')).toBeInTheDocument()
    })

    expect(asFragment()).toMatchSnapshot()
  })
})

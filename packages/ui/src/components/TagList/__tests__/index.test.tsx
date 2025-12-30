import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterAll, describe, expect, test, vi } from 'vitest'
import type { TagType } from '..'
import { TagList } from '..'

// - This function mocks the offsetWidth of DOM elements:
// as JSDOM | happy-dom ( used by testing-library ) only emulates the DOM elements
// so it does not render the elements in any way to be able to know their size or position.
// - These mocks are specifically tailored for the running code
// - If the code changes, these mocks may need to be updated accordingly
const mockOffsetWidth = (
  dataTestId = 'taglist',
  customContainerWidth?: number,
) => {
  const TAGS_PARENT_WIDTH = 500
  const TAG_CHAR_WIDTH = 6
  const POPOVER_TRIGGER_WIDTH = 50

  const containerWidth = customContainerWidth || TAGS_PARENT_WIDTH

  const mockOffsetWidthFunction = vi.spyOn(
    HTMLElement.prototype,
    'offsetWidth',
    'get',
  )

  mockOffsetWidthFunction.mockImplementation(function get(this: HTMLElement) {
    if (this.dataset['testid'] === dataTestId) {
      // This is the parent
      return containerWidth
    }

    if (this.dataset['testid'] === `${dataTestId}-open`) {
      // This is the popover trigger
      return POPOVER_TRIGGER_WIDTH
    }

    if (this.dataset['testid'] === `${dataTestId}-container`) {
      return this.textContent.length * TAG_CHAR_WIDTH * 1.2
    }

    if (
      this.tagName === 'SPAN' &&
      // eslint-disable-next-line testing-library/no-node-access
      this.children.length === 0
    ) {
      // This is a tag, return computed size based on text length
      const text = this.childNodes[0].textContent || ''

      return 8 + text.length * TAG_CHAR_WIDTH + 8
    }

    if (
      this.tagName === 'DIV' &&
      // eslint-disable-next-line testing-library/no-node-access
      this.children.length === 1 &&
      // eslint-disable-next-line testing-library/no-node-access
      this.children[0].tagName === 'BUTTON'
    ) {
      // This is a copiable tag
      const text = this.childNodes[0].textContent || ''

      return 8 + text.length * TAG_CHAR_WIDTH + 8
    }

    if (
      this.tagName === 'SPAN' &&
      // eslint-disable-next-line testing-library/no-node-access
      this.children.length === 1 &&
      // eslint-disable-next-line testing-library/no-node-access
      this.children[0].tagName === 'SPAN' &&
      // eslint-disable-next-line testing-library/no-node-access
      this.children[0].children.length === 0
    ) {
      // This is a tag, return computed size based on text length
      const text = this.childNodes[0].textContent || ''

      return 8 + text.length * TAG_CHAR_WIDTH + 8
    }

    console.warn(
      `offsetWidth accessed but could not detect which element is measured !`,
      new Error('stop').stack?.split('\n')[4],
    )

    return 0
  })
}

describe('tagList', () => {
  afterAll(() => {
    vi.resetAllMocks()
  })

  test('renders correctly', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList data-testid="taglist" popoverTitle="Additional" tags={tags} />,
    )

    expect(screen.getByText('+1')).toBeInTheDocument()
    expect(screen.getByText('scaleway')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with no tags', () => {
    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList data-testid="taglist" popoverTitle="Additional" />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with placement', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        popoverPlacement="top"
        popoverTitle="Additional"
        tags={tags}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom threshold', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(screen.getByText('cloud')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom threshold and extra tags', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(screen.queryByText('provider')).not.toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly and ignore custom threshold as it does not fit the parent', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth('taglist', 50)

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(screen.getByText('scaleway')).toBeInTheDocument()
    expect(screen.queryByText('cloud')).not.toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly and add ellipsis to the first tag as it too long', () => {
    const tags = ['scaleway is the best cloud provider ever invented']

    mockOffsetWidth('taglist', 50)

    const { asFragment } = renderWithTheme(
      <TagList data-testid="taglist" popoverTitle="Additional" tags={tags} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom threshold and extra tags and maxLength inferior to the combined size of tags', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        maxLength={10}
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(screen.getByText('scaleway')).toBeInTheDocument()
    expect(screen.queryByText('cloud')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly when maxLength is smaller than first tag', () => {
    const tags = ['scaleway']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        maxLength={5}
        popoverTitle="Additional"
        tags={tags}
      />,
    )

    expect(screen.getByText('scaleway')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('hide items after maxLength', () => {
    const tags = [
      'scaleway',
      'cloud',
      'provider',
      'database',
      'private-network',
      'instances',
    ]

    mockOffsetWidth('taglist', 1000)

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        maxLength={30}
        popoverTitle="Additional"
        tags={tags}
        threshold={100}
      />,
    )

    expect(screen.getByText('database')).toBeInTheDocument()
    expect(screen.queryByText('private-network')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiline', () => {
    const tags = ['scaleway', 'cloud', 'provider']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
        multiline
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with copiable', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        copiable
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={2}
      />,
    )

    expect(screen.getByRole('button', { name: 'scaleway' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'cloud' })).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with icons', () => {
    const tags = ['scaleway', 'cloud']

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        copiable
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={4}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly when clicking on popover', async () => {
    const tags: TagType[] = [
      { icon: 'id', label: 'smooth' },
      'code',
      { icon: 'lock', label: 'hello' },
      'world',
    ]

    mockOffsetWidth()

    renderWithTheme(
      <TagList
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={1}
      />,
    )

    expect(screen.queryByText('Additional')).not.toBeInTheDocument()

    const plus = screen.getByTestId('taglist-open')
    await userEvent.click(plus)

    expect(screen.getByText('Additional')).toBeInTheDocument()
    expect(screen.getByText('world')).toBeInTheDocument()

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

    mockOffsetWidth()

    renderWithTheme(
      <TagList
        data-testid="taglist"
        popoverTitle="Additional"
        tags={tags}
        threshold={1}
      />,
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

    mockOffsetWidth()

    const { asFragment } = renderWithTheme(
      <TagList
        data-testid="taglist"
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

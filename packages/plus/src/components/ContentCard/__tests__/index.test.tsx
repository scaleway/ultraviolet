import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ContentCard } from '..'
import illustration from '../assets/illustration.png'

describe('contentCard', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.spyOn(global.Math, 'random').mockRestore()
  })

  test('renders correctly with required title', () => {
    const { asFragment } = renderWithTheme(<ContentCard title="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with title with custom tag', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard headingTag="h1" title="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with disabled', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard disabled title="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with empty string title', () => {
    const { asFragment } = renderWithTheme(<ContentCard title="" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with href', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard href="https://scaleway.com" title="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with href and direction row', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard direction="row" href="https://scaleway.com" title="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with href and target', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard href="https://scaleway.com" target="_blank" title="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with onClick', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard onClick={() => {}} title="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with children', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard title="test">
        This is the children of the component
      </ContentCard>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with image, title, description, subtitle and icon', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard
        description="this is a description"
        icon={illustration}
        image={illustration}
        subtitle="sub title test"
        title="test"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe('renders correctly with all directions', () => {
    const directions = ['row', 'column'] as const
    directions.forEach(direction => {
      test(`renders correctly direction ${direction}`, () => {
        const { asFragment } = renderWithTheme(
          <ContentCard direction={direction} title="test" />,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })

    directions.forEach(direction => {
      test(`renders correctly direction ${direction} and loading`, () => {
        const { asFragment } = renderWithTheme(
          <ContentCard direction={direction} loading title="test" />,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })

    directions.forEach(direction => {
      test(`renders correctly direction ${direction} and image`, () => {
        const { asFragment } = renderWithTheme(
          <ContentCard
            direction={direction}
            image={illustration}
            title="test"
          />,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})

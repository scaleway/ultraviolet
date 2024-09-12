import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ContentCard } from '..'
import illustration from '../assets/illustration.png'

describe('ContentCard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
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
      <ContentCard title="test" headingTag="h1" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with disabled', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard title="test" disabled />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with empty string title', () => {
    const { asFragment } = renderWithTheme(<ContentCard title="" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with href', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard title="test" href="https://scaleway.com" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with href and direction row', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard title="test" href="https://scaleway.com" direction="row" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with href and target', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard title="test" href="https://scaleway.com" target="_blank" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with onClick', () => {
    const { asFragment } = renderWithTheme(
      <ContentCard title="test" onClick={() => {}} />,
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
        title="test"
        subtitle="sub title test"
        image={illustration}
        icon={illustration}
        description="this is a description"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe(`renders correctly with all directions`, () => {
    const directions = ['row', 'column'] as const
    directions.forEach(direction => {
      test(`renders correctly direction ${direction}`, () => {
        const { asFragment } = renderWithTheme(
          <ContentCard title="test" direction={direction} />,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })

    directions.forEach(direction => {
      test(`renders correctly direction ${direction} and loading`, () => {
        const { asFragment } = renderWithTheme(
          <ContentCard title="test" direction={direction} loading />,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })

    directions.forEach(direction => {
      test(`renders correctly direction ${direction} and image`, () => {
        const { asFragment } = renderWithTheme(
          <ContentCard
            title="test"
            direction={direction}
            image={illustration}
          />,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})

import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { ContentCardGroup } from '..'

describe('contentCardGroup', () => {
  it('renders correctly with required title', () => {
    const { asFragment } = renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the subtitle', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" subtitle="subtitle" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByText('subtitle')).toBeInTheDocument()
  })

  it('renders the description', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card description="description" href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByText('description')).toBeInTheDocument()
  })

  it('renders a link with the href and target', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent" title="title" />
      </ContentCardGroup>,
    )
    const link = screen.getByRole('link', { name: /title/i })
    expect(link).toHaveAttribute('href', 'http://scaleway.com')
    expect(link).toHaveAttribute('target', '_parent')
  })

  it('renders children', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent">
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    )
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('renders title and subtitle with custom heading levels', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card
          href="http://scaleway.com"
          subtitle="subtitle"
          subtitleAs="h2"
          title="title"
          titleAs="h1"
        >
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /title/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /subtitle/i })).toBeInTheDocument()
  })

  it('shows skeletons instead of cards when loading', () => {
    renderWithTheme(
      <ContentCardGroup loading>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByText('title')).toBeNull()
  })
})

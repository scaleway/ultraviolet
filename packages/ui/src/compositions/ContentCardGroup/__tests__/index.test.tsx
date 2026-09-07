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

  it('renders the title and subtitle as headings', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" subtitle="subtitle" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByRole('heading', { level: 3, name: /title/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 5, name: /subtitle/i })).toBeInTheDocument()
  })

  it('renders the description', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card description="description" href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByText('description')).toBeInTheDocument()
  })

  it('renders the title and subtitle with custom heading tags', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card
          href="http://scaleway.com"
          subtitle="subtitle"
          subtitleAs="h2"
          title="title"
          titleAs="h1"
        />
      </ContentCardGroup>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /title/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /subtitle/i })).toBeInTheDocument()
  })

  it('renders the target on the link', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByRole('link', { name: /title/i })).toHaveAttribute('target', '_parent')
  })

  it('renders children', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title">
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    )
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('renders skeletons instead of cards when loading', () => {
    const { container } = renderWithTheme(
      <ContentCardGroup loading>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})

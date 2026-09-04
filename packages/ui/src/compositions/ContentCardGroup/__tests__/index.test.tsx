import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { ContentCardGroup } from '..'

describe('contentCardGroup', () => {
  it('locks the default render DOM', () => {
    const { asFragment } = renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders each card as a link with href and default target', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    const link = screen.getByRole('link', { name: 'title' })
    expect(link).toHaveAttribute('href', 'http://scaleway.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders subtitle and description', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card description="description" href="http://scaleway.com" subtitle="subtitle" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByText('subtitle')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
  })

  it('renders skeleton cards instead of links while loading', () => {
    renderWithTheme(
      <ContentCardGroup loading>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('forwards a custom target to the link', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent" title="title" />
      </ContentCardGroup>,
    )
    expect(screen.getByRole('link', { name: 'title' })).toHaveAttribute('target', '_parent')
  })

  it('renders children inside the card', () => {
    renderWithTheme(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title">
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    )
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('uses titleAs and subtitleAs for heading levels', () => {
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
    expect(screen.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'subtitle' })).toBeInTheDocument()
  })
})

import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

  it('renders correctly with required title', () => {
    const { asFragment } = renderWithTheme(<ContentCard title="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the title as the given heading tag', () => {
    const { container } = renderWithTheme(<ContentCard headingTag="h1" title="test" />)
    const heading = screen.getByRole('heading', { name: /test/i })
    expect(heading.tagName).toBe('H1')
    expect(container.querySelector('h3')).toBeNull()
  })

  it('removes the link when disabled', () => {
    renderWithTheme(<ContentCard disabled href="https://scaleway.com" title="test" />)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('renders an empty heading when title is empty', () => {
    renderWithTheme(<ContentCard title="" />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders as a link with the href and target', () => {
    renderWithTheme(<ContentCard href="https://scaleway.com" target="_self" title="test" />)
    const link = screen.getByRole('link', { name: /test/i })
    expect(link).toHaveAttribute('href', 'https://scaleway.com')
    expect(link).toHaveAttribute('target', '_self')
  })

  it('calls onClick when used as a button', async () => {
    const onClick = vi.fn()
    renderWithTheme(<ContentCard onClick={onClick} title="test" />)
    await userEvent.click(screen.getByRole('button', { name: /test/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders children', () => {
    renderWithTheme(<ContentCard title="test">This is the children of the component</ContentCard>)
    expect(screen.getByText('This is the children of the component')).toBeInTheDocument()
  })

  it('renders subtitle, description, image and icon', () => {
    const { container } = renderWithTheme(
      <ContentCard
        description="this is a description"
        icon={illustration}
        image={illustration}
        subtitle="sub title test"
        title="test"
      />,
    )
    expect(screen.getByText('sub title test')).toBeInTheDocument()
    expect(screen.getByText('this is a description')).toBeInTheDocument()
    expect(container.querySelector('img')).not.toBeNull()
  })

  it('shows a skeleton instead of content when loading', () => {
    renderWithTheme(<ContentCard loading title="test" />)
    expect(screen.queryByText('test')).toBeNull()
  })
})

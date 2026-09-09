import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { ContentCard } from '..'
import illustration from '../assets/illustration.png'

describe('contentCard', () => {
  it('renders correctly with required title', () => {
    const { asFragment } = renderWithTheme(<ContentCard title="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the title as a heading', () => {
    renderWithTheme(<ContentCard title="test" />)
    expect(screen.getByRole('heading', { level: 3, name: /test/i })).toBeInTheDocument()
  })

  it('renders the title with a custom heading tag', () => {
    renderWithTheme(<ContentCard headingTag="h1" title="test" />)
    expect(screen.getByRole('heading', { level: 1, name: /test/i })).toBeInTheDocument()
  })

  it('renders subtitle and description', () => {
    renderWithTheme(<ContentCard description="this is a description" subtitle="sub title test" title="test" />)
    expect(screen.getByText('sub title test')).toBeInTheDocument()
    expect(screen.getByText('this is a description')).toBeInTheDocument()
  })

  it('renders the image', () => {
    const { container } = renderWithTheme(<ContentCard image={illustration} title="test" />)
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('renders children', () => {
    renderWithTheme(<ContentCard title="test">This is the children of the component</ContentCard>)
    expect(screen.getByText('This is the children of the component')).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    renderWithTheme(<ContentCard href="https://scaleway.com" title="test" />)
    expect(screen.getByRole('link', { name: /test/i })).toHaveAttribute('href', 'https://scaleway.com')
  })

  it('renders the target on the link', () => {
    renderWithTheme(<ContentCard href="https://scaleway.com" target="_self" title="test" />)
    expect(screen.getByRole('link', { name: /test/i })).toHaveAttribute('target', '_self')
  })

  it('renders as a button when onClick is provided and triggers it', async () => {
    const onClick = vi.fn()
    renderWithTheme(<ContentCard onClick={onClick} title="test" />)
    await userEvent.click(screen.getByRole('button', { name: /test/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disables the button when disabled', async () => {
    const onClick = vi.fn()
    renderWithTheme(<ContentCard disabled onClick={onClick} title="test" />)
    const button = screen.getByRole('button', { name: /test/i })
    expect(button).toBeDisabled()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('removes the href when disabled', () => {
    renderWithTheme(<ContentCard disabled href="https://scaleway.com" title="test" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders a skeleton instead of the content when loading', () => {
    const { container } = renderWithTheme(<ContentCard loading title="test" />)
    expect(screen.queryByRole('heading', { name: /test/i })).not.toBeInTheDocument()
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})

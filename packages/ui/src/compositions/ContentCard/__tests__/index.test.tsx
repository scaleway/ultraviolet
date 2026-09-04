import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { ContentCard } from '..'
import illustration from '../assets/illustration.png'

describe('contentCard', () => {
  it('locks the default render DOM', () => {
    const { asFragment } = renderWithTheme(<ContentCard title="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('uses headingTag for the heading level', () => {
    renderWithTheme(<ContentCard headingTag="h1" title="test" />)
    expect(screen.getByRole('heading', { level: 1, name: 'test' })).toBeInTheDocument()
  })

  it('drops the link when disabled', () => {
    renderWithTheme(<ContentCard disabled href="https://scaleway.com" title="test" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument()
  })

  it('renders a heading even with an empty title', () => {
    renderWithTheme(<ContentCard title="" />)
    expect(screen.getByRole('heading')).toHaveTextContent('')
  })

  it('renders as a link with href and default target', () => {
    renderWithTheme(<ContentCard href="https://scaleway.com" title="test" />)
    const link = screen.getByRole('link', { name: 'test' })
    expect(link).toHaveAttribute('href', 'https://scaleway.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('forwards a custom target to the link', () => {
    renderWithTheme(<ContentCard href="https://scaleway.com" target="_self" title="test" />)
    expect(screen.getByRole('link', { name: 'test' })).toHaveAttribute('target', '_self')
  })

  it('renders as a button and fires onClick when clicked', async () => {
    const onClick = vi.fn()
    renderWithTheme(<ContentCard onClick={onClick} title="test" />)
    await userEvent.click(screen.getByRole('button', { name: 'test' }))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders children content', () => {
    renderWithTheme(<ContentCard title="test">This is the children of the component</ContentCard>)
    expect(screen.getByText('This is the children of the component')).toBeInTheDocument()
  })

  it('renders subtitle and description alongside the title', () => {
    renderWithTheme(<ContentCard description="this is a description" subtitle="sub title test" title="test" />)
    expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument()
    expect(screen.getByText('sub title test')).toBeInTheDocument()
    expect(screen.getByText('this is a description')).toBeInTheDocument()
  })

  it('renders an image whose dimensions follow the direction', () => {
    const { container, rerender } = renderWithTheme(<ContentCard direction="row" image={illustration} title="test" />)
    const image = container.querySelector('img')!
    expect(image).toHaveAttribute('src', illustration)
    expect(image).toHaveAttribute('width', '220')
    rerender(<ContentCard direction="column" image={illustration} title="test" />)
    expect(container.querySelector('img')).toHaveAttribute('height', '120')
  })

  it('renders a skeleton instead of content while loading', () => {
    renderWithTheme(<ContentCard loading title="test" />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})

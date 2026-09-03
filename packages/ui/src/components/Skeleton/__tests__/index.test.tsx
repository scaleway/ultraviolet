import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Skeleton, skeletonTypes } from '..'

describe('skeleton', () => {
  it('locks the default render DOM', () => {
    const { asFragment } = renderWithTheme(<Skeleton />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('announces a loading state', () => {
    renderWithTheme(<Skeleton aria-label="Loading content" />)
    const container = screen.getByLabelText('Loading content')
    expect(container).toHaveAttribute('aria-busy', 'true')
    expect(container).toHaveAttribute('aria-live', 'polite')
  })

  it('propagates data-testid', () => {
    renderWithTheme(<Skeleton data-testid="my-skeleton" />)
    expect(screen.getByTestId('my-skeleton')).toBeInTheDocument()
  })

  it('exposes the donut as an accessible image', () => {
    const { container } = renderWithTheme(<Skeleton variant="donut" />)
    const title = container.querySelector('svg title')
    expect(title).toHaveTextContent('donut skeleton')
  })

  it('renders one listitem per length for the block variant', () => {
    renderWithTheme(<Skeleton variant="block" length={2} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders one listitem per length for the list variant', () => {
    renderWithTheme(<Skeleton variant="list" length={4} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  it('renders no list for the line variant', () => {
    renderWithTheme(<Skeleton variant="line" />)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it.each(skeletonTypes)('renders the "%s" variant without crashing', variant => {
    const { unmount } = renderWithTheme(<Skeleton data-testid="skeleton" variant={variant} />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-busy', 'true')
    unmount()
  })
})

import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { InfiniteScroll } from '..'

describe('infiniteScroll', () => {
  test('renders correctly ', () => {
    const { asFragment } = renderWithTheme(
      <InfiniteScroll onLoadMore={() => {}} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('onLoadMore is correctly called when scrolling down', async () => {
    const onLoadMore = vi.fn()

    renderWithTheme(
      <div
        data-testid="infinite-scroll-container"
        style={{ height: '10px', overflowY: 'scroll' }}
      >
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <InfiniteScroll onLoadMore={onLoadMore} />
      </div>,
    )

    const scrollContainer = screen.getByTestId('infinite-scroll-container')

    // Simulate scrolling to the bottom
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 300 } })

    await waitFor(() => {
      expect(onLoadMore).toHaveBeenCalledOnce()
    })
  })

  test('async onLoadMore is correctly called when scrolling down', async () => {
    const onLoadMore = vi.fn(
      async () =>
        new Promise<void>(resolve => {
          setTimeout(resolve, 100)
        }),
    )

    renderWithTheme(
      <div
        data-testid="infinite-scroll-container"
        style={{ height: '10px', overflowY: 'scroll' }}
      >
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <InfiniteScroll onLoadMore={onLoadMore} />
      </div>,
    )

    const scrollContainer = screen.getByTestId('infinite-scroll-container')

    // Simulate scrolling to the bottom
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 300 } })

    await waitFor(() => {
      expect(onLoadMore).toHaveBeenCalledOnce()
    })
  })
})

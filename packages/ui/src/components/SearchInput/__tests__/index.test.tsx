import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { SearchInput } from '..'

describe('SearchInput', () => {
  test('renders correctly without children props', () =>
    shouldMatchEmotionSnapshot(
      <SearchInput
        placeholder="Type something"
        popupPlacement="bottom"
        onSearch={() => {}}
        onClose={() => {}}
      >
        <div />
      </SearchInput>,
    ))

  test('renders correctly with children props and triggers onSearch then clear the search', async () => {
    let searchValue = ''

    renderWithTheme(
      <SearchInput
        size="medium"
        placeholder="Type something"
        label="input-label"
        popupPlacement="bottom"
        threshold={2}
        onSearch={value => {
          searchValue = value
        }}
        data-testid="search-bar"
      >
        {({ searchTerms }) => <div>{searchTerms}</div>}
      </SearchInput>,
    )

    const SearchInputElement = screen.getByTestId('search-bar')
    await userEvent.type(SearchInputElement, 'scw')
    await waitFor(() => expect(searchValue).toBe('scw'))

    // The tab will focus the cross
    await userEvent.keyboard('{Tab}')
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(searchValue).toBe(''))
  })

  test('renders correctly and verify accessibility', async () => {
    let searchValue = ''

    renderWithTheme(
      <SearchInput
        size="large"
        placeholder="Type something"
        label="input-label"
        data-testid="search-bar"
        popupPlacement="bottom"
        onSearch={value => {
          searchValue = value
        }}
      >
        <div>
          <a href="/" data-testid="children-1">
            Result 1
          </a>
          <a href="/" data-testid="children-2">
            Result 2
          </a>
        </div>
      </SearchInput>,
    )

    const SearchInputElement = screen.getByTestId('search-bar')
    await userEvent.type(SearchInputElement, 'scw')
    await waitFor(() => expect(searchValue).toBe('scw'))

    const popupSearchInput = screen.getByTestId('popup-search-bar')
    const childrenOne = screen.getByTestId('children-1')
    const childrenTwo = screen.getByTestId('children-2')

    expect(popupSearchInput).toBeVisible()

    // The first tab will focus the cross
    await userEvent.keyboard('{Tab}')
    await userEvent.keyboard('{Tab}')
    await waitFor(() => {
      expect(childrenOne).toHaveFocus()
    })

    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(childrenOne).not.toHaveFocus()
    })
    expect(childrenTwo).toHaveFocus()

    await userEvent.keyboard('{ArrowUp}')
    await waitFor(() => {
      expect(childrenTwo).not.toHaveFocus()
    })
    expect(childrenOne).toHaveFocus()

    await userEvent.keyboard('{ArrowUp}')
    await waitFor(() => {
      expect(childrenOne).not.toHaveFocus()
    })
    expect(childrenTwo).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(popupSearchInput).not.toBeVisible()
    })
  })
})

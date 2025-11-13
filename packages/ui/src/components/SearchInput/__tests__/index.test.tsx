import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { SearchInput } from '..'

describe('searchInput', () => {
  test('renders correctly without children props', () =>
    shouldMatchSnapshot(
      <SearchInput
        onClose={() => {}}
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
      >
        <div />
      </SearchInput>,
    ))

  test('renders with disabled prop', () =>
    shouldMatchSnapshot(
      <SearchInput
        disabled
        onClose={() => {}}
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
      >
        <div />
      </SearchInput>,
    ))

  describe('renders with shortcut prop', () => {
    test('as boolean', () =>
      shouldMatchSnapshot(
        <SearchInput
          onClose={() => {}}
          onSearch={() => {}}
          placeholder="Type something"
          popupPlacement="bottom"
          shortcut
        >
          <div />
        </SearchInput>,
      ))
    test('as array of string', () =>
      shouldMatchSnapshot(
        <SearchInput
          onClose={() => {}}
          onSearch={() => {}}
          placeholder="Type something"
          popupPlacement="bottom"
          shortcut={['Control', 'Shift', 'A']}
        >
          <div />
        </SearchInput>,
      ))
  })

  test('renders with error prop', () =>
    shouldMatchSnapshot(
      <SearchInput
        error="there is an error"
        onClose={() => {}}
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
      >
        <div />
      </SearchInput>,
    ))

  test('renders correctly with children props and triggers onSearch then clear the search', async () => {
    let searchValue = ''

    renderWithTheme(
      <SearchInput
        data-testid="search-bar"
        label="input-label"
        onSearch={value => {
          searchValue = value
        }}
        placeholder="Type something"
        popupPlacement="bottom"
        size="medium"
        threshold={2}
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
        data-testid="search-bar"
        label="input-label"
        onSearch={value => {
          searchValue = value
        }}
        placeholder="Type something"
        popupPlacement="bottom"
        size="large"
      >
        <div>
          <a data-testid="children-1" href="/">
            Result 1
          </a>
          <a data-testid="children-2" href="/">
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

  test('check if shortcut as boolean works', async () => {
    renderWithTheme(
      <SearchInput
        data-testid="search-bar"
        label="input-label"
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
        shortcut
        size="large"
      >
        <div>
          <a data-testid="children-1" href="/">
            Result 1
          </a>
          <a data-testid="children-2" href="/">
            Result 2
          </a>
        </div>
      </SearchInput>,
    )
    const SearchInputElement = screen.getByTestId('search-bar')

    await userEvent.keyboard('{Control>}k')
    await userEvent.keyboard('{Meta>}k')
    expect(SearchInputElement).toHaveFocus()
  })

  test('check if custom shortcut works', async () => {
    renderWithTheme(
      <SearchInput
        data-testid="search-bar"
        label="input-label"
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
        shortcut={['Control', 'Shift', 'A']}
        size="large"
      >
        <div>
          <a data-testid="children-1" href="/">
            Result 1
          </a>
          <a data-testid="children-2" href="/">
            Result 2
          </a>
        </div>
      </SearchInput>,
    )

    const SearchInputElement = screen.getByTestId('search-bar')

    await userEvent.keyboard('{Control>}{Shift>}a')
    expect(SearchInputElement).toHaveFocus()
  })

  test('search icon is clickable', async () => {
    renderWithTheme(
      <SearchInput
        data-testid="search-bar"
        label="input-label"
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
        shortcut={['Control', 'Shift', 'A']}
        size="large"
      >
        <div>
          <a data-testid="children-1" href="/">
            Result 1
          </a>
          <a data-testid="children-2" href="/">
            Result 2
          </a>
        </div>
      </SearchInput>,
    )

    const SearchInputElement = screen.getByTestId('search-bar')
    const searchIcon = screen.getByTestId('search-icon-search-bar')
    await userEvent.click(searchIcon)

    await waitFor(() => {
      expect(SearchInputElement).toHaveFocus()
    })
  })

  test('search shotcut are clickable', async () => {
    renderWithTheme(
      <SearchInput
        data-testid="search-bar"
        label="input-label"
        onSearch={() => {}}
        placeholder="Type something"
        popupPlacement="bottom"
        shortcut={['Control']}
        size="large"
      >
        <div>
          <a data-testid="children-1" href="/">
            Result 1
          </a>
          <a data-testid="children-2" href="/">
            Result 2
          </a>
        </div>
      </SearchInput>,
    )

    const SearchInputElement = screen.getByTestId('search-bar')
    const shortcutKey = screen.getByTestId('key-Ctrl')
    await userEvent.click(shortcutKey)

    await waitFor(() => {
      expect(SearchInputElement).toHaveFocus()
    })
  })
})

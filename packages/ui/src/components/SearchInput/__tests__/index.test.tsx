import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { SearchInput } from '..'
import { KEYS_MATCH, Key } from '../Key'

describe('SearchInput', () => {
  describe('Key', () => {
    Object.keys(KEYS_MATCH).forEach(key => {
      test(`renders correctly with special ${key} key`, () =>
        shouldMatchEmotionSnapshot(<Key>{key}</Key>))
    })

    test('renders correctly with disabled', () =>
      shouldMatchEmotionSnapshot(<Key disabled>K</Key>))
  })

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

  test('renders with disabled prop', () =>
    shouldMatchEmotionSnapshot(
      <SearchInput
        placeholder="Type something"
        popupPlacement="bottom"
        onSearch={() => {}}
        onClose={() => {}}
        disabled
      >
        <div />
      </SearchInput>,
    ))

  describe('renders with shortcut prop', () => {
    test('as boolean', () =>
      shouldMatchEmotionSnapshot(
        <SearchInput
          placeholder="Type something"
          popupPlacement="bottom"
          onSearch={() => {}}
          onClose={() => {}}
          shortcut
        >
          <div />
        </SearchInput>,
      ))
    test('as array of string', () =>
      shouldMatchEmotionSnapshot(
        <SearchInput
          placeholder="Type something"
          popupPlacement="bottom"
          onSearch={() => {}}
          onClose={() => {}}
          shortcut={['Control', 'Shift', 'A']}
        >
          <div />
        </SearchInput>,
      ))
  })

  test('renders with error prop', () =>
    shouldMatchEmotionSnapshot(
      <SearchInput
        placeholder="Type something"
        popupPlacement="bottom"
        onSearch={() => {}}
        onClose={() => {}}
        error="there is an error"
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

  test('check if shortcut as boolean works', async () => {
    renderWithTheme(
      <SearchInput
        size="large"
        placeholder="Type something"
        label="input-label"
        data-testid="search-bar"
        popupPlacement="bottom"
        onSearch={() => {}}
        shortcut
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

    await userEvent.keyboard('{Control>}k')
    await userEvent.keyboard('{Meta>}k')
    expect(SearchInputElement).toHaveFocus()
  })

  test('check if custom shortcut works', async () => {
    renderWithTheme(
      <SearchInput
        size="large"
        placeholder="Type something"
        label="input-label"
        data-testid="search-bar"
        popupPlacement="bottom"
        onSearch={() => {}}
        shortcut={['Control', 'Shift', 'A']}
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

    await userEvent.keyboard('{Control>}{Shift>}a')
    expect(SearchInputElement).toHaveFocus()
  })

  test('search icon is clickable', async () => {
    renderWithTheme(
      <SearchInput
        size="large"
        placeholder="Type something"
        label="input-label"
        data-testid="search-bar"
        popupPlacement="bottom"
        onSearch={() => {}}
        shortcut={['Control', 'Shift', 'A']}
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
    const searchIcon = screen.getByTestId('search-icon-search-bar')
    await userEvent.click(searchIcon)

    await waitFor(() => {
      expect(SearchInputElement).toHaveFocus()
    })
  })

  test('search shotcut are clickable', async () => {
    renderWithTheme(
      <SearchInput
        size="large"
        placeholder="Type something"
        label="input-label"
        data-testid="search-bar"
        popupPlacement="bottom"
        onSearch={() => {}}
        shortcut={['Control']}
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
    const shortcutKey = screen.getByTestId('key-Ctrl')
    await userEvent.click(shortcutKey)

    await waitFor(() => {
      expect(SearchInputElement).toHaveFocus()
    })
  })
})

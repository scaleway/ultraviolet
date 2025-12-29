import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Pagination } from '..'

describe('pagination', () => {
  test('should render correctly', async () => {
    const mockOnClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Pagination
        onChange={mockOnClick}
        page={1}
        pageCount={5}
        pageTabCount={5}
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with pageCount is 1', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination onChange={mockOnClick} page={1} pageCount={1} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with pageTabCount', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination onChange={mockOnClick} page={12} pageCount={16} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with disabled', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination disabled onChange={mockOnClick} page={5} pageCount={10} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with page < 1', () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination onChange={mockOnClick} page={0} pageCount={2} />,
    )
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with page > pageCount', () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination onChange={mockOnClick} page={3} pageCount={2} />,
    )
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with pageClick', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination onChange={mockOnClick} page={2} pageCount={10} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    const backButton = screen.getByRole('button', { name: 'Back' })
    await userEvent.click(nextButton)
    await userEvent.click(backButton)
    expect(mockOnClick).toHaveBeenCalledTimes(2)

    const page3Button = screen.getByRole('button', { name: '3' })
    await userEvent.click(page3Button)
    await userEvent.click(page3Button)
    const page4Button = screen.getByRole('button', { name: '4' })
    await userEvent.click(page4Button)
    const page10Button = screen.getByRole('button', { name: '10' })
    await userEvent.click(page10Button)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with perPage - default values', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination
        numberOfItems={100}
        onChange={mockOnClick}
        page={2}
        pageCount={10}
        perPage={10}
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with perPage', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination
        numberOfItems={30}
        numberOfItemsText="items"
        onChange={mockOnClick}
        page={2}
        pageCount={10}
        perPage={10}
        perPageText="test"
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work correctly with perPage', async () => {
    const mockOnClick = vi.fn()
    const mockOnClickPerPage = vi.fn()

    renderWithTheme(
      <Pagination
        numberOfItems={100}
        numberOfItemsText="items"
        onChange={mockOnClick}
        onChangePerPage={mockOnClickPerPage}
        page={2}
        pageCount={10}
        perPage={10}
        perPageText="test"
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    const selectInput = screen.getByTestId('select-input-select-items-per-page')
    await userEvent.click(selectInput)

    const elementsPerPage25 = screen.getByTestId('option-25')
    await userEvent.click(elementsPerPage25)
    expect(mockOnClickPerPage).toHaveBeenCalledTimes(1)
  })
})

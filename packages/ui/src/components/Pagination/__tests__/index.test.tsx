import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Pagination } from '..'

describe('Pagination', () => {
  test('should render correctly', async () => {
    const mockOnClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Pagination
        page={1}
        onChange={mockOnClick}
        pageCount={5}
        pageTabCount={5}
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with pageCount is 1', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination page={1} onChange={mockOnClick} pageCount={1} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with pageTabCount', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination page={12} pageCount={16} onChange={mockOnClick} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with disabled', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination page={5} pageCount={10} onChange={mockOnClick} disabled />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with page < 1', () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination page={0} onChange={mockOnClick} pageCount={2} />,
    )
    expect(mockOnClick).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with page > pageCount', () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination page={3} onChange={mockOnClick} pageCount={2} />,
    )
    expect(mockOnClick).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with pageClick', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination page={2} pageCount={10} onChange={mockOnClick} />,
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
        page={2}
        pageCount={10}
        onChange={mockOnClick}
        perPage={10}
        numberOfItems={100}
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with perPage', async () => {
    const mockOnClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination
        page={2}
        pageCount={10}
        onChange={mockOnClick}
        perPage={10}
        perPageText="test"
        numberOfItems={30}
        numberOfItemsText="items"
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work correctly with perPage', async () => {
    const mockOnClick = vi.fn()
    const mockOnClickPerPage = vi.fn()

    const { asFragment } = renderWithTheme(
      <Pagination
        page={2}
        pageCount={10}
        onChange={mockOnClick}
        perPage={10}
        perPageText="test"
        onChangePerPage={mockOnClickPerPage}
        numberOfItems={100}
        numberOfItemsText="items"
      />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    expect(mockOnClick).toHaveBeenCalledOnce()

    const selectInput = screen.getByTestId('select-input-select-items-per-page')
    await userEvent.click(selectInput)

    const elementsPerPage25 = screen.getByTestId('option-25')
    await userEvent.click(elementsPerPage25)
    expect(mockOnClickPerPage).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })
})

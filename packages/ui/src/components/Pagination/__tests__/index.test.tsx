import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Pagination } from '..'

describe('Pagination', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithTheme(
      <Pagination
        page={1}
        onChange={() => {}}
        pageCount={5}
        pageTabCount={5}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with pageCount is 1', () => {
    const { asFragment } = renderWithTheme(
      <Pagination page={1} onChange={() => {}} pageCount={1} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with pageTabCount', () => {
    const { asFragment } = renderWithTheme(
      <Pagination page={12} pageCount={16} onChange={() => {}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with disabled', () => {
    const { asFragment } = renderWithTheme(
      <Pagination page={5} pageCount={10} onChange={() => {}} disabled />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with disabled', () => {
    const { asFragment } = renderWithTheme(
      <Pagination page={5} pageCount={10} onChange={() => {}} disabled />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with pageClick', async () => {
    const { asFragment } = renderWithTheme(
      <Pagination page={2} pageCount={10} onChange={() => {}} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    const backButton = screen.getByRole('button', { name: 'Back' })
    await userEvent.click(nextButton)
    await userEvent.click(backButton)
    const page3Button = screen.getByRole('button', { name: 'Page 3' })
    await userEvent.click(page3Button)
    await userEvent.click(page3Button)
    const page4Button = screen.getByRole('button', { name: 'Page 4' })
    await userEvent.click(page4Button)
    const page10Button = screen.getByRole('button', { name: 'Page 10' })
    await userEvent.click(page10Button)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly component with disabled', () => {
    const { asFragment } = renderWithTheme(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
        disabled
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with perPage - default values', () => {
    const { asFragment } = renderWithTheme(
      <Pagination
        page={2}
        pageCount={10}
        onChange={() => {}}
        perPage={10}
        numberOfItems={100}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with perPage', async () => {
    const mockOnClickPerPage = vi.fn()
    const { asFragment } = renderWithTheme(
      <Pagination
        page={2}
        pageCount={10}
        onChange={() => {}}
        perPage={10}
        perPageText="test"
        onChangePerPage={mockOnClickPerPage}
        numberOfItems={100}
        numberOfItemsText="items"
      />,
    )
    const selectInput = screen.getByTestId('select-input-select-items-per-page')
    await userEvent.click(selectInput)

    const elementsPerPage25 = screen.getByTestId('option-25')
    await userEvent.click(elementsPerPage25)
    expect(mockOnClickPerPage).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })
})

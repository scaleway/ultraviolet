import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test } from 'vitest'
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
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
      />,
    )
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

  test('should render correctly with pageClick', async () => {
    const { asFragment } = renderWithTheme(
      <Pagination page={2} pageCount={10} onChange={() => {}} />,
    )
    const nextButton = screen.getByRole('button', { name: 'Next' })
    const backButton = screen.getByRole('button', { name: 'Back' })
    const firstButton = screen.getByRole('button', { name: 'First' })
    const lastButton = screen.getByRole('button', { name: 'Last' })
    await userEvent.click(nextButton)
    await userEvent.click(backButton)
    await userEvent.click(lastButton)
    await userEvent.click(firstButton)
    const page3Button = screen.getByRole('button', { name: 'Page 3' })
    await userEvent.click(page3Button)
    await userEvent.click(page3Button)
    const page4Button = screen.getByRole('button', { name: 'Page 4' })
    await userEvent.click(page4Button)
    expect(asFragment()).toMatchSnapshot()
  })
})

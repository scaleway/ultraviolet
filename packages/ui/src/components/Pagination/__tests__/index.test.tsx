import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Pagination', () => {
  test('should render correctly', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        page={1}
        onChange={() => {}}
        pageCount={5}
        pageTabCount={5}
      />,
    ))

  test('should render correctly with pageCount is 1', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination page={1} onChange={() => {}} pageCount={1} />,
    ))

  test('should render correctly component with pageTabCount', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
      />,
    ))

  test('should render correctly component with disabled', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
        disabled
      />,
    ))

  test('should render correctly component with disabled', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        page={5}
        pageCount={10}
        onChange={() => {}}
        disabled
      />,
    ))

  test('should render correctly with pageClick', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination page={2} pageCount={10} onChange={() => {}} />,
      {
        transform: async () => {
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
        },
      },
    ))
})

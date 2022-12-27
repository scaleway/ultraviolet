import userEvent from '@testing-library/user-event'
import Pagination from '..'
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
        transform: async node => {
          const nextButton = node.getByRole('button', { name: 'Next' })
          const backButton = node.getByRole('button', { name: 'Back' })
          const firstButton = node.getByRole('button', { name: 'First' })
          const lastButton = node.getByRole('button', { name: 'Last' })
          await userEvent.click(nextButton)
          await userEvent.click(backButton)
          await userEvent.click(lastButton)
          await userEvent.click(firstButton)
          const page3Button = node.getByRole('button', { name: 'Page 3' })
          await userEvent.click(page3Button)
          await userEvent.click(page3Button)
          const page4Button = node.getByRole('button', { name: 'Page 4' })
          await userEvent.click(page4Button)
        },
      },
    ))
})

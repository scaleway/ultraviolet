import { describe, expect, jest, test } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('Form', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {() => 'Test'}
      </Form>,
    ))
  test('renders correctly with node children', () =>
    shouldMatchEmotionSnapshot(
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        Test
      </Form>,
    ))

  test('renders correctly with onRawSubmit', () => {
    const onRawSubmit = jest.fn(() => {})

    return shouldMatchEmotionSnapshot(
      <Form errors={mockErrors} onRawSubmit={onRawSubmit}>
        <button type="submit">Submit</button>
      </Form>,
      {
        transform: async () => {
          await userEvent.click(screen.getByText('Submit'))
          await waitFor(() => expect(onRawSubmit).toBeCalledTimes(1))
        },
      },
    )
  })
})

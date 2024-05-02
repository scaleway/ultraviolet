import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockFormErrors, renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Form } from '..'

describe('Form', () => {
  test('renders correctly ', () => {
    const { asFragment } = renderWithTheme(
      <Form onRawSubmit={() => {}} errors={mockFormErrors}>
        {() => 'Test'}
      </Form>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly with node children', () => {
    const { asFragment } = renderWithTheme(
      <Form onRawSubmit={() => {}} errors={mockFormErrors}>
        Test
      </Form>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with onRawSubmit', async () => {
    const onRawSubmit = vi.fn(() => {})

    const { asFragment } = renderWithTheme(
      <Form errors={mockFormErrors} onRawSubmit={onRawSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    )
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => expect(onRawSubmit).toBeCalledTimes(1))
    expect(asFragment()).toMatchSnapshot()
  })
})

import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, vi, it } from 'vitest'
import { renderWithForm } from '../../../__tests__/helpers'

describe('form', () => {
  it('renders correctly with node children', () => {
    const { asFragment } = renderWithForm(<>Test</>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with onSubmit', async () => {
    const onSubmit = vi.fn(() => {})

    const { asFragment } = renderWithForm(<button type="submit">Submit</button>, undefined, { onSubmit })
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce())
    expect(asFragment()).toMatchSnapshot()
  })
})

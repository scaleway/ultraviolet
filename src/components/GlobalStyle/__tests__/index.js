import { waitFor } from '@testing-library/react'
import React from 'react'
import GlobalStyle from '..'
import renderWithTheme from '../../../helpers/renderWithTheme'

describe('GlobalStyle', () => {
  test('renders correctly with default values', async () => {
    renderWithTheme(<GlobalStyle />, { container: document.html })

    await waitFor(
      () => {
        expect(document.head).toMatchSnapshot()
      },
      { container: document.head },
    )
  })
})

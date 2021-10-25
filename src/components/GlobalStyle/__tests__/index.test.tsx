import { waitFor } from '@testing-library/react'
import React from 'react'
import GlobalStyle from '..'
import { renderWithTheme } from '../../../helpers/jestHelpers'

describe('GlobalStyle', () => {
  test('renders correctly with default values', async () => {
    renderWithTheme(<GlobalStyle />)

    await waitFor(
      () => {
        expect(document.head).toMatchSnapshot()
      },
      { container: document.head },
    )
  })
})

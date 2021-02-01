import serializer from '@emotion/jest'
import { prettyDOM, render, waitFor } from '@testing-library/react'
import React from 'react'
import { GlobalStyle } from '..'

expect.addSnapshotSerializer(serializer)

describe('GlobalStyle', () => {
  test('renders correctly with default values', () => {
    render(<GlobalStyle />, { container: document.html })

    waitFor(
      () => {
        expect(
          prettyDOM(document.head, 7000, { highlight: false }),
        ).toMatchSnapshot()
      },
      { container: document.head },
    )
  })
})

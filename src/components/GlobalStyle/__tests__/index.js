import serializer from '@emotion/jest'
import { prettyDOM, waitFor } from '@testing-library/react'
import React from 'react'
import GlobalStyle from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

expect.addSnapshotSerializer(serializer)

describe('GlobalStyle', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<GlobalStyle />)

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

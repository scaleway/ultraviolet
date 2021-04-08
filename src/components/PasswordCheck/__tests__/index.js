import React from 'react'
import PasswordCheck from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('PasswordCheck', () => {
  test('render with custom values', () => {
    shouldMatchEmotionSnapshot(
      <PasswordCheck
        rules={[
          {
            name: 'custom1',
            valid: false,
            text:
              "That's a beautiful custom password check we have right there",
          },
          {
            name: 'custom2',
            valid: true,
            text:
              "That's a second beautiful custom password check we have right there",
          },
        ]}
      />,
    )
  })
})

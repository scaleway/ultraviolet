import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'

import { PasswordCheck } from '..'

describe('passwordCheck', () => {
  it('render with custom values', () =>
    shouldMatchSnapshot(
      <PasswordCheck
        rules={[
          {
            name: 'custom1',
            text: "That's a beautiful custom password check we have right there",
            valid: false,
          },
          {
            name: 'custom2',
            text: "That's a second beautiful custom password check we have right there",
            valid: true,
          },
        ]}
      />,
    ))
})

import PasswordCheck from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('PasswordCheck', () => {
  test('render with custom values', () =>
    shouldMatchEmotionSnapshot(
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

import { TimeInput } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('TimeInput', () => {
  test('renders correctly with base props', () =>
    shouldMatchEmotionSnapshot(
      <TimeInput inputId="test" labelId="test-label" name="timeinput-test-0" />,
    ))
})

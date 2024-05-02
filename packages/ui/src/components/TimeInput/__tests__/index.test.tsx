import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { TimeInput } from '..'

describe('TimeInput', () => {
  test('renders correctly with base props', () =>
    shouldMatchEmotionSnapshot(
      <TimeInput inputId="test" labelId="test-label" name="timeinput-test-0" />,
    ))
})

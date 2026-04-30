import { shouldNotHaveViolation } from '@utils/test'
import { describe, test } from 'vitest'

import { Stack } from '..'

describe('stack', () => {
  test('should render correctly with default props', async () =>
    shouldNotHaveViolation(
      <Stack>
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    ))
})

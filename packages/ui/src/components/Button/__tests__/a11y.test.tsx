import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { shouldNotHaveViolation } from '@utils/test'
import { describe, test } from 'vitest'

import { Button } from '..'

describe('stack', () => {
  test('should render correctly with default props', async () =>
    shouldNotHaveViolation(
      <Button disabled onClick={() => {}}>
        <PencilIcon />
        Hello
      </Button>,
    ))
})

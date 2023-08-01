import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const Disabled: StoryFn = () => (
  <>
    <Checkbox disabled onChange={() => {}}>
      Checkbox disabled
    </Checkbox>
    <Checkbox checked="indeterminate" disabled onChange={() => {}}>
      Checkbox indeterminate and disabled
    </Checkbox>
    <Checkbox checked disabled onChange={() => {}}>
      Checkbox checked and disabled
    </Checkbox>
  </>
)

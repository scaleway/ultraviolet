import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const Disabled: StoryFn = () => (
  <>
    <Checkbox disabled helper="Helper" onChange={() => {}}>
      Checkbox disabled
    </Checkbox>
    <Checkbox
      helper="Helper"
      disabled
      error="An error message"
      onChange={() => {}}
    >
      Checkbox indeterminate and disabled
    </Checkbox>
    <Checkbox checked disabled onChange={() => {}}>
      Checkbox checked and disabled
    </Checkbox>
    <Checkbox
      checked
      helper="Helper"
      disabled
      error="An error message"
      onChange={() => {}}
    >
      Checkbox indeterminate and disabled
    </Checkbox>
    <Checkbox
      checked="indeterminate"
      helper="Helper"
      disabled
      onChange={() => {}}
    >
      Checkbox indeterminate and disabled
    </Checkbox>
  </>
)

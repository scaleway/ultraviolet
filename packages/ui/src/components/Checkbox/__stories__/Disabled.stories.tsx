import type { StoryFn } from '@storybook/react-vite'
import { Checkbox } from '..'

export const Disabled: StoryFn = args => (
  <>
    <Checkbox {...args} disabled onChange={() => {}}>
      Checkbox disabled
    </Checkbox>
    <Checkbox {...args} disabled error onChange={() => {}}>
      Checkbox disabled and in error
    </Checkbox>
    <Checkbox {...args} checked disabled onChange={() => {}}>
      Checkbox checked and disabled
    </Checkbox>
    <Checkbox {...args} checked disabled error onChange={() => {}}>
      Checkbox checked, disabled and in error
    </Checkbox>
    <Checkbox {...args} checked="indeterminate" disabled onChange={() => {}}>
      Checkbox indeterminate and disabled
    </Checkbox>
  </>
)

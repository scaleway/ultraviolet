import { SunIcon } from '@ultraviolet/icons/SunIcon'

import { Stepper } from '..'
import { Text } from '../../Text'

import type { StoryFn } from '@storybook/react-vite'

export const Children: StoryFn<typeof Stepper> = args => (
  <Stepper {...args}>
    <Stepper.Step title="Step 1">Children</Stepper.Step>
    <Stepper.Step title="Step 2">
      <Text as="span" sentiment="primary" variant="body">
        Custom text!
      </Text>
    </Stepper.Step>
    <Stepper.Step title="Step 3" />
    <Stepper.Step title="Step 4" />
    <Stepper.Step title="Step 5">
      Icon: <SunIcon />
    </Stepper.Step>
  </Stepper>
)

Children.parameters = {
  docs: {
    description: {
      story: 'You can add children to add more information',
    },
  },
}

Children.args = {
  interactive: false,
  selected: 3,
}

import type { StoryFn } from '@storybook/react-vite'
import { SunIcon } from '@ultraviolet/icons'
import { Text } from '../../Text'
import { Stepper } from '..'

export const Children: StoryFn<typeof Stepper> = args => (
  <Stepper {...args}>
    <Stepper.Step title="Step 1">Children</Stepper.Step>
    <Stepper.Step title="Step 2">
      <Text as="span" variant="body" sentiment="primary">
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
  selected: 3,
  interactive: false,
}

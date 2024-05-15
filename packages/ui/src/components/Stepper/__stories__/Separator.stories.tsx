import type { StoryFn } from '@storybook/react'
import { Stepper } from '..'
import { Stack } from '../../Stack'

export const Separator: StoryFn<typeof Stepper> = args => (
  <Stack direction="column" gap={3}>
    <Stack gap={1}>
      Without separator: <Stepper {...args} separator={false} />
    </Stack>
    <Stack gap={1}>
      With separtor: <Stepper {...args} />
    </Stack>
  </Stack>
)

Separator.args = {
  selected: 1,
  interactive: true,
  children: [
    <Stepper.Step index={0}>
      <span>Step 1</span>
    </Stepper.Step>,
    <Stepper.Step index={1}>
      <span>Step 2</span>
    </Stepper.Step>,
    <Stepper.Step index={2}>
      <span>Step 3</span>
    </Stepper.Step>,
  ],
}

Separator.parameters = {
  docs: {
    description: {
      story:
        'You can pass a function to `OnChange` to deal with selection of options.',
    },
  },
}

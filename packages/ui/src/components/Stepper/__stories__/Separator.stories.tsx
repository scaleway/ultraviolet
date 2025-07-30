import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Stepper } from '..'

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
  children: [
    <Stepper.Step key="step-1" title="Step 1" />,
    <Stepper.Step key="step-2" title="Step 2" />,
    <Stepper.Step key="step-3" title="Step 3" />,
  ],
  interactive: true,
  selected: 1,
}

Separator.parameters = {
  docs: {
    description: {
      story:
        'Steps can be separated by a separator or not. By default there is a separator.',
    },
  },
}

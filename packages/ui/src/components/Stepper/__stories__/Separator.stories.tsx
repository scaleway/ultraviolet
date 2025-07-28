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
    <Stepper.Step title="Step 1" />,
    <Stepper.Step title="Step 2" />,
    <Stepper.Step title="Step 3" />,
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

import type { StoryFn } from '@storybook/react-vite'
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
    <Stepper.Step title="Step 1" />,
    <Stepper.Step title="Step 2" />,
    <Stepper.Step title="Step 3" />,
  ],
}

Separator.parameters = {
  docs: {
    description: {
      story:
        'Steps can be separated by a separator or not. By default there is a separator.',
    },
  },
}

import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { SliderField } from '..'

export const Options: StoryFn<ComponentProps<typeof SliderField>> = ({
  name,
  label,
  ...args
}) => (
  <Stack gap={5}>
    <Stack gap={2}>
      <SliderField name={name} label={label} {...args} />
      <SliderField
        {...args}
        double
        name={`${name}-double`}
        label={`${label}-double`}
      />
    </Stack>
    <Submit>Submit</Submit>
  </Stack>
)

Options.args = {
  name: 'options',
  label: 'Custom Options',
  options: [
    { label: '0.5Gbps', value: 0.5 },
    { label: '1', value: 1 },
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '10Gbps', value: 10 },
  ],
}

Options.parameters = {
  docs: {
    description: {
      story:
        'When `options` is passed the slider will automatically use the options as the min and max values. The value will be the value of the selected option.',
    },
  },
}

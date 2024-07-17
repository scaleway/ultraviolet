import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SliderField } from '..'
import { Submit } from '../../Submit'

export const PossibleValues: StoryFn<
  ComponentProps<typeof SliderField>
> = args => (
  <Stack gap={5}>
    <Stack gap={2}>
      <SliderField {...args} />
      <SliderField
        {...args}
        double
        name="possible-values-double"
        label="Possible values double"
      />
    </Stack>
    <Submit>Submit</Submit>
  </Stack>
)

PossibleValues.args = {
  name: 'possible-values',
  label: 'Possible values',
  possibleValues: [1, 3, 5, 10, 50, 100, 500],
}

PossibleValues.parameters = {
  docs: {
    description: {
      story:
        "When `possibleValues` is provided, instead of using it's true input value, it will match automatically `possibleValues` with the index of the value. This way you won't need to do the matching on form submission.",
    },
  },
}

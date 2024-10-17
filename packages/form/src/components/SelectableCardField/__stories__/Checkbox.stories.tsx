import type { StoryFn } from '@storybook/react'
import { Row } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Checkbox: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Row templateColumns="repeat(2, 2fr)" gap={1}>
    <SelectableCardField
      {...args}
      id="option1"
      name="option1"
      showTick
      value="value1"
      type="checkbox"
    />
    <SelectableCardField
      {...args}
      id="option2"
      name="option1"
      showTick
      value="value2"
      type="checkbox"
    />
  </Row>
)

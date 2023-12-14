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
      name="option1"
      showTick
      label="Option 1"
      type="checkbox"
    />
    <SelectableCardField
      {...args}
      name="option2"
      showTick
      label="Option 2"
      type="checkbox"
    />
  </Row>
)

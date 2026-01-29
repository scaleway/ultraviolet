import type { StoryFn } from '@storybook/react-vite'
import { Row } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Radio: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Row gap={1} templateColumns="repeat(2, 2fr)">
    <SelectableCardField
      {...args}
      id="option1"
      name="option1"
      showTick
      type="radio"
      value="value1"
    />
    <SelectableCardField
      {...args}
      id="option2"
      name="option1"
      showTick
      type="radio"
      value="value2"
    />
  </Row>
)

Radio.args = {
  label: 'radio',
  name: 'Radio',
}

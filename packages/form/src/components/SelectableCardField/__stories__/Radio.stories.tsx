import { Row } from '@ultraviolet/ui'

import { SelectableCardField } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

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

import type { StoryFn } from '@storybook/react-vite'
import { Row } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Row gap={1} templateColumns="repeat(2, 2fr)">
    <SelectableCardField {...args} name="option" showTick value="option1" />
    <SelectableCardField {...args} name="option" showTick value="option2" />
  </Row>
)

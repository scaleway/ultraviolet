import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Template: Story<
  ComponentProps<typeof SelectableCardField>
> = args => <SelectableCardField {...args}>Radio</SelectableCardField>

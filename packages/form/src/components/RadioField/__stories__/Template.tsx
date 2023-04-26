import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { RadioField } from '..'

export const Template: Story<ComponentProps<typeof RadioField>> = args => (
  <RadioField {...args}>Radio</RadioField>
)

import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { NumberInputField } from '..'

export const Template: Story<
  ComponentProps<typeof NumberInputField>
> = args => <NumberInputField {...args} />

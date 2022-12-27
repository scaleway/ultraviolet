import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SelectNumberField } from '..'

export const Template: Story<
  ComponentProps<typeof SelectNumberField>
> = args => <SelectNumberField {...args} />

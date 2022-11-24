import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import DateInput from '..'

export const Template: Story<ComponentProps<typeof DateInput>> = props => (
  <DateInput {...props} />
)

import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { CustomerSatisfaction } from '..'

export const Template: StoryFn<
  ComponentProps<typeof CustomerSatisfaction>
> = props => (
  <div>
    <CustomerSatisfaction {...props} />
  </div>
)

Template.args = {
  value: 1,
  onChange: rating => {
    console.log(rating)
  },
}

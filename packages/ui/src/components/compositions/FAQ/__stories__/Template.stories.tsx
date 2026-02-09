import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { FAQ } from '..'

export const Template: StoryFn<ComponentProps<typeof FAQ>> = props => (
  <FAQ {...props} />
)

Template.args = {
  description:
    'Our Sales team can help you tailor the best solution for your needs.',
  illustrationText: 'sms',
  productIconName: 'sms',
  title: 'Need help?',
}

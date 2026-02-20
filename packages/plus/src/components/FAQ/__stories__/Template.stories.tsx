import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { FAQ } from '..'
import { SmsProductIcon } from '@ultraviolet/icons/product/SmsProductIcon'

export const Template: StoryFn<ComponentProps<typeof FAQ>> = props => (
  <FAQ {...props} />
)

Template.args = {
  description:
    'Our Sales team can help you tailor the best solution for your needs.',
  illustrationText: 'sms',
  productIcon: <SmsProductIcon size="xlarge" />,
  title: 'Need help?',
}

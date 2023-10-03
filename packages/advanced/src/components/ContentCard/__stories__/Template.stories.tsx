import type { StoryFn } from '@storybook/react'
import { ProductIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { ContentCard } from '..'
import Illustration from '../assets/illustration.png'

export const Template: StoryFn<ComponentProps<typeof ContentCard>> = args => (
  <ContentCard {...args} />
)

Template.args = {
  direction: 'column',
  image: Illustration,
  icon: <ProductIcon name="cockpit" size="large" />,
  subtitle: 'New update',
  title: 'Create your first function',
  description:
    'The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you.',
}

import type { StoryFn } from '@storybook/react'
import { CockpitProductIcon } from '@ultraviolet/icons/product'
import type { ComponentProps } from 'react'
import { ContentCard } from '..'
import illustration from '../assets/illustration.png'

export const Template: StoryFn<ComponentProps<typeof ContentCard>> = ({
  direction,
  ...props
}) => (
  <div style={{ width: direction === 'column' ? '315px' : undefined }}>
    <ContentCard {...props} direction={direction} />
  </div>
)

Template.args = {
  direction: 'column',
  image: illustration,
  icon: <CockpitProductIcon size="large" />,
  subtitle: 'New update',
  title: 'Create your first function',
  description:
    'The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you.',
}

import type { StoryFn } from '@storybook/react-vite'
import { CockpitProductIcon } from '@ultraviolet/icons/product/CockpitProductIcon'
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
  description:
    'The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you.',
  direction: 'column',
  icon: <CockpitProductIcon size="large" />,
  image: illustration,
  subtitle: 'New update',
  title: 'Create your first function',
}

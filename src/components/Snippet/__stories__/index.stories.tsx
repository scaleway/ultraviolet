import { ComponentMeta } from '@storybook/react'
import Snippet from '..'
import Stack from '../../Stack'

export default {
  component: Snippet,
  decorators: [
    StoryComponent => (
      <Stack gap={2} direction="row">
        <StoryComponent />
      </Stack>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A component to display a snippet of code with a copy button.',
      },
    },
  },
  title: 'Components/Data Display/Snippet',
} as ComponentMeta<typeof Snippet>

export { Playground } from './Playground.stories'

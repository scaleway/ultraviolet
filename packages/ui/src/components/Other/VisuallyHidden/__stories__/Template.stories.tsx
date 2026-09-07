import type { StoryFn } from '@storybook/react-vite'
import { VisuallyHidden } from '..'

export const Template: StoryFn<typeof VisuallyHidden> = props => (
  <>
    Visually hidden content: <VisuallyHidden {...props} />
  </>
)

Template.args = {
  children: 'Hidden text',
}

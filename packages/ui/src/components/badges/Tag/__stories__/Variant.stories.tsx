import type { Decorator } from '@storybook/react-vite'
import { Template } from './Template.stories'

export const Variant = Template.bind({})

Variant.args = {
  children: 'Tag content',
  variant: 'code',
}

Variant.decorators = [
  StoryComponent => (
    <div style={{ width: 'fit-content' }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]

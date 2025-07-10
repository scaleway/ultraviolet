import type { Decorator } from '@storybook/react-vite'
import { Template } from './Template.stories'

export const MaxWidth = Template.bind({})

MaxWidth.decorators = [Story => <Story />] as Decorator[]

MaxWidth.args = {
  maxWidth: 200,
  text: 'This is a longer tooltip with a max width set to 200px',
}

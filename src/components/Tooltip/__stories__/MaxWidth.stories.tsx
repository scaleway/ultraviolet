import type { DecoratorFunction } from '@storybook/addons'
import { Template } from './Template.stories'

export const MaxWidth = Template.bind({})

MaxWidth.decorators = [
  Story => (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <Story />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]

MaxWidth.args = {
  maxWidth: 200,
  text: 'This is a longer tooltip with a max width set to 200px',
}

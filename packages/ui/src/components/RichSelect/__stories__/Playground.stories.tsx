import { fireEvent, screen } from '@storybook/testing-library'
import RichSelect from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  ...Template.args,
  name: 'basic',
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}

Playground.play = () => {
  fireEvent.click(screen.getByRole('combobox'))
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

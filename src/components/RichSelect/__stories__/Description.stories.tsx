import RichSelect from '..'
import { Template } from './Template.stories'

export const Description = Template.bind({})
Description.args = {
  name: 'is-clearable',
  isClearable: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option
      value="a"
      inlineDescription="This is an average solution"
    >
      Option A
    </RichSelect.Option>,
    <RichSelect.Option
      value="b"
      description="This is the best solution, friend advice"
    >
      Option B
    </RichSelect.Option>,
    <RichSelect.Option
      value="long-description"
      description="I am a very long description here to show you what happen after a certain length the description should cut. In fact this description is not long enough yet to be cut it require at least 3 full lines to be able to see this happening. I am tired I'm gonna add lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    >
      Option with long description
    </RichSelect.Option>,
  ],
}
Description.decorators = [
  StoryComponent => (
    <div style={{ marginBottom: 300 }}>
      <StoryComponent />
    </div>
  ),
]

Description.parameters = {
  docs: {
    description: {
      story:
        'This shows how to use `description` and `inlineDescription` on RichSelect.Option.',
    },
  },
}

import { RichSelect } from '../..'
import { Template } from './Template.stories'

export const OptionDisabled = Template.bind({})
OptionDisabled.args = {
  name: 'option-disabled',
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b" disabled>
      Option B
    </RichSelect.Option>,
  ],
}
OptionDisabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on RichSelect.Option.',
  },
}

import { SelectInput } from '../..'
import { Template } from './Template.stories'

export const OptionDisabled = Template.bind({})
OptionDisabled.args = {
  name: 'option-disabled',
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b" disabled>
      Option B
    </SelectInput.Option>,
  ],
}
OptionDisabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on SelectInput.Option.',
  },
}

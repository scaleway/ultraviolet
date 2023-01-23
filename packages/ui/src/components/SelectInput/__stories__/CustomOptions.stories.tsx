import { SelectInput } from '..'
import { Badge } from '../../Badge'
import { Template } from './Template.stories'

export const CustomOptions = Template.bind({})
CustomOptions.args = {
  name: 'custom-options',
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Option B<Badge size="small">Awesome badge</Badge>
      </div>
    </SelectInput.Option>,
  ],
}
CustomOptions.parameters = {
  docs: {
    storyDescription: 'This shows how to customize options in a SelectInput.',
  },
}

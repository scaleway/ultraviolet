import RichSelect from '..'
import Badge from '../../Badge'
import { Template } from './Template.stories'

export const CustomOptions = Template.bind({})
CustomOptions.args = {
  name: 'custom-options',
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Option B<Badge size="small">Awesome badge</Badge>
      </div>
    </RichSelect.Option>,
  ],
}
CustomOptions.parameters = {
  docs: {
    storyDescription: 'This shows how to customize options in a RichSelect.',
  },
}

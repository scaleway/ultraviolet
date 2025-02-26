import { Template } from './Template.stories'

export const Columns = Template.bind({})

Columns.args = {
  ...Template.args,
  columns: 2,
  legend: 'Choose your OS (2 columns)',
}

Columns.decorators = [
  Story => (
    <div style={{ height: '550px' }}>
      <Story />
    </div>
  ),
]

Columns.parameters = {
  docs: {
    description: {
      story:
        'You can set the number of columns you want using `columns` prop. If you set 2 columns and you have 3 items, the 3rd one will be in a new row.',
    },
  },
}

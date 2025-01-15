import { Template } from './Template.stories'

export const PopoverMaxHeight = Template.bind({})

PopoverMaxHeight.parameters = {
  docs: {
    description: {
      story:
        '`popoverMaxHeight` can be used to control the popover max height when having a lot of items.',
    },
  },
}

PopoverMaxHeight.args = {
  popoverMaxHeight: '10rem',
  popoverTitle: 'Additional tags',
  tags: [
    'very',
    ...new Array<string>(50).fill('item'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: 5,
}

PopoverMaxHeight.decorators = [
  Story => (
    <div style={{ width: '200px' }}>
      <Story />
    </div>
  ),
]

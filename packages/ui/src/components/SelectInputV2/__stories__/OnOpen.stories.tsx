import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const OnOpen = Template.bind({})

OnOpen.args = {
  ...Template.args,
  options: dataGrouped,
  onOpen: () => {},
  value: '',
}
OnOpen.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

OnOpen.parameters = {
  docs: {
    description: {
      story:
        '`onOpen` prop allow to set a callback which is called/triggered when option dropdown is open',
    },
  },
}

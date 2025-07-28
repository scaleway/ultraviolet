import { dataGrouped } from './resources'
import { Template } from './Template.stories'

export const OnOpen = Template.bind({})

OnOpen.args = {
  ...Template.args,
  onOpen: () => {},
  options: dataGrouped,
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

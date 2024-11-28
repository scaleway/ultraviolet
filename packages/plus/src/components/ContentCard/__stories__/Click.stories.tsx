import { Template } from './Template.stories'

export const Click = Template.bind({})

Click.parameters = {
  docs: {
    description: {
      story: 'You can alternatively use `onClick` prop to handle click event.',
    },
  },
}

Click.decorators = [
  StoryComponent => (
    <div style={{ width: '320px' }}>
      <StoryComponent />
    </div>
  ),
]

Click.args = {
  ...Template.args,
  onClick: () => {
    // oxlint-disable-next-line eslint/no-alert
    alert('Clicked!')
  },
}

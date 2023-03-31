import { Template } from './Template.stories'

export const Uncontrolled = Template.bind({})

Uncontrolled.args = {
  visible: true,
}

Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        'Popover work as partial uncontrolled component if you pass `visible` prop to it, it will manage its state internally ' +
        'and close itself when clicking on close button. This is only usefully when you want for the popover to be visible at mount ' +
        "and closable without being able to open it again. In this case you don't have to manage the state of the popover yourself.",
    },
  },
}

Uncontrolled.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex' }}>
      <StoryComponent />
    </div>
  ),
]

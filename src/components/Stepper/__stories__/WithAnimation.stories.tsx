import { Template } from './Template.stories'

export const WithAnimation = Template.bind({})

WithAnimation.parameters = {
  docs: {
    storyDescription:
      'Stepper Component with animation by passing `animated={true}` ',
  },
}

WithAnimation.args = {
  children: [
    <span>Step 1</span>,
    <span>Step 2</span>,
    <span>Step 3</span>,
    <span>Step 4</span>,
    <span>Step 5</span>,
  ],
  selected: 1,
  animated: true,
}

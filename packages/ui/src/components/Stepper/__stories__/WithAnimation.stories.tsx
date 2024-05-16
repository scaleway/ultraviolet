import { Stepper } from '..'
import { Template } from './Template.stories'

export const WithAnimation = Template.bind({})

WithAnimation.parameters = {
  docs: {
    description: {
      story: 'Stepper Component with animation by passing `animated={true}` ',
    },
  },
}

WithAnimation.args = {
  children: [
    <Stepper.Step index={1} title="Step 1" />,
    <Stepper.Step index={2} title="Step 2" />,
    <Stepper.Step index={3} title="Step 3" />,
  ],
  selected: 2,
  animated: true,
}

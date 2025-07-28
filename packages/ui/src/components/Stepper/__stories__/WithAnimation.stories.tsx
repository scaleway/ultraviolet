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
  animated: true,
  children: [
    <Stepper.Step title="Step 1" />,
    <Stepper.Step title="Step 2" />,
    <Stepper.Step title="Step 3" />,
  ],
  selected: 1,
}

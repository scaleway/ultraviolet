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
    <Stepper.Step key="step-1" title="Step 1" />,
    <Stepper.Step key="step-2" title="Step 2" />,
    <Stepper.Step key="step-3" title="Step 3" />,
  ],
  selected: 1,
}

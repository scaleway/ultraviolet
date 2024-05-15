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
    <Stepper.Step index={0}>
      <span>Step 1</span>
    </Stepper.Step>,
    <Stepper.Step index={1}>
      <span>Step 2</span>
    </Stepper.Step>,
    <Stepper.Step index={2}>
      <span>Step 3</span>
    </Stepper.Step>,
    <Stepper.Step index={3}>
      <span>Step 4</span>
    </Stepper.Step>,
    <Stepper.Step index={4}>
      <span>Step 5</span>
    </Stepper.Step>,
  ],
  selected: 1,
  animated: true,
}

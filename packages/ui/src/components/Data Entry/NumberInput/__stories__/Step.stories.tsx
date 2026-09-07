import { Template } from './Template.stories'

export const Step = Template.bind({})

Step.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  step: 10.5,
}

Step.parameters = {
  docs: {
    description: {
      story:
        'You can use the `step` prop to define the step of the input. In this example the step is set to `10.5` so the input will increment/decrement by 10.5. <br /> <br />**⚠️ WARNING**: If the `min` or `max` prop is set in addition with `step` prop you need to be coherent in the number you are setting up. If the `step` is a multiple of 5 then you need to set your `min` or `max` to be also a multiple of 5, or you will have incoherent behavior.',
    },
  },
}

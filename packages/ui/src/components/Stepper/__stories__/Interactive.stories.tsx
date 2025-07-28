import { Stepper } from '..'
import { Template } from './Template.stories'

export const Interactive = Template.bind({})

Interactive.args = {
  ...Template.args,
  children: [
    <Stepper.Step title="Step 1" />,
    <Stepper.Step title="Step 2" />,
    <Stepper.Step title="Step 3" />,
    <Stepper.Step title="Step 4" />,
    <Stepper.Step title="Step 5" />,
  ],
  interactive: true,
  selected: 3,
}
Interactive.parameters = {
  docs: {
    description: {
      story:
        'When interactive, it is possible to navigate through the previously completed steps freely. It is not possible to skip steps.',
    },
  },
}

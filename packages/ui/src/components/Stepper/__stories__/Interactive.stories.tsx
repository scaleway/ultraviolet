import { Stepper } from '..'
import { Template } from './Template.stories'

export const Interactive = Template.bind({})

Interactive.args = {
  ...Template.args,
  selected: 4,
  interactive: true,
  children: [
    <Stepper.Step index={1} title="Step 1" />,
    <Stepper.Step index={2} title="Step 2" />,
    <Stepper.Step index={3} title="Step 3" />,
    <Stepper.Step index={4} title="Step 4" />,
    <Stepper.Step index={5} title="Step 5" />,
  ],
}
Interactive.parameters = {
  docs: {
    description: {
      story:
        'When interactive, it is possible to navigate through the previously completed steps freely. It is not possible to skip steps.',
    },
  },
}

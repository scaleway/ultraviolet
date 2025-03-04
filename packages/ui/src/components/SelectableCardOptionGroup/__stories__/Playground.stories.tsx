import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = { ...Template.args }

Playground.decorators = Template.decorators

Playground.parameters = {
  docs: {
    description: {
      story: `SelectableCardOptionGroup is a complex component made out of 2 components (SelectableCard and SelectInputV2). Therefore there is 2 value and 2 onChange to handle:
- \`value\`: The current value of the SelectableCard component.
- \`valueOption\`: The current value of the SelectInputV2 component.
- \`onChange\`: The handler function to update the value of the SelectableCard component.
- \`onChangeOption\`: The handler function to update the value of the SelectInputV2 component.

**Be aware that once you click on the component, the first value of options will be selected by default.**
      `,
    },
  },
}

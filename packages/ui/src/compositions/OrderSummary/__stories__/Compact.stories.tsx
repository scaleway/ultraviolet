import {
  categoryAZ,
  categoryDefault,
  categoryM2,
  categoryOptions,
} from './productsExample'
import { Template } from './Template.stories'

export const Compact = Template.bind({})

Compact.args = {
  hideTimeUnit: true,
  items: [categoryAZ, categoryM2, categoryOptions, categoryDefault],
  calculatorIcon: true,
  compact: true,
  backgroundProminence: 'strong',
}

Compact.parameters = {
  docs: {
    description: {
      story:
        'With `compact={true}`, you can display a small version of the component, showing only the total price. With that variant, it is possible to change the background prominence using prop `backgroundProminence`',
    },
  },
}

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
  variant: 'compact',
  backgroundProminence: 'strong',
}

Compact.parameters = {
  docs: {
    description: {
      story:
        'With `variant="compact"`, you can display a small version of the component, showing only the total price. With that variant, it is possible de change the background prominence using prop `backgroundProminence` ("weak" by default).',
    },
  },
}

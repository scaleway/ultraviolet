import {
  categoryAZ,
  categoryDefault,
  categoryM2,
  categoryOptions,
} from './productsExample'
import { Template } from './Template.stories'

export const HideDetails = Template.bind({})

HideDetails.args = {
  header: 'Summary',
  hideDetails: true,
  hideTimeUnit: true,
  items: [categoryAZ, categoryM2, categoryOptions, categoryDefault],
}

HideDetails.parameters = {
  docs: {
    description: {
      story:
        'It is possible to only display the overall price using prop `hideDetails`',
    },
  },
}

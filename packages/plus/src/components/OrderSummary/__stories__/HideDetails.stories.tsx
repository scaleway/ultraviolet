import { Template } from './Template.stories'
import {
  categoryAZ,
  categoryDefault,
  categoryM2,
  categoryOptions,
} from './productsExample'

export const HideDetails = Template.bind({})

HideDetails.args = {
  hideDetails: true,
  hideTimeUnit: true,
  header: 'Summary',
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

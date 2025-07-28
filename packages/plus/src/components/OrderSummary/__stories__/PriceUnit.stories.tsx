import { categoryAZ, categoryRequest } from './productsExample'
import { Template } from './Template.stories'

export const PriceUnit = Template.bind({})

PriceUnit.args = {
  ...Template.args,
  hideTimeUnit: false,
  items: [categoryAZ, categoryRequest],
  fractionDigits: 10,
}

PriceUnit.parameters = {
  docs: {
    description: {
      story:
        'You can specify a unit to display next to the price for each subcategory using the `unitPrice` prop. This helps users understand how the price is calculated. The unit appears after the price. When `unitPrice` is set, the total price for the subcategory is shown without considering the subcategory amount.',
    },
  },
}

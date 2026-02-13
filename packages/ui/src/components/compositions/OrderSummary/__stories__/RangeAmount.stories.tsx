import { categoryAZ, rangePriceContent } from './productsExample'
import { Template } from './Template.stories'

export const RangeAmount = Template.bind({})

RangeAmount.args = {
  ...Template.args,
  fractionDigits: 10,
  hideTimeUnit: false,
  items: [categoryAZ, rangePriceContent],
  periodOptions: ['minutes', 'hours', 'days'],
}

RangeAmount.parameters = {
  docs: {
    description: {
      story:
        'You can give a range for the `subCategory.amount`. In that case, the subCategoryPrice and the total price will be shown as a range.',
    },
  },
}

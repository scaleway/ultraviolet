import {
  categoryAZ,
  categoryCustomContent,
  categoryOptions,
} from './productsExample'
import { Template } from './Template.stories'

export const CustomContent = Template.bind({})

CustomContent.args = {
  ...Template.args,
  hideTimeUnit: false,
  items: [categoryAZ, categoryCustomContent, categoryOptions],
}

CustomContent.parameters = {
  docs: {
    description: {
      story:
        'It is possible to dislpay custom content instead of the price for each category or subcategory using the `customContent` prop. This is useful when the price is not relevant or when the price is calculated in a different way. Note that for subcategory, the total price is still calculated and displayed, if provided.',
    },
  },
}

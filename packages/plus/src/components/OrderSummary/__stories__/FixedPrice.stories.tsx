import { categoryAZ, fixePrice } from './productsExample'
import { Template } from './Template.stories'

export const FixedPrice = Template.bind({})

FixedPrice.args = {
  ...Template.args,
  hideTimeUnit: false,
  items: [categoryAZ, fixePrice],
}

FixedPrice.parameters = {
  docs: {
    description: {
      story:
        'For each subcategory, it is possible to set a fixed price, i.e. a price independent of time. This is useful, for example for a one-time fee.',
    },
  },
}

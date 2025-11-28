import { anchorProduct, nonAnchorProduct } from './productsExample'
import { Template } from './Template.stories'

export const Anchor = Template.bind({})

Anchor.args = {
  ...Template.args,
  children: (
    <>
      <div id="anchor-category">Anchor category</div>
      <div id="anchor-sub-category">Anchor sub-category</div>
    </>
  ),
  hideTimeUnit: false,
  items: [anchorProduct, nonAnchorProduct],
}

Anchor.parameters = {
  docs: {
    description: {
      story: 'It is possible to add an anchor to the categories/subcategories.',
    },
  },
}

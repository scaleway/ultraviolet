import { demoDefaultValues, demoFilters } from './demo.config'
import { Template } from './Template.stories'

export const Layout = Template.bind({})

Layout.args = {
  ...Template.args,
  config: demoFilters.filter(item => item.label === 'Price' || item.label === 'Environment'),
  defaultValues: demoDefaultValues,
  layout: { size: 'large', mainFilters: ['price', 'env'] },
}

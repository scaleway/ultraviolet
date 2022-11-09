import { Template } from './Template.stories'
import { dataWithLegendsDetailsAndDiscount } from './mockData'

export const Strikethrough = Template.bind({})

Strikethrough.args = {
  data: dataWithLegendsDetailsAndDiscount,
  content: '€0',
  withLegend: true,
}

import { Template } from './Template.stories'
import { dataWithLegends } from './mockData'

export const Legends = Template.bind({})

Legends.args = {
  data: dataWithLegends,
  content: '€20',
  withLegend: true,
}

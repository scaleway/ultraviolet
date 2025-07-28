import { dataWithLegends } from './mockData'
import { Template } from './Template.stories'

export const Legends = Template.bind({})

Legends.args = {
  data: dataWithLegends,
  content: '€20',
  withLegend: true,
}

import { dataWithLegends } from './mockData'
import { Template } from './Template.stories'

export const Legends = Template.bind({})

Legends.args = {
  content: '€20',
  data: dataWithLegends,
  legendHeader: 'Euro (€)',
  withLegend: true,
}

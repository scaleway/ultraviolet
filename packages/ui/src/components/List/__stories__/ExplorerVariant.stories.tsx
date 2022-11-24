import { generateData } from '../../../mocks/list'
import { Template } from './Template.stories'

export const ExplorerVariant = Template.bind({})

ExplorerVariant.args = {
  multiselect: true,
  data: generateData(5),
  variant: 'explorer',
}

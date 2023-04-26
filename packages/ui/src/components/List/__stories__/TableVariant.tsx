import { generateData } from '../../../mocks/list'
import { Template } from './Template'

export const TableVariant = Template.bind({})

TableVariant.args = {
  multiselect: true,
  data: generateData(5),
  variant: 'table',
}

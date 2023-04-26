import { generateData } from '../../../mocks/list'
import { Template } from './Template'

export const PaginationPrefetchedData = Template.bind({})

PaginationPrefetchedData.args = {
  perPage: 5,
  data: generateData(30),
}

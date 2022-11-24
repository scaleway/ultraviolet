import { generateData } from '../../../mocks/list'
import { Template } from './Template.stories'

export const Sorting = Template.bind({})

Sorting.args = {
  data: generateData(10),
  columns: [
    { label: 'Name', sort: 'name' },
    { label: 'Description', sort: 'description', width: '50%' },
    { label: 'Department', sort: 'department', width: '120px' },
  ],
}

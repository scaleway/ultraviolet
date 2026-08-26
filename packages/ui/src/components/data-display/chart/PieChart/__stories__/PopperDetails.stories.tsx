import { dataWithLegendsAndDetails } from './mockData'
import { Template } from './Template.stories'

export const PopperDetails = Template.bind({})

PopperDetails.args = {
  content: '€20',
  data: dataWithLegendsAndDetails,
  withLegend: true,
}

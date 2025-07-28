import { dataWithLegendsAndDetails } from './mockData'
import { Template } from './Template.stories'

export const PopperDetails = Template.bind({})

PopperDetails.args = {
  data: dataWithLegendsAndDetails,
  content: '€20',
  withLegend: true,
}

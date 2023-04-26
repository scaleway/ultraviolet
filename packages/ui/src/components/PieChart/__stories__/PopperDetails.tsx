import { Template } from './Template'
import { dataWithLegendsAndDetails } from './mockData'

export const PopperDetails = Template.bind({})

PopperDetails.args = {
  data: dataWithLegendsAndDetails,
  content: '€20',
  withLegend: true,
}

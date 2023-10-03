import { EstimateCost } from '..'
import { Template } from './Template'

export const Region = Template.bind({})

Region.args = {
  children: [
    <EstimateCost.Region region="fr-par" />,
    <EstimateCost.Region region="fr-par" />,
    <EstimateCost.Region region="nl-ams" />,
    <EstimateCost.Region region="pl-waw" />,
  ],
}

Region.parameters = {
  docs: {
    storyDescription:
      'Region is a composed Item that will display a specific region.',
  },
}

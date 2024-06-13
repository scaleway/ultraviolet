import { EstimateCost } from '..'
import { Template } from './Template'
import frFlag from './assets/fr.svg'
import nlFlag from './assets/nl.svg'
import plFlag from './assets/pl.svg'

export const Region = Template.bind({})

Region.args = {
  children: [
    <EstimateCost.Region label="PAR" image={frFlag} />,
    <EstimateCost.Region label="AMS" image={nlFlag} />,
    <EstimateCost.Region label="WAW" image={plFlag} />,
  ],
}

Region.parameters = {
  docs: {
    description: {
      story: 'Region is a composed Item that will display a specific region.',
    },
  },
}

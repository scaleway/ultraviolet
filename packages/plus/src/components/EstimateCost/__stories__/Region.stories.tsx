import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'
import nlFlag from './assets/nl.svg'
import plFlag from './assets/pl.svg'
import { Template } from './Template'

export const Region = Template.bind({})

Region.args = {
  children: [
    <EstimateCost.Region image={frFlag} label="PAR" />,
    <EstimateCost.Region image={nlFlag} label="AMS" />,
    <EstimateCost.Region image={plFlag} label="WAW" />,
  ],
}

Region.parameters = {
  docs: {
    description: {
      story: 'Region is a composed Item that will display a specific region.',
    },
  },
}

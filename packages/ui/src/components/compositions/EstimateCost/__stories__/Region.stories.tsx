import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'
import nlFlag from './assets/nl.svg'
import plFlag from './assets/pl.svg'
import { Template } from './Template.stories'

export const Region = Template.bind({})

Region.args = {
  children: [
    <EstimateCost.Region image={frFlag} key={frFlag} label="PAR" />,
    <EstimateCost.Region image={nlFlag} key={nlFlag} label="AMS" />,
    <EstimateCost.Region image={plFlag} key={plFlag} label="WAW" />,
  ],
}

Region.parameters = {
  docs: {
    description: {
      story: 'Region is a composed Item that will display a specific region.',
    },
  },
}

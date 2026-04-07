import { Template } from './Template.stories'

export const FractionDigits = Template.bind({})

FractionDigits.args = {
  ...Template.args,
  fractionDigits: 10,
  hideTimeUnit: false,
  unitUnitInput: 'seconds',
}

FractionDigits.parameters = {
  docs: {
    description: {
      story:
        'Specify the number of decimal digits to display in the estimated prices. By default, 2 for the total cost and 5 for the details',
    },
  },
}

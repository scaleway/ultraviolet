import { EstimateCost } from '..'
import { Template } from './Template.stories'

export const Compact = Template.bind({})

Compact.args = {
  children: [
    <EstimateCost.Item
      amount={1}
      key="Storage"
      label="Storage"
      monthlyPrice={100}
      unit="GB"
    >
      <EstimateCost.Unit unit="GB" />
    </EstimateCost.Item>,
  ],
  compact: true,
  defaultTimeUnit: 'months',
}

Compact.parameters = {
  docs: {
    description: {
      story: 'Use prop `compact` to only display the total price.',
    },
  },
}

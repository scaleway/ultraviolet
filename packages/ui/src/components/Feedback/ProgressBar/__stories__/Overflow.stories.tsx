import { Template } from './Template.stories'

export const Overflow = Template.bind({})

Overflow.args = {
  label: 'Storage',
  max: 100,
  sentiment: 'danger',
  showProgress: true,
  suffix: '%',
  value: 110,
}

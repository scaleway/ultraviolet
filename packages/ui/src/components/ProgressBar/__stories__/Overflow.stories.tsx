import { Template } from './Template.stories'

export const Overflow = Template.bind({})

Overflow.args = {
  label: 'Storage',
  value: 110,
  max: 100,
  suffix: '%',
  showProgress: true,
  sentiment: 'danger',
}

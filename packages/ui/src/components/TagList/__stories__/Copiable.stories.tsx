import { Template } from './Template.stories'

export const Copiable = Template.bind({})

Copiable.args = {
  tags: ['smooth', 'code'],
  threshold: 2,
  copiable: true,
  copyText: 'Copy me!',
  copiedText: 'You copied me!',
}

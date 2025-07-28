import { Template } from './Template.stories'

export const Copiable = Template.bind({})

Copiable.args = {
  copiable: true,
  copiedText: 'You copied me!',
  copyText: 'Copy me!',
  tags: ['smooth', 'code', 'hello', 'world'],
  threshold: 2,
}

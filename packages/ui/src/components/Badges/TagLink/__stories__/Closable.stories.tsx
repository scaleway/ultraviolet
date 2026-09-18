import { Template } from './Template.stories'

export const Closable = Template.bind({})

Closable.args = {
  ...Template.args,
  onClose: () => {
    alert('closed')
  },
  copiable: false,
}

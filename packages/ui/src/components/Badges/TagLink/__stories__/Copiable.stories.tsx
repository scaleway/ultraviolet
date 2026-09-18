import { Template } from './Template.stories'

export const Copiable = Template.bind({})

Copiable.args = { ...Template.args, copiable: true }

Copiable.parameters = {
  docs: {
    description: {
      story:
        'Use the `copiable` prop to make the tag link copiable. Do not forget to customize the tooltip using the `copyText` & `copiedText` props! ',
    },
  },
}

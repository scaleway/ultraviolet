import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'You can enable and disable this toggle.',
}

Helper.parameters = {
  docs: {
    description: { story: 'Add an helper text using helper property.' },
  },
}

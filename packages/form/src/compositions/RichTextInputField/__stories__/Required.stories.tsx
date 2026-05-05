import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = { ...Template.args, required: true }

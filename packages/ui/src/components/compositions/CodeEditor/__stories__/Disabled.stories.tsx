import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = { ...Template.args, disabled: true }

import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = { ...Template.args, error: 'Please select an option' }

Error.decorators = Template.decorators

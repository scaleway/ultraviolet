import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = { ...Template.args, helper: 'Helper message' }

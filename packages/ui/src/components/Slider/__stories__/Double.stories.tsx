import { Template } from './Template.stories'

export const Double = Template.bind({})

Double.args = { ...Template.args, double: true, value: ['3', '5'], step: 0.5 }

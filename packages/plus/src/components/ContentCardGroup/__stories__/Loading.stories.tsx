import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.args = { ...Template.args, loading: true }

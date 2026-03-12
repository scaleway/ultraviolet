import { Template } from './Template.stories'

export const HighlightedHeader = Template.bind({})

HighlightedHeader.args = { ...Template.args, highlightHeader: true }

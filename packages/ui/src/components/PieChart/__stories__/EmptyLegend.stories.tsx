import { Template } from './Template.stories'

export const EmptyLegend = Template.bind({})

EmptyLegend.args = {
  data: undefined,
  emptyLegend: "I'm alone in the dark",
  withLegend: true,
}

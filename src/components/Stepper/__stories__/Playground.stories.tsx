import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  selected: 1,
  children: [<span>Initialize</span>, <span>Create</span>, <span>Done</span>],
}

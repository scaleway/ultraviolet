import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <div>First child</div>,
    <div>Second child</div>,
    <div>Third child</div>,
  ],
  gap: 2,
}
